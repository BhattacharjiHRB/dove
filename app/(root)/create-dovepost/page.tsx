

import PostDove from "@/components/forms/PostDove";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";



async function Page() {
    
    
    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id)
    if(!userInfo?.onboarded) {
        redirect('/onboarding')
    }

    return(
        <div>
            <h1 className="head-text">DovePost Area</h1>

           <PostDove userId={userInfo._id} />
            
        </div>
    )
}
export default Page;

