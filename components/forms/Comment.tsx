"use client"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {usePathname, useRouter} from "next/navigation"
import { string, z } from "zod";
import {CommentValidation} from "@/lib/validations/dove";
import { addCommentToDovepost } from "@/lib/actions/dovepost.actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";

interface Props{
    dovepostId: string;
    currentUserimg: string;
    currentUserId: string;
}

const Comment = ({dovepostId, currentUserimg, currentUserId}:Props) => {

    const pathname = usePathname();
   
    
    const form = useForm<z.infer<typeof CommentValidation>>({
        resolver: zodResolver(CommentValidation),
        defaultValues:{
          dove:"",
        
        }
    });

   const onSubmit = async (values: z.infer<typeof CommentValidation>) =>{
    await addCommentToDovepost(
        dovepostId,values.dove, 
        JSON.parse(currentUserId),
        pathname
      );
    
        form.reset();
   };
    
    return(
        <Form {...form}>
        <form
        className='comment-form'
        onSubmit={form.handleSubmit(onSubmit)}
        >
           <FormField
            control={form.control}
            name="dove"
            render={({ field }) => (
        <FormItem className="flex w-full items-center ">
          <FormLabel className="text-base-semibold text-light-2 w-full gap-4 mt-5 " >
                <Image 
                    src={currentUserimg}
                    alt = "User DP"
                    width = {48}
                    height = {48}
                    className="rounded-full object-cover" 
                />
          </FormLabel>
          <FormControl className="border-none bg-transparent">
            <Input 
            type="text"
            className=" no-focus border-dark-4 bg-dark-3 text-white"
            placeholder="Comment..."
                {...field}
            />

          </FormControl>
          <FormMessage/>
        </FormItem>
      )}
    />
      <Button type="submit" 
        className="comment-form_btn">Reply
      </Button>
        </form>
    </Form>  
    )
};

export default Comment;