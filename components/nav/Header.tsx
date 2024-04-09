import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <>
        <nav className="bg-[#4F4557] text-white drop-shadow-lg flex justify-between h-20 text-xl items-center px-10 font-bold ">
<div className="flex flex-none gap-6">
<Link href="/">แอปบล็อก</Link>

<Link href="/blog/create" className="">เขียนบล็อก</Link>
</div>

<div className="flex flex-none gap-6">
    <Link href="/login">เข้าสู่ระบบ</Link>
    <Link href="/register">สมัครสมาชิก</Link>
</div>
        </nav>
    </>
  )
}

export default Header