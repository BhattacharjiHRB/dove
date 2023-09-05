import DovePostCard from "@/components/cards/dovepostcard";
import Comment from "@/components/forms/Comment";
import { fetchpostById } from "@/lib/actions/dovepost.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";




const Page = async({params}:{params:{id:string}}) => {

    if(!params.id) return null;

    const user = await currentUser();
    if(!user) return null;
    
    const userInfo = await fetchUser(user.id);
    if(!userInfo?.onbaorded) redirect('/onboarding');
    
    const dovePost = await fetchpostById(params.id);

    <section className="relative">
        <div className="">
            <DovePostCard
                id={dovePost._id}
                currentUserId={user.id}
                parentId={dovePost.parentId}
                content={dovePost.text}
                author={dovePost.author}
                community={dovePost.community}
                createdAt={dovePost.createdAt}
                comments={dovePost.children}      
            />
        </div>
        <div className="mt-10">
            <Comment 
                dovepostId={dovePost.id}
                currentUserimg={userInfo.image}
                currentUserId = {JSON.stringify(userInfo._id)}
            />
        </div>
        <div className="mt-10">
            {dovePost.children.map((child:any) => (
                <DovePostCard
                key={child._id}
                id={child._id}
                currentUserId={child?.id || ""}
                parentId={child.parentId}
                content={child.text}
                author={child.author}
                community={child.community}
                createdAt={child.createdAt}
                comments={child.children}
                isComment      
            />
            ))};
        </div>
    </section>
    
};

export default Page;