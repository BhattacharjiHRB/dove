import Image from "next/image";
import Link from "next/link";

interface Props {
    accountId: string;
    authUserId: string;
    name: string;
    userName:string;
    imgUrl: string;
    bio: string;
    type?: 'User' | 'Community';
}


const ProfileHeader = ({accountId, authUserId, name, userName, imgUrl, bio, type}:Props) =>{
    return(
        <div className="flex w-full flex-col justify-start">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <div className="relative w-20 h-20 object-cover">
                        <Image 
                            src={imgUrl}
                            alt="profile image"
                            fill
                            className="rounded-full object-cover"

                        />
                    </div>
                    <div className="flex-1 flex-col">
                        <h2 className="text-left text-heading3-bold text-zinc-50">{name}</h2>
                        <p className="text-base-medium text-light-4">@{userName}</p>
                    </div>
                </div>
            </div>
                {/* {Community} */}
                    <p className=" mt-8 max-w-lg text-base-regular text-light-2">{bio}</p>
                    
                

                <div className="mt-15 h-0.5 w-full bg-dark-3 " />
        </div>
    )
};

export default ProfileHeader;