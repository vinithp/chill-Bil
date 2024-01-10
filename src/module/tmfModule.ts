import mongoose from "mongoose";

const tmfSchema = new mongoose.Schema({
    price: {
        type:Number,
        require: [true, 'please provide price'],
    },
    time: {
        type:Number,
        require: [true, 'please provide time'],
    }
},
{
    timestamps: true,
})

const Tmf = mongoose.models.tmfs || mongoose.model("tmfs", tmfSchema)

export default Tmf