import { NextResponse } from "next/server";
import Tag from '@/models/tag'

import dbConnect from "@/utils/dbConnect";

export async function GET() {
    await dbConnect()

    try {
        const tags = await Tag.find({}).sort({ createdAt : -1 })
        return NextResponse.json(tags)
    } catch (err : any) {
        return NextResponse.json({ err : err.message }, { status : 500 })
    }
}