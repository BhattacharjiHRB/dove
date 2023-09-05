import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import DeleteDovePost from "../forms/DeleteDovePost";



interface Props {
        id: string;
        currentUserId: string;
        parentId: string | null;
        content: string;
        author:{
            id: string
            name: string,
            image: string,
        };
        community: {
            id: string,
            name: string,
            image: string
        } | null;
        createdAt: string;
        comments: {
            author:{
                image: string;
            }
        }[];
        isComment?: boolean;
}


export default function DovePostCard(
       { id,
        currentUserId,
        parentId,
        content,
        author,
        community,
        createdAt,
        comments,
        isComment}:Props){
           
            return(
                <article className={`flex w-full flex-col rounded-xl bg-dark-2 p-10 ${isComment ? 'px-0 xs:px-5':'bg-dark-2 p-10'} ` }>
                    <div className="flex items-start justify-between">
                        <div className="flex w-full flex-1 flex-row gap-6">
                            <div className="flex flex-col items-center">

                                <Link href={`/profile/${author.id}`} className="relative h-10 w-10">
                                    <Image 
                                        src={author.image} 
                                        alt="user profile image" 
                                        fill
                                        className="cursor-pointer rounded-full "
                                    />
                                </Link>
                                <div className="thread-card_bar" />
                            </div>
                            <div>
                                <Link href={`/profile/${author.id}`} className="w-fit">
                                    <h4 className="text-base-semibold text-light-3 cursor-pointer">
                                        {author.name}
                                    </h4>
                                </Link>

                                <p className="mt-2 text-small-regular text-light-1">{content}</p>

                                <div className="mt-5 flex flex-col gap-4">
                                    <div className="flex gap-3.5">
                                        <Image
                                            src="/assets/heart-gray.svg"
                                            alt="heart reaction"
                                            height={24}
                                            width={24}
                                            className="cursor-pointer object-contain"
                                        />
                                        <Link 
                                        href={`/doveposts/${id}`}>
                                          <Image
                                            src="/assets/reply.svg"
                                            alt="heart reaction"
                                            height={24}
                                            width={24}
                                            className="cursor-pointer object-contain"
                                        />
                                        </Link>
                                          <Image
                                            src="/assets/repost.svg"
                                            alt="heart reaction"
                                            height={24}
                                            width={24}
                                            className="cursor-pointer object-contain"
                                        />
                                          <Image
                                            src="/assets/share.svg"
                                            alt="heart reaction"
                                            height={24}
                                            width={24}
                                            className="cursor-pointer object-contain"
                                        />
                                    </div>
                                    {isComment && comments.length > 0 && (
                                        <Link href={`/doveposts/${id}`}>
                                            <p className="mt-1 text-subtle-medium text-zinc-100">{comments.length} {comments.length > 1 ?"Replies" : "Reply" }</p>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Delete DovePost */}
                        <DeleteDovePost 
                            dovePostId={JSON.stringify(id)}
                            currentUserId={currentUserId}
                            authorId={author.id}
                            parentId={parentId}
                            isComment = {isComment}

                        />
                        {/* Show comment Logos  */}
                    </div>
                        {isComment && community && (
                            <Link 
                                href={`/community/${community.id}`} 
                                className="mt-5 flex items-center"
                            >
                                <p className="text-subtle-medium text-gray-1">
                                    {formatDateString(createdAt)}
                                    {""} - {community.name} Community
                                </p>
                                <Image   
                                    src={community.image}
                                    alt={community.name}
                                    width={15}
                                    height={15}
                                    className="ml-1 rounded-full object-cover"
                                />
                            </Link>
                        )}
                </article>
            )
}