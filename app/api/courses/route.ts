import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import { db } from "@/prisma/db";
export async function POST(req:Request) {
    try {
        const { userId } = auth();
        const {title} = await req.json();
        if(!userId){
            return new NextResponse("Unauthorized",{status:401})
        }
        const course = await db.course.create({
            data:{
                userId,
                title
            }
        })
        return new NextResponse(JSON.stringify(course),{status:200})
    } catch (error) {
        console.log('[Courses]: ', error)
        return new  NextResponse("Internal Error",{status:500})
    }
} 