import mongoose from "mongoose";

const dapSchema = new mongoose.Schema({
    price: {
        type:Number,
        require: [true, 'please provide price'],
    },
    range: {
        type:Number,
        require: [true, 'please provide range'],
    }
},
{
    timestamps: true,
})

const Dap = mongoose.models.daps || mongoose.model("daps", dapSchema)

export default Dap
