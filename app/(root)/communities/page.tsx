
import CommunityCard from "@/components/cards/CommunityCard";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser, } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";




async function Page (){
    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id)
    if(!userInfo.onboarded) redirect('/')

    const result = await fetchCommunities({
        searchString: "",
        pageNumber: 1,
        pageSize: 25,
    })


    return(
        <section>
            <h1 className="head-text mb=10">Search</h1>
            {/* searchBar */}
            <div className="mt-16 flex flex-col gap-10">
                {result.communities.length === 0 ? (
                    <p className="no-result">No communities</p>
                ):(
                    <>
                        {result.communities.map((community)=>(
                            <CommunityCard 
                                key={community.id}
                                id={community.id}
                                name={community.name}
                                username={community.username}
                                imgUrl={community.image}
                                members={community.members} 
                                bio={""}                            
                            />
                        ))}
                    </>
                )}
            </div>
        </section>
    )
}

export default Page;