import { NextResponse } from "next/server";
import Tag from '@/models/tag'

import dbConnect from "@/utils/dbConnect";
import slugify from "slugify";

import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth/next";

export async function POST(req : Request) {
    await dbConnect()
    const session = await getServerSession(authOptions)

    const { name } = await req.json()

    try {
        const tag = await Tag.create({ name , slug : slugify(name), postedBy : session?.user?._id  })
        return NextResponse.json(tag)
    } catch (err : any) {
        return NextResponse.json({ err : err.message }, { status : 500 })
    }
}


