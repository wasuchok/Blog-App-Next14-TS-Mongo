import Link from "next/link"

import AdminHeader from "@/components/nav/AdminHeader"

const AdminLayout : React.FC<any> = ({ children }) => {
  return (
    <>
    <AdminHeader />
        {children}
    </>
  )
}

export default AdminLayout