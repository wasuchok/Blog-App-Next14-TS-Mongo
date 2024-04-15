"use client"

import MarkdownEditor from "@/components/blog/BlogForm"
import FeaturedImage from "@/components/blog/FeaturedImage"
import TagForm from "@/components/tag/TagForm"
import axios from "axios"

import { useContext } from "react"
import { BlogContext } from "@/app/context/blogContext"
import toast from "react-hot-toast"
import { useSession } from "next-auth/react"

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import md from '@/utils/md'

const BlogCreatePage = () => {

  const { title, markdown, selectedTags, featuredImage, setTitle, setMarkdown, setSelectedTags, setFeaturedImage } = useContext(BlogContext)
  const { data } = useSession();
  const handleSubmit = async (e : any) => {
    e.preventDefault()

    try {
      const response = await axios.post(`/api/crud/blog` , {
        title,
        content : markdown,
        tags : selectedTags,
        featuredImage
      })

      if(response.status == 200) {
        toast.success("Blog created successfully")
        console.log(response.data)
        setTitle("")
        setMarkdown("")
        setSelectedTags([])
        setFeaturedImage("")
      }
    } catch (err : any) {
      console.log(err.message)
      toast.error(err.message)
    }
  }

  return (
    <div>

        <div>
            <div><MarkdownEditor /></div>
        </div>

        <div className="m-2 text-white">
            <div>
              <TagForm />
            </div>
        </div>

        <div className="grid grid-cols-2 mb-5 gap-2 p-3">
          <button className="rounded-lg border-2 hover:bg-slate-100 hover:opacity-60 p-10 flex justify-center items-center text-[24px] font-semibold tracking-wider">
            <FeaturedImage />
          </button>
          <button onClick={handleSubmit} className="rounded-lg bg-blue-700 p-10 flex justify-center items-center text-[24px] font-semibold text-white tracking-wider hover:bg-blue-800">Submit</button>
        </div>

        <div className="flex flex-col mx-24  text-white">
        {featuredImage && (
        <img
          src={featuredImage}
          className="mb-5 w-auto rounded-lg mx-auto"
        />
      )}
      <div className="">
      <h1 className="text-bold text-2xl">{title}</h1>
          <p>
            Published on {dayjs(new Date()).format("YYYY-MM-DD HH:mm A")} by{" "}
            {data?.user?.name}
      </p>
      </div>

      <div>
      <div className="mb-5">
            {selectedTags?.map((t : any) => (
              <button
                className="m-2 bg-blue-600 rounded-lg min-w-24"
                key={t?._id}
                disabled
              >
                {t?.name}
              </button>
            ))}
          </div>
      </div>

      <div className="">
            <div dangerouslySetInnerHTML={{ __html: md.render(markdown) }} />
      </div>

        </div>

        

    </div>
  )
}

export default BlogCreatePage