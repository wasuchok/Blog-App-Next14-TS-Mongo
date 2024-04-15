import { NextResponse } from "next/server";
import Blog from '@/models/blog'
import dbConnect from "@/utils/dbConnect";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

export async function GET(req : Request) {
    const session = await getServerSession(authOptions)

    await dbConnect()

    const page = req.nextUrl.searchParams.get("page") || 1

    const pageSize = 6;

    try {
        const skip = (page - 1) * pageSize
        const totalBlogs = await Blog.countDocuments({ postedBy : session?.user?._id })

        const blogs = await Blog.find({ postedBy : session?.user?._id }).select("-content").populate('postedBy', "name")
        .populate("tags", "name slug")
        .skip(skip)
        .limit(pageSize)
        .sort({ createdAt : -1 })

        return NextResponse.json({
            blogs,
            page,
            totalPages : Math.ceil(totalBlogs / pageSize)
        })
    } catch (err : any) {
        return NextResponse.json({ error : err.message }, { status : 500 })
    }
}