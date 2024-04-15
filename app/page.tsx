"use client"

import BlogCard from "@/components/blog/view/BlogCard";
import Link from "next/link";
import axios from "axios"; 
import { useEffect, useState } from "react";


const Home: React.FC<any> = ({ searchParams }) => {
  const [blogs, setBlogs] = useState([])
  const [page, setPage] = useState<number | any>(1)
  const [totalPages, setTotalPages] = useState<number>(1)

  const getBlogs = async (page = 1) => {
   const response = await axios.get(`/api/blogs?page=${page}`)
      console.log(response)
      if(response.status == 200) {
        
        setBlogs(response.data.blogs)
        setTotalPages(response.data.totalPages)
        setPage(response.data.page)
      }
    }

  useEffect(() => {
    getBlogs(searchParams.page)
  },[searchParams.page])

  return (
    <>
      <div className="my-5">
        {blogs.map((blog : any) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>

      <div className="flex justify-center gap-4 my-4">

        {page > 1 && (
                  <div className="text-white hover:text-orange-300">
                  <Link href={`/?page=${parseInt(page) - 1}`}>Prev</Link>
                  </div>
        )}

        {Array.from({ length: totalPages }, (_, index) => {
          const p = index + 1;
          return (
              <Link key={p}
                className={` text-lg text-white w-10 rounded-sm text-center ${page == p ? "bg-slate-600" : "bg-blue-600"}`}
                href={`/?page=${p}`}
                as={`/?page=${p}`}
              >
                {p}
              </Link>
          );
        })}

        {page < totalPages && (
                  <div className="text-white hover:text-orange-300">
                  <Link href={`/?page=${parseInt(page) + 1}`}>Next</Link>
                  </div>
        )}


      </div>
    </>
  );
};

export default Home;
