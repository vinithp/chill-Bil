import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    userName: {
        type:String,
        require: [true, 'please provide userName'],
    },
    data: {
        type:Object,
        require: [true, 'please provide Object'],
    },
    action: {
        type:String,
        require: [true, 'please provide action'],
    }
},
{
    timestamps: true,
})

const Log = mongoose.models.logs || mongoose.model("logs", logSchema)

export default Log
