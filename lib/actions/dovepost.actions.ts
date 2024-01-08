"use server"

import { revalidatePath } from "next/cache";
import { connect } from "../mongoose";
import DovePost from "../models/dovepost.models";
import User from "../models/user.model";
import Community from "../models/community.model";




export async function fetchPost(pageNumber = 1, pageSize = 20){
    
    try {
        connect();
        
        // calculate number of doveposts
        const skipAmount = (pageNumber - 1) * pageSize;
        
        // Fetches the number of posts that has no parent
        const postsQuery = DovePost.find({parentId: {$in: [null, undefined]}})
        .sort({createdAt:'desc'})
        .skip(skipAmount)
        .limit(pageSize)
        .populate({
            path:'author', 
            model: User, 
        })
        .populate({
            path:'children',
            populate:{
                path:'author',
                model: User,
                select: '_id name parentId image',
            }
            
        });
    
        // count the Total Number of Posts
        const totalPostNumber = await DovePost.countDocuments({
            parentId:{ $in: [null , undefined] }
        });
      
        
        const posts = await postsQuery.exec();  
        const nextPage = totalPostNumber > skipAmount + posts.length;
        

        return {posts, nextPage}
        
    } catch (err:any) {
        console.log(`fetchpost is not working ${err.message}`);
       
        
    }
}


interface Params{
    text: string;
    author: string;
    communityId: string | null;
    path: string
}

export async function createDovePost(
    {text, author, communityId, path}:Params){

        try {
            connect();
            const communityIdObject = await Community.findOne(
                {id: communityId},
                {_id: 1}
            )
            // DovePost Creating API
            const createDovePost = await DovePost.create({
                text,
                author,
                community: communityIdObject,
            });
        
            // Update User Model
            await User.findByIdAndUpdate(author, {
                $push:{doveposts: createDovePost._id}
            })

            if(communityIdObject){
                await Community.findOneAndUpdate(communityIdObject,{
                    $push: { doveposts: createDovePost._id }
                })
            }


        revalidatePath(path);
    } catch (err:any) {
        throw new Error(`Error creating DovePost ${err.message}` );
    }
}

export async function fetchpostById(id:string){

    connect();

    try {
        
        const dovepost = await User.findById(id)
        .populate({
            path: 'author',
            model: User,
            select:'_id id name image'
        })
        .populate({
            path:'children',
            populate:[
                {
                    path:'author',
                    model: User,
                    select:'_id id name image'
                },
                {
                    path:'children',
                    model: DovePost,
                    populate:{
                        path:'author',
                        model:User,
                        select:'_id id name image'

                    }

                }
            ],
        }).exec()
        return dovepost

    } catch (err:any) {
        console.log(`fetching Posts by ID is not working ${err.message}`);
        throw err;
    }

}

export async function addCommentToDovepost(
    dovepostId:string, 
    commentText:string,
    userId:string,
    path:string
    ){
        connect()

        try {
            // identifing the original post 
            const ogDovepost = await DovePost.findById(dovepostId);
            if(!ogDovepost){
                throw new Error("Original DovePost not found")
            }
            // Creating a new dovepost as a comment 
            const commentDovePost = new DovePost({
                text:commentText,
                author:userId,
                parentId:dovepostId,
                
            })
            // Saving the comment to the database
            const savedDovepost = await commentDovePost.save()

            // update the original post and including the comment 
            ogDovepost.children.push(savedDovepost._id);

            // saving the original post to database
            await ogDovepost.save();
            revalidatePath(path);

        } catch (err:any) {
            console.log(`addCommentToDovepost function is nor working ${err.message}`)
            throw err;
        }
    }


async function fetchAllChildDovepost(dovePostId:string): Promise<any>{
    
    const childDovePosts = await DovePost.find({parentId:dovePostId})
    const descendentDovepost = []

    for(const childDovePost of childDovePosts) {
        const descendants = await fetchAllChildDovepost(childDovePost._id)
        descendentDovepost.push(childDovePost, ...descendants);
    }
    return descendentDovepost;
}   



export async function deleteDovePost(id:string, path:string): Promise<void>{
    try {
        connect();

        const mainDovepost = await DovePost.findById(id).populate("author community");
        if(!mainDovepost){
            console.log("DovePost not found")
        }

        const descendentDovepost = await fetchAllChildDovepost(id)
        const descendentDovepostIds =[ 
            id,
            ...descendentDovepost.map((dovepost: any) => dovepost._id)
        ]

        const uniqueAuthorId = new Set(
            [
                ...descendentDovepost.map((dovepost: any) => dovepost._id.toString()),
                mainDovepost.author?._id?.toString(),
            ].filter((id) => id !== undefined)
        )
        await DovePost.deleteOne({id: {$in: descendentDovepostIds}});

        await User.updateMany(
            {_id: { $in: Array.from(uniqueAuthorId)}},
            {$pull: {dovepost: {$in: descendentDovepostIds}}},
        )

        revalidatePath(path)

    } catch (err:any) {
        console.log(`deleteDovePost Is not working ${err.message}`)
        throw err;
    }
}    