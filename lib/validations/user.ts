import * as z from "zod"


export const UserValidation = z.object({
    
    profile_Photo: z.string().url().nonempty(),
    name: z.string().min(5,"Minimum 5 characters").max(30,"Maximum 30 characters"),
    username: z.string().min(5,"Minimum 5 characters").max(30,"Maximum 30 characters"),
    bio: z.string().min(5,"Minimum 5 characters").max(300,"Maximum 300 characters"),
})