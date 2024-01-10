import mongoose from "mongoose";

const configSchema = new mongoose.Schema({
    dbp: {
        monday: {
            dbpId:{
                type: mongoose.Types.ObjectId,
                ref: "Dbp",
            },
            value: String 
        },
        tuesday: {
            dbpId:{
                type: mongoose.Types.ObjectId,
                ref: "Dbp",
            },
            value: String 
        },
        wednesday: {
            dbpId:{
                type: mongoose.Types.ObjectId,
                ref: "Dbp",
            },
            value: String 
        },
        thursday: {
            dbpId:{
                type: mongoose.Types.ObjectId,
                ref: "Dbp",
            },
            value: String 
        },
        friday: {
            dbpId:{
                type: mongoose.Types.ObjectId,
                ref: "Dbp",
            },
            value: String 
        },
        saturday: {
            dbpId:{
                type: mongoose.Types.ObjectId,
                ref: "Dbp",
            },
            value: String 
        },
        sunday: {
            dbpId:{
                type: mongoose.Types.ObjectId,
                ref: "Dbp",
            },
            value: String 
        },
    },
    dap: [{
        dapId: {
          type: mongoose.Types.ObjectId,
          ref: "Dap",
        },
        value: {
          type: String,
        }
      }],
      tmf: [{
        tmfId: {
          type: mongoose.Types.ObjectId,
          ref: "Tmf",
        },
        value: {
          type: String,
        }
      }],
      wc: [{
        wcId: {
          type: mongoose.Types.ObjectId,
          ref: "Wc",
        },
        value: {
          type: String,
        }
      }],
      status: {
        type: String,
        require: [true, 'please provide status']
      }
},
{
    timestamps: true,
})

const Config = mongoose.models.configs || mongoose.model("configs", configSchema)

export default Config