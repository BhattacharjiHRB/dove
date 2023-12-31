import mongoose from "mongoose"



const userSchema = new mongoose.Schema({
    id: {
        type: "string",
        required: true,
        unique: true
    },
    username: {
        type: "string",
        required: true,
        unique: true
    },
    name: {
        type: "string",
        required: true,
    },
    image: {
        type: "string",
    },
    bio: {
        type: "string",
    },
    dovepost:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"DovePost"
    }],
    onboarded:[{
        type: Boolean,
        default: false
    }],
    communites:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Community"
    }]

});

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;