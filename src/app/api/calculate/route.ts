import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse} from 'next/server'
import Dbp from '@/module/dbpModule'
import Dap from '@/module/dapModule'
import Tmf from '@/module/tmfModule'
import Wc from '@/module/wcModule'
import Config from '@/module/configModule'

connect()
export async function POST(req: NextRequest){
    try {
        const reqBody = await req.json()
        const {day, range, time, waitingTime} = reqBody
        if(!day && !range && !time && !waitingTime){
            return NextResponse.json({error:'provide all necessary data'},{status: 400})
        }
        let query={
            status: 'active'
        }

        let config = await Config.findOne(query).populate({ path: 'dbp.monday.dbpId dbp.tuesday.dbpId dbp.wednesday.dbpId dbp.thursday.dbpId dbp.friday.dbpId dbp.saturday.dbpId dbp.sunday.dbpId',model: Dbp}).populate({path:'dap.dapId', model:Dap}).populate({path:'tmf.tmfId', model:Tmf}).populate({path:'wc.wcId', model:Wc})
        if(!config){
        return NextResponse.json({ message:'no active config'},{status: 400})
        }
        const dbp = {range: config.dbp[day].dbpId.range, price: config.dbp[day].dbpId.price}

        const dap ={
            range:0,
            price:0,
            remidner:range,
        }
        for(let a=0; a<config.dap.length; a++){
            if(config.dap[a].dapId.range > range){
                continue
            }
            let diff = range-config.dap[a].dapId.range
            if(diff<dap.remidner){
                dap.range = config.dap[a].dapId.range
                dap.price = config.dap[a].dapId.price
                dap.remidner = diff
            }

        }
        const tmf ={
            duration:0,
            price:0,
            remidner:time,
        }
        for(let a=0; a<config.tmf.length; a++){
            if(config.tmf[a].tmfId.range > time){
                continue
            }
            let diff = time-config.tmf[a].tmfId.time
            if(diff<tmf.remidner){
                tmf.duration = config.tmf[a].tmfId.time
                tmf.price = config.tmf[a].tmfId.price
                tmf.remidner = diff
            }

        }

        const wc ={
            duration:0,
            price:0,
            remidner:waitingTime,
        }
        for(let a=0; a<config.wc.length; a++){
            if(config.wc[a].wcId.time > waitingTime){
                continue
            }
            let diff = waitingTime-config.wc[a].wcId.time
            if(diff<=wc.remidner){
                wc.duration = config.wc[a].wcId.time
                wc.price = config.wc[a].wcId.price
                wc.remidner = diff
            }
        }

        const dbpValue = (range/dbp.range)*dbp.price || 0
        const dapValue = ((range)*dap.price) || 0
        const tmfValue = ((tmf.duration/60)*tmf.price) || 0
        const wcValue = ((waitingTime/wc.duration)*wc.price) || 0
        return NextResponse.json((dbpValue+dapValue+tmfValue+wcValue),{status: 200})

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({error:error.message},{status: 500})
    }
}