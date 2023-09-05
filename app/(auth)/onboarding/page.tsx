import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page(){
    const user = await currentUser();
    if (!user) return null;
    
    const userInfo = await fetchUser(user.id)
    if(userInfo?.onborded) redirect("/")

    
    const userData = { 
        id: user.id,
        objectId: userInfo?._id,
        userName: userInfo ? userInfo?.userName : user.username,
        name: userInfo ? userInfo?.name : user.firstName ?? "",
        bio: userInfo ? userInfo?.bio : "",
        image: userInfo ? userInfo?.image : user.imageUrl,
    }

    return(
        <main className="mx-auto flex max-w-3xl flex-col justify-start px-16 py-24">
            <h1 className="head-text">Profile</h1>
            <p className="mt-3 text-base-regular text-light-3">
                Setup your profile to enjoy your Dove 
            </p>
            <section className="mt-10 bg-dark-2 p-14 rounded-xl">
                <AccountProfile
                    user={userData}
                    btnTitle="Continue"
                />
            </section>
        </main>
    )
}

export default Page;
