"use client"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {usePathname, useRouter} from "next/navigation"
import { z } from "zod";
import {DoveValidation} from "@/lib/validations/dove";
import {createDovePost} from "@/lib/actions/dovepost.actions";
import { Button } from "../ui/button";
import { useOrganization } from "@clerk/nextjs";



interface Props {
  userId: string;
}


function PostDove({userId}:Props){
     
    const router = useRouter();
    const pathname = usePathname();
    const {organization} = useOrganization()
  
     const form = useForm<z.infer<typeof DoveValidation>>({
         resolver: zodResolver(DoveValidation),
         defaultValues:{
           dove:"",
           accountId: userId,
         }
     });

    const onSubmit = async(values: z.infer<typeof DoveValidation>) =>{
            await createDovePost({
                text : values.dove, 
                author: userId, 
                communityId: organization? organization.id : null, 
                path: pathname,
              });
            router.push("/");
      };
    return(
        <Form {...form}>
            <form
            className='flex flex-col justify-start gap-10' 
            onSubmit={form.handleSubmit(onSubmit)}
            >
               <FormField
                control={form.control}
                name="dove"
                render={({ field }) => (
            <FormItem className="flex w-full flex-col items-center ">
              <FormLabel className="text-base-semibold text-light-2 w-full gap-4 mt-5 " >
               Content
              </FormLabel>
              <FormControl className="flex text-base-semibold  no-focus border-dark-4 bg-dark-3 text-white">
                <Textarea 
                rows={10}
                placeholder="Write your DovePost"
                    {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
            <Button type="submit" 
              className="bg-cyan-900"
              > Publish DovePost
            </Button>
          </form>
        </Form>  
    
    );
}

export default PostDove;