import MarkdownEditor from "@/components/blog/BlogForm"
import FeaturedImage from "@/components/blog/FeaturedImage"
import TagForm from "@/components/tag/TagForm"
import axios from "axios"

const BlogCreatePage = () => {


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
          <button className="rounded-lg bg-blue-700 p-10 flex justify-center items-center text-[24px] font-semibold text-white tracking-wider hover:bg-blue-800">Submit</button>
        </div>

        

    </div>
  )
}

export default BlogCreatePage