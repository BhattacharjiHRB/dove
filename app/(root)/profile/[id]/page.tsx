
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ProfileHeader from "@/components/shared/ProfileHeader"
import { Tabs, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent, TabsList } from "@radix-ui/react-tabs";
import { profileTabs } from "@/constants";
import Image from "next/image";
import DovePostTab from "@/components/shared/DovePostTab";
import Link from "next/link";



async function Page ({params}:{params: {id: string}}) {
    
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(params.id)
    if(!userInfo) redirect('/onboarding');

    return (
        <section>
            <div className="flex flex-1">
                <ProfileHeader 
                    accountId = {userInfo.accountId}
                    authUserId = {user.id}
                    name = {userInfo.name}
                    userName = {userInfo.username}
                    imgUrl = {userInfo.image}
                    bio = {userInfo.bio}
                />
                {user? (<Link href={"../profile/edit"} 
                className="  text-cyan-600 text-base-small" >Edit</Link>) :(<p className=" text-cyan-600 text-base-small">View</p>)}
                
            </div>
            <div className="mt-12">
                <Tabs defaultValue="dovepost">
                    <TabsList className="tab">
                        {profileTabs.map((tab)=>(
                            <TabsTrigger 
                                value={tab.value} 
                                key={tab.label}
                                className="tab"    
                            >
                                <Image 
                                    src={tab.icon} 
                                    alt ={tab.label}
                                    width={25}
                                    height={25}
                                    className="object-contain" 
                                />
                                <p className="max-sm:hidden">
                                    {tab.label}
                                </p>
                                {tab.label === 'DovePost' && (
                                    <p className="ml-1 rounded-xl bg-gray-800 p-2 !text-tiny-medium text-white ">
                                        {userInfo?.dovepost?.length}
                                    </p>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {profileTabs.map((tab)=>(
                        <TabsContent 
                            key={`content-${tab.label}`}
                            value={tab.value}
                            className="w-full text-light-1"
                        >
                        
                          <DovePostTab  
                            currentUserId={user.id}
                            accountId={userInfo.id}
                            accountType= 'User'
                          /> 
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    )
};
export default Page;