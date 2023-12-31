"use client"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {UserValidation} from "@/lib/validations/user";
import {ChangeEvent, useState} from "react"
import Image from "next/image"
import {isBase64Image} from "@/lib/utils"
import {useUploadThing} from "@/lib/uploadthing"
import {usePathname, useRouter} from "next/navigation"
import { updateUser } from "@/lib/actions/user.actions";
import {z} from "zod";


interface Props {
   user:{ 
        id: string;
        objectId:string,
        userName: string;
        name:string;
        bio:string;
        image:string;
   }
   btnTitle:string;
};

const AccountProfile = ({user, btnTitle}:Props) => {

    const [files, setFiles] = useState<File[]>([]);
    const {startUpload} = useUploadThing("media") 
    const router = useRouter();
    const pathname = usePathname();

    
    const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues:{
          name: user?.name||"",
          username: user?.userName||"",
          bio: user?.bio||"",
          profile_Photo: user?.image||"",
        }

    });

    const handleImage = (
      e:ChangeEvent<HTMLInputElement>, 
      fieldChange:(value:string)=>void
      ) => {
        e.preventDefault();

        const fileReader = new FileReader();

        if(e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]

            setFiles(Array.from(e.target.files))

            if(!file.type.includes('image')) return null;

            fileReader.onload = async (event) =>{
                const imageDataUrl = event.target?.result?.toString() || "";
                fieldChange(imageDataUrl);
            }
            fileReader.readAsDataURL(file);
        }
    };


  const onSubmit = async(values: z.infer<typeof UserValidation>) => { 
            
            const blob = values.profile_Photo;

            const hasImageChanged = isBase64Image(blob);

            if(hasImageChanged){
              const imgRes = await startUpload(files);

              if(imgRes && imgRes[0].fileUrl){
                  values.profile_Photo = imgRes[0].fileUrl;
              }
            }
              // update User profile 
            await updateUser(
                  {
                      userId:user.id,
                      username: values.username,
                      name:  values.name,
                      bio: values.bio,
                      image: values.profile_Photo,
                      path:pathname
                  }
              );
              if(pathname ==="/profile/edit"){
                  router.back();
              }else{
                  router.push('/')
              }
    };
    
    

    return(
        <Form {...form}>
       <form
          className='flex flex-col justify-start gap-10'
          onSubmit={form.handleSubmit(onSubmit)}
          >
        <FormField
          control={form.control}
          name="profile_Photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-5">
              <FormLabel className="account-form_image-lable" >
                {field.value ?(
                    <Image 
                    src = {field.value}
                    alt = "Profile Photo"
                    width={86}
                    height = {86}
                    priority
                    className="object-contain rounded-full"
                    />
                ):(
                    <Image
                    src = '/assets/profile.svg'
                    alt = "Profile Photo"
                    width={24}
                    height = {24}
                    className="object-contain "
                    /> 
                )}
              </FormLabel>
              <FormControl className="flex text-base-semibold text-zinc-500">
                <Input 
                type="file"
                accept="image/*"
                className="account-form_image-input"
                onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col items-center gap-5">
              <FormLabel className="text-base-semibold text-light-2 w-full gap-4 " >
                Name
              </FormLabel>
              <FormControl className="flex text-base-semibold text-zinc-500">
                <Input
                type="text"
                className="account-form_imput no-focus  bg-zinc-700/50 text-white"
                    {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col items-center gap-5">
              <FormLabel className="text-base-semibold text-light-2 w-full gap-4 " >
                UserName
              </FormLabel>
              <FormControl className="flex text-base-semibold text-zinc-500">
                <Input 
                type="text"
                className="account-form_imput no-focus  bg-zinc-700/50 text-white"
                    {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col items-center gap-5">
              <FormLabel className="text-base-semibold text-light-2 w-full gap-4 " >
                Bio
              </FormLabel>
              <FormControl className="flex text-base-semibold text-zinc-500">
                <Textarea 
                rows={5}
                className="account-form_imput no-focus bg-zinc-700/50 text-white"
                    {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className=" bg-cyan-900 ">{btnTitle}</Button>
      </form>
    </Form>
    )
}

export default AccountProfile