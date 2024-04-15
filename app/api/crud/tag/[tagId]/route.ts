import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Tag from "@/models/tag";

import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth/next";
import Blog from "@/models/blog";

export async function DELETE(req : Request, { params }: { params: { tagId: string } }) {
    try {
        await dbConnect()
        const session = await getServerSession(authOptions)

        const tag = await Tag.findOne({ _id : params.tagId })
        if (!tag) {
            return NextResponse.json({ error : "Tag not found" }, { status : 404 })
        }
        if(tag.postedBy.toString() == session?.user?._id || session?.user?.role == "admin") {
            const blogsWithThisTag = await Blog.find({ tags : params.tagId})
            if(blogsWithThisTag.length == 0) {
                const deleteTag = await Tag.deleteOne({ _id : params.tagId })
                if(deleteTag) {
                    return NextResponse.json(tag.name)
                }
            } else {
                return NextResponse.json({ error : "This tag is used by some blogs." }, { status : 400 })
            }

        }

    } catch (err : any) {
        return NextResponse.json({ err : err.message }, { status : 500 })
    }
}