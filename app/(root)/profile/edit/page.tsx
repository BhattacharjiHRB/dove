import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";


 async function Page(){

    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id)
    if(!userInfo) redirect("/sign-in")
       
        
    
    const userData = { 
        id: user.id,
        objectId: userInfo?._id,
        userName: userInfo ? userInfo?.userName : user.username,
        name: userInfo ? userInfo?.name : user.firstName ?? "",
        bio: userInfo ? userInfo?.bio : "",
        image: userInfo ? userInfo?.image : user.imageUrl,
    }

    return(
        <>
            <h1 className="head-text">Edit Profile</h1>
            <p className="mt-4 text-base-regular text-light-3"> Edit here accoriding to you </p>
            <section className=" mt-14">
                <AccountProfile 
                    user={userData}
                    btnTitle="Confirm"
                />
            </section>
        </>
    )
 }

 export default Page;