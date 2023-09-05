import mongoose from "mongoose";



const communitySchema = new mongoose.Schema({
    id:{
        type: 'string',
        required: true
    },
    username: {
        type: 'string',
        required: true,
        unique: true
    },
    image: {
        type:'string'
    },
    bio:{
        type:'string'
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    dovepost:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'DovePost'
        }
    ],
    members:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
    

})

const Community = mongoose.models.Community || mongoose.model("Community", communitySchema)

export default Community;