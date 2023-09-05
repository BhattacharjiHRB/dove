"use client"
import { deleteDovePost } from "@/lib/actions/dovepost.actions";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";


interface Props{
    dovePostId: string;
    currentUserId: string;
    authorId: string;
    parentId: string | null;
    isComment?: boolean;
}

function DeleteDovePost ({
    dovePostId,
    currentUserId,
    authorId,
    parentId,
    isComment,
}: Props){
    const router = useRouter()
    const pathname = usePathname()

    if(currentUserId !== authorId || pathname !== "/")return null;

    return(
        <>
            <Image 
                src="/assets/delete.svg"
                alt="Delete Button"
                width={25}
                height={25}
                className="cursor-pointer object-contain"
                onClick={ async () =>{
                    await deleteDovePost(JSON.parse(dovePostId), pathname);

                    if(!parentId || isComment){
                        router.push("/");
                    }
                }}
            />
        </>
    )
}

export default DeleteDovePost