"use client"
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";


interface Props{
        
id: string;
name: string;
userName: string;
imgUrl: string;
humanType:string;
}


export default function UserCard({id, name, userName, imgUrl, humanType}:Props){
    const router = useRouter()
    return(
        <article className="user-card">
            <div className="user-card_avatar">
                <Image
                    src={imgUrl}
                    alt='avatar'
                    width={48}
                    height={48}
                    className="rounded-full" 
                />
            </div>
            <div className="flex-1 text-ellipsis">
                <h4 className="text-base-semibold text-light-1">    {name}
                </h4>
                <p className="text-small-medium text-light-3">@{userName}
                </p>
            </div>
            <Button className="user-card_btn" onClick={()=> router.push(`/profile/${id}`)}> View</Button>
        </article>
    )
}