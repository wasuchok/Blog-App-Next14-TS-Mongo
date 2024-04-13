import Link from "next/link"


const AdminHeader = () => {
  return (
    <>
        <nav className="flex text-white justify-center mt-3">
            <Link href="/dashboard/admin">แอดมิน</Link>
            
        </nav>
    </>
  )
}

export default AdminHeader