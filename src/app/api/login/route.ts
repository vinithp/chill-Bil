import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse} from 'next/server'
import jws from 'jsonwebtoken'
// import {NextApiRequest, NextApiResponse} from 'next'

connect()
export async function POST(req: NextRequest){
    try {
        const reqBody = await req.json()
        const {userName} = reqBody
        const response = NextResponse.json({data:userName ,message:'logged in successfully'},{status: 200})
        response.cookies.set('userName', userName)
        return response

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({error:error.message},{status: 500})
    }
}