import mongoose from "mongoose";

const dbpSchema = new mongoose.Schema({
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

const Dbp = mongoose.models.dbps || mongoose.model("dbps", dbpSchema)

export default Dbp
