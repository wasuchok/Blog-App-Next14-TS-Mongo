import { NextResponse } from "next/server";
import Blog from '@/models/blog'
import dbConnect from '@/utils/dbConnect'
import User from '@/models/user';

export async function GET(req : Request) {
    await dbConnect();
  
    const page = req.nextUrl.searchParams.get("page") || 1;
    const pageSize = 6;
  
    try {
      const skip = (page - 1) * pageSize;
      const totalBlogs = await Blog.countDocuments();
      const blogs = await Blog.find()
        .select("-content")
        .populate("postedBy", "name")
        .populate("tags", "name slug")
        .skip(skip)
        .limit(pageSize)
        .sort({ createdAt: -1 }).exec()
  
      return NextResponse.json(
        {
          blogs,
          page,
          totalPages: Math.ceil(totalBlogs / pageSize),
        },
        { status: 200 }
      );
    } catch (err : any) {
      console.log(err);
      return NextResponse.json(
        {
          err: err.message,
        },
        { status: 500 }
      );
    }
  }