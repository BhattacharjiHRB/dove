
import { currentUser } from "@clerk/nextjs";
import ProfileHeader from "@/components/shared/ProfileHeader"
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import { communityTabs } from "@/constants";
import Image from "next/image";
import DovePostTab from "@/components/shared/DovePostTab";
import { fetchCommunityDetails } from "@/lib/actions/community.actions";
import UserCard from "@/components/cards/UserCard";



async function Page ({params}:{params: {id: string}}) {
    
    const user = await currentUser();
    if (!user) return null;

    const communityDetails = await fetchCommunityDetails(params.id);
   
    return (
        <section>
            <ProfileHeader 
                accountId = {communityDetails.accountId}
                authUserId = {user.id}
                name = {communityDetails.name}
                userName = {communityDetails.userName}
                imgUrl = {communityDetails.image}
                bio = {communityDetails.bio}
            />
            <div className="mt-12">
                <Tabs defaultValue="dovepost">
                    <TabsList className="tab">
                        {communityTabs.map((tab)=>(
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
                                        {communityDetails?.dovepost?.length}
                                    </p>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                        <TabsContent 
                            value="dovepost"
                            className="w-full text-light-1"
                        >
                            {/* @ts-ignore */}
                          <DovePostTab  
                            currentUserId={user.id}
                            accountId={communityDetails._id}
                            accountType= 'Community'
                          />  
                        </TabsContent>
                        <TabsContent 
                            value="members"
                            className="w-full text-light-1"
                        >
                            {/* @ts-ignore */}
                            <section className="mt-10 flex flex-col gap-10">
                                {communityDetails?.members.map((member:any) => (
                                    <UserCard 
                                        key={member.id}
                                        id={member.id}
                                        name={member.name}
                                        userName={member.userName}
                                        imgUrl={member.image}
                                        humanType = 'User'
                                    />
                                ))}
                            </section>  
                        </TabsContent>

                        <TabsContent 
                            value="request"
                            className="w-full text-light-1"
                        >
                            {/* @ts-ignore */}
                          <DovePostTab  
                            currentUserId={user.id}
                            accountId={communityDetails._id}
                            accountType= 'User'
                          />  
                        </TabsContent>


                </Tabs>
            </div>
        </section>
    )
};
export default Page;