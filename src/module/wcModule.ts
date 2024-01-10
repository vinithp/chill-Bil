import mongoose from "mongoose";

const wcSchema = new mongoose.Schema({
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

const Wc = mongoose.models.wcs || mongoose.model("wcs", wcSchema)

export default Wc