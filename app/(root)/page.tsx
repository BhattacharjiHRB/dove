import DovePostCard from "@/components/cards/dovepostcard";
import { fetchPost } from "@/lib/actions/dovepost.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Home = async() => {
  
  const user = await currentUser();
  if(!user) return null;

  const userInfo = await fetchUser(user.id)
  if(!userInfo) redirect('/onboarding')

  const result = await fetchPost(1,20);



  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result && result.posts.length === 0? (
            <p className="no-result">No DovePost available for you </p>
        ):(
          <>
            {result && result.posts.map((post) =>(
              <DovePostCard
                key={post._id}
                id={post._id}
                currentUserId={user?.id || ""}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}      
               />
            ))}
          </>
        )}

        
      </section>
    </>
  )
}

export default Home;

