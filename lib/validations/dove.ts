import * as z from "zod";




export const DoveValidation = z.object({
    dove: z.string().min(5,"Minimum 5 characters").max(300,"Maximum 300 characters"),
    accountId: z.string()
    
})

export const CommentValidation = z.object({
    dove: z.string().min(5,"Minimum 5 characters").max(300,"Maximum 300 characters"),
    
})