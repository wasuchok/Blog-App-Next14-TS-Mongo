import { NextResponse } from "next/server";
import Blog from '@/models/blog'

import dbConnect from "@/utils/dbConnect";
import slugify from "slugify";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

import md from 'markdown-it'
import User from "@/models/user";

const createExcerpt = (content : any) => {
    const htmlContent = md().render(content)

    const excerpt = htmlContent
    .replace(/<img>[^>]*>/g, "")
    .replace(/<h[1-6]>/g, "<p>")
    .replace(/<\/h[1-6]>/g, "</p>")
    .replace(/<blockquote>/g, "<p>")
    .replace(/<\/blockquote>/g, "</p>")
    .substring(0, 160)

    return (
        excerpt.replace(/<[^>]*$/, "") + (htmlContent.length > 160 ? "..." : "")
    )
}

export async function POST(req : Request) {
    await dbConnect()
    const session = await getServerSession(authOptions)
    const body = await req.json()

    try {
        const blog = await Blog.create({
            ...body,
            slug : slugify(body.title),
            postedBy : session?.user?._id,
            excerpt : createExcerpt(body.content)
        })

        await User.findOneAndUpdate({
            _id : session?.user?._id
        }, {
            $addToSet : {
                role : "author"
            }
        })
        return NextResponse.json(blog)
    } catch (err : any) {
        return NextResponse.json({ error : err.message }, { status : 500 })
    }
}