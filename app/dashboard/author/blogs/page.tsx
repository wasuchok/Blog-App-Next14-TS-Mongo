"use client"

import axios from "axios"
import { useState, useEffect } from "react"

import BlogCard from "@/components/blog/view/BlogCard"

const AuthorBlogs : React.FC<any> = ({ searchParams }) => {
    const [blogs, setBlogs] = useState([])
    const [page, setPage] = useState<number | any>(1)
    const [totalPages, setTotalPages] = useState<number>(1)

    const getBlogsbyAuthor = async (page = 1) => {
        const response = await axios.get(`/api/author/blogs?page=${page}`)
        if(response.status == 200) {
            setBlogs(response.data.blogs)
            setTotalPages(response.data.totalPages)
            setPage(response.data.page)
          }
    }

    useEffect(() => { getBlogsbyAuthor(searchParams?.page) },[searchParams?.page])
  
  return (
    <>
        <div className="">
          {blogs && blogs.map((blog : any) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
    </>
  )
}

export default AuthorBlogs