import mongoose from "mongoose"

const dovePostSchema = new mongoose.Schema({
   
    text:{
        type: "string",
        required: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },
    community:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Community',

    },
    createdAt:{
        type:Date,
        default: Date.now(),

    },
    parentId:{
        type:String,
    },
    children:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'DovePost'
    }],


});

const DovePost = mongoose.models.DovePost || mongoose.model("DovePost", dovePostSchema)

export default DovePost;