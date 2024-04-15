import Link from "next/link"


const AuthorHeader = () => {
  return (
    <>
        <nav className="flex text-white justify-center mt-3">
            <div className="flex gap-2">
            <Link href="/dashboard/author">ผู้เขียน</Link>

            <Link href="/blog/create">เขียนบล็อก</Link>

            <Link href="/dashboard/author/blogs">บล็อกของฉัน</Link>
            
            </div>

            
        </nav>
    </>
  )
}

export default AuthorHeader