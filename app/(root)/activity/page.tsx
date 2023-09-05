import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";


async function Page (){
    const user = await currentUser()
    if(!user)return null;

    const userInfo = await fetchUser(user.id)
    if(!userInfo)return redirect('/onboarding')

    const activity = await getActivity(userInfo._id)    

    return(
        <section>
            <h1 className="head-text mb=10">Activity</h1>
            <section className="mt-10 flex flex-col gap-5">
                {activity.length > 0 ? (
                    <>
                    {activity.map((activity) =>(
                        <Link key={activity._id} href={`/dovpost/${activity.parentId}`} >
                            <article className="activity-card">
                                <Image  
                                    src={activity.author.image}
                                    alt="Profile Photo"
                                    width={25}
                                    height={25}
                                    className="rounded-full object-cover"
                                />
                                <p className="!text-small-regular text-light-1">
                                    <span className="mr-1 text-cyan-600">
                                        {activity.author.name}
                                    </span>{""} Reply On your DovePost
                                </p>
                            </article>
                        </Link>
                    ))}
                    </>
                ): <p className="text-small-medium text-light-3">No Activities Yet</p> }
            </section>
        </section>
    )
}

export default Page;