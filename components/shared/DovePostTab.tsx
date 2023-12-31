
import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import DovePostCard from "../cards/dovepostcard";
import { currentUser } from "@clerk/nextjs";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

interface Result {
    name: string;
    image: string;
    id: string;
    dovepost: {
      _id: string;
      text: string;
      parentId: string | null;
      author: {
        name: string;
        image: string;
        id: string;
      };
      community: {
        id: string;
        name: string;
        image: string;
      } | null;
      createdAt: string;
      children: {
        author: {
          image: string;
        };
      }[];
    }[];
  }
interface Props{
    currentUserId:string; 
    accountId:string; 
    accountType:string;
}

const DovePostTab = async({currentUserId , accountId , accountType}:Props) => {

    let result : Result;

    if(accountType === 'Community'){
      result = await fetchCommunityPosts(accountId)
    }else{
       result = await fetchUserPosts(accountId)
    }
    if(!result) redirect('/')

    const user = await currentUser()
    if(!user) return null;
    
    return(
        <section className="mt-10 flex flex-col gap-5">
            {result.dovepost.map((dovePost:any) => (
                <DovePostCard 
                  key={dovePost._id}
                  id={dovePost._id}
                  currentUserId={user.id}
                  parentId={dovePost.parentId}
                  content={dovePost.text}
                  author={
                    accountType === 'User'?{
                      name:result.name , id:result.id, image:result.image
                    }:{name: dovePost.author.name, image: dovePost.author.image, id: dovePost.auhor.id}
                  }
                  community={ 

                        accountType === 'Community'?{
                        name: result.name, id: result.id, image: result.image
                      }: dovePost.community 
                    }
                  createdAt={dovePost.createdAt}
                  comments={dovePost.children} 
                />
            ))}
        </section>
    )
};

export default DovePostTab;