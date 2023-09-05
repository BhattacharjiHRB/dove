

import UserCard from "@/components/cards/UserCard";
import { fetchUser, fetchUserPosts, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";




async function Page (){
    const user = await currentUser();
    if(!user) return null;

    const result = await fetchUsers({
        userId: user.id,
        searchString: "",
        pageNumber: 1,
        pageSize: 25
    })


    return(
        <section>
            <h1 className="head-text mb=10">Search</h1>
            {/* searchBar */}
            <div className="mt-16 flex flex-col gap-10">
                {result.users.length === 0 ? (
                    <p className="no-result">No Users</p>
                ):(
                    <>
                        {result.users.map((human)=>(
                            <UserCard 
                                key={human.id}
                                id={human.id}
                                name={human.name}
                                userName={human.username}
                               imgUrl={human.image}
                               humanType= "User"
                            />
                        ))}
                    </>
                )}
            </div>
        </section>
    )
}

export default Page;