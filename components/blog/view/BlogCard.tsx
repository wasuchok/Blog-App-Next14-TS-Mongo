import Link from "next/link"
import "highlight.js/styles/monokai.css"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const BlogCard : React.FC<any> = ({ blog }) => {

  return (
    <>
    <div className="mb-5 ">
    <div className="h-[150px] overflow-hidden mx-[30vw] border-2 border-b-0">
                <img src={blog?.featuredImage || "/images/default.jpg" } className="w-[100vh] h-[300px] object-cover" />
    </div>
        <div className="flex text-white mx-[30vw] border-2 p-5">
            <div>
                <h5 className="text-2xl text-blue-300 font-semibold hover:text-blue-400">
                    <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                </h5>

                <div className="">
                    <div className="flex justify-center flex-col" dangerouslySetInnerHTML={{ __html : blog?.excerpt }}></div>
                </div>

            </div>
        </div>

        <div className="mx-[30vw] border-l-2 border-r border-b-2 text-xl text-white p-2 flex justify-between">
            <small className="">Tags 
            {blog?.tags?.map((tag : any) => (
                    <Link href={`/tag/${tag.slug}`} className="mx-2 bg-blue-500 p-1 rounded-md hover:bg-blue-600" key={tag._id}>{tag?.name}</Link>
            ))}
            </small>
            <small className="">Author : {blog?.postedBy?.name}</small>
        </div>

        <div className="mx-[30vw] border-l-2 border-r border-b-2 text-xl text-white p-2 flex justify-between">
            <small>Likes</small>
            <small>🕒 {dayjs(blog?.createdAt).fromNow()} by 🧑 {blog?.postedBy?.name}</small>
        </div>
        </div>
    </>
  )
}

export default BlogCard