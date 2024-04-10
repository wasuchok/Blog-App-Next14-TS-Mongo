import Link from "next/link";
import React from "react";

import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const { data, status } = useSession();

  return (
    <>
      <nav className="bg-[#4F4557] text-white drop-shadow-lg flex justify-between h-20 text-xl items-center px-10 font-bold ">
        <div className="flex flex-none gap-6">
          <Link href="/">แอปบล็อก</Link>

          <Link href="/blog/create" className="">
            เขียนบล็อก
          </Link>
        </div>

        <div>
          { status === "authenticated" ? 
          <>
          <div className="flex gap-6 flex-none">
          <Link href={`/dashboard/user`}>{data?.user?.name}</Link>

          {data?.user?.role?.filter((r : any) => (r !== 'subscriber')).map((r : any, i : number) => 
          <Link key={i} href={`/dashboard/${r}`}>{r?.charAt(0).toUpperCase()}{r?.slice(1)}</Link>
          )}

        <button onClick={() => signOut({ callbackUrl : "/login"})}>Logout</button>
          </div>

          </> : 
                  <div className="flex flex-none gap-6">
                  <Link href="/login">เข้าสู่ระบบ</Link>
                  <Link href="/register">สมัครสมาชิก</Link>
                </div>
          }
        </div>

      </nav>
    </>
  );
};

export default Header;
