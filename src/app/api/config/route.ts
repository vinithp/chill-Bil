import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse} from 'next/server'
import Config from '@/module/configModule'
import mongoose from "mongoose";
import Log from '@/module/loggingModule'

connect()
export async function POST(req: NextRequest){
    try {
        const reqBody = await req.json()
        const {id, dbp, dap, tmf, wc} = reqBody
        if(!dbp && !dap && !tmf && !wc){
            return NextResponse.json({error:'provide all necessary data'},{status: 400})
        }

        const log = new Log({
            userName: req.cookies.get('userName')?.value || '',
            data: reqBody,
            action: 'UPDATING/CREATING'
          });

        log.save()

        let query={
            _id: id || new mongoose.Types.ObjectId()
        }
        let options = { upsert: true, new: true, setDefaultsOnInsert: true }

        await Config.findOneAndUpdate(query,{
            dbp: dbp,
            dap: dap,
            tmf: tmf,
            wc: wc,
            status: 'inActive'
        },options)

        return NextResponse.json({message:'item added successfully'},{status: 201})

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({error:error.message},{status: 500})
    }
}

export async function GET(req: NextRequest){
    try {
        let result = await Config.find({})
        return NextResponse.json(result, {status:200})
        
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({error:error.message},{status: 500})
    }
}

export async function PATCH(req: NextRequest){
    try {
        const reqBody = await req.json()
        const {id, status} = reqBody
        if(!id && !status){
            return NextResponse.json({error:'provide all necessary data'},{status: 400})
        }

        const log = new Log({
            userName: req.cookies.get('userName')?.value || '',
            data: reqBody,
            action: 'UPDATING'
          });

        log.save()

        if(status == 'active'){
            await Config.findOneAndUpdate({status:'active'},{
                status: 'inActive'
            })
        }
        await Config.findOneAndUpdate({_id: id},{
            status: status
        })

        return NextResponse.json({message:'item updated successfully'},{status: 200})

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({error:error.message},{status: 500})
    }
}