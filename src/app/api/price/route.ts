import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse} from 'next/server'
import Dbp from '@/module/dbpModule'
import Dap from '@/module/dapModule'
import Tmf from '@/module/tmfModule'
import Wc from '@/module/wcModule'
import Log from '@/module/loggingModule'

connect()
export async function POST(req: NextRequest){
    try {
        const reqBody = await req.json()
        const {model, data} = reqBody
        if(!model && !data){
            return NextResponse.json({error:'provide all necessary data'},{status: 400})
        }
        let query
        let options = { upsert: true, new: true, setDefaultsOnInsert: true }
        let response

        const log = new Log({
            userName: req.cookies.get('userName')?.value || '',
            data: reqBody,
            action: 'UPDATING/CREATING'
          });

        let res = await log.save()
          console.log(res)

        switch(model){
            case 'dbp':
                response = await Dbp.findOneAndUpdate(data,{},options)
                response = {[`${response.range}KM, ${response.price}₹`]: response._id}
                break;
            case 'dap':
                response = await Dap.findOneAndUpdate(data,{},options)
                response = {[`${response.range}KM, ${response.price}₹`]: response._id}
                break;
            case 'tmf':
                response = await Tmf.findOneAndUpdate(data,{},options)
                response = {[`${response.time}m, ${response.price}₹`]: response._id}
                break;
            case 'wc':
                response = await Wc.findOneAndUpdate(data,{},options)
                response = {[`${response.time}m ${response.price}₹`]: response._id}
                break;

        }
        return NextResponse.json({data: response, message:'item added successfully'},{status: 201})

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({error:error.message},{status: 500})
    }
}

export async function DELETE(req: NextRequest){
    try {
        const reqBody = await req.json()
        const {model, id} = reqBody
        if(!model && !id){
            return NextResponse.json({error:'provide all necessary data'},{status: 400})
        }
        let query={
                 _id: id   
        }
        const log = new Log({
            userName: req.cookies.get('userName')?.value || '',
            data: reqBody,
            action: 'DELETE'
          });

        log.save()

        switch(model){
            case 'dbp':
                await Dbp.deleteOne(query)
            case 'dap':
                await Dap.deleteOne(query)
            case 'tmf':
                await Tmf.deleteOne(query)
            case 'wc':
                await Wc.deleteOne(query)

        }

        return NextResponse.json({message:'item deleted successfully'},{status: 201})

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({error:error.message},{status: 500})
    }
}

export async function GET(req: NextRequest){
    try {
        const allQueries = [
            Dbp.find(),
            Dap.find(),
            Tmf.find(),
            Wc.find(),
        ]
        let result = await Promise.all(allQueries)
            let dbp: any = {}
            let dap: any = {}
            let tmf: any = {}
            let wc: any = {}
            result[0].map((item: any) => {
                let key = `${item.range}KM, ${item.price}₹`;
                dbp[key] = item._id
              })
              result[1].map((item: any) => {
                let key = `${item.range}KM, ${item.price}₹`;
                dap[key] = item._id
              })
              result[2].map((item: any) => {
                let key = `${item.time}m, ${item.price}₹`;
                tmf[key] = item._id
              })
              result[3].map((item: any) => {
                let key = `${item.time}M, ${item.price}₹`;
                wc[key] = item._id
              })

            return NextResponse.json({dbp, dap, tmf, wc}, {status:200})
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({error:error.message},{status: 500})
    }
}