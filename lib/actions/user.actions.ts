"use server"

import {connect} from "../mongoose"
import User from "../models/user.model"
import { revalidatePath } from "next/cache";
import DovePost from "../models/dovepost.models";
import { FilterQuery, SortOrder } from "mongoose";
import Community from "../models/community.model";
 
interface Params{
    userId: string,
    username: string,
    name: string,
    bio: string,
    image: string,
    path: string
}
export async function updateUser({

    userId,
    username,
    name,
    bio,
    image,
    path,

    }:Params): Promise<void> {
    try{
        connect();

        await User.findOneAndUpdate(
        
            {id: userId},
            {username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded:true
            },
            {upsert: true},

        )
        if(path ==='/profile/edit'){
            revalidatePath(path);
        }

    }catch(err:any){
        console.log(`Failed to update user: ${err.message}`)
    }

}

export async function fetchUser(userId:string){
   try {
     connect()
     return await User.findOne({ id: userId})
     .populate({ 
        path: "communites", 
        model: User 
    })
   } catch (err:any) {
        console.log(`FetchUser is not working ${err.message}`);
        throw err;
   }
}

export async function fetchUserPosts(userId:string){
    try {
        connect()

        // Find all posts author by user with given userId
        const DovePosts = await User.findOne({id:userId})
        .populate({
            path :'dovepost',
            model: DovePost,
            populate:{
                path:'children',
                model:DovePost,
                populate:{
                    path:'author',
                    model: User,
                    select: 'name image id',
                },
            },

        });
        return DovePosts
        
    } catch (err:any) {
        console.log(`FetchUserByPosts is not working ${err.message}`);
        throw err;
    }
}

export async function fetchUsers({ 
    userId,
    searchString="",
    pageNumber=1,
    pageSize=20,
    sortBy="desc"
}:{
    userId:string;
    searchString?:string;
    pageNumber?:number;
    pageSize?:number;
    sortBy?:SortOrder;

}){
    try {
        connect()
        const skipAmount = (pageNumber - 1) * pageSize;

        const regex = new RegExp(searchString, "i");

        const query: FilterQuery<typeof User> = {
            id:{ $ne:userId } 

        }
        if(searchString !== ""){
            query.$or= [
                {username : {$regex: regex}},
                {name : {$regex: regex}}
            ]
        }
        const sortOptions = { createdAt: sortBy}

        const usersQuery = User.find(query)
            .sort(sortOptions)
            .skip(skipAmount)
            .limit(pageSize)

        const totalUserCount = await User.countDocuments(query)
        
        const users = await usersQuery.exec();

        const isNext = totalUserCount > skipAmount +  users.length;

        return {users, isNext}
    } catch (err:any) {
        throw new Error(`FetchUsers is not working in search ${err.message}`)
    }
}


export async function getActivity(userId:string){
    try {
        connect()
        // find all the DovePost created by the user
        const userDovePost = await DovePost.find({ author: userId });
        
        // collect all the clid Dovepost Id(comments) from the children fields
        const childDovePostIds = userDovePost.reduce((acc, userDovePost)=>{
            return acc.concat(userDovePost.children)
        },[]);

        const replies = await DovePost.find({
             _id: {$in: childDovePostIds},
             author: {$ne: userId}
            }).populate({
                path: "author",
                model: User,
                select: "name, Image, _id"

            })
            
        return replies;

    } catch (err:any) {
        throw new Error(`FetchActivity is not working in search ${err.message}`)
    }
}