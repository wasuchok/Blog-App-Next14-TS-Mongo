"use client"
import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from "next/link"

const Login = () => {
  const router = useRouter()

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e : any) => {
    e.preventDefault()
    setLoading(true)

    const result = await signIn("credentials", {
      redirect : false,
      email,
      password
    })

    setLoading(false)

    if(result?.error) {
      toast.error(result.error)
    } else {
      toast.success("เข้าสู่ระบบสำเร็จแล้ว")
      router.push("/")
    }

  }

  return (
    <>
    <div className="">
        <div className="flex justify-center items-center h-[90vh] text-white ">
            <div className="p-10 shadow-xl w-[80vh] mx-auto">
                <h2 className="text-[29px]">หน้าเข้าสู่ระบบ</h2>

                <form onSubmit={handleSubmit}>
                    
                    <input type="email" value={email} onChange={(e : any) => setEmail(e.target.value)} className="p-3 mb-4 rounded-md w-full text-black" placeholder='Your email' />
                    <input type="password" value={password} onChange={(e : any) => setPassword(e.target.value)} className="p-3 mb-4 rounded-md w-full text-black"  placeholder='Your password' />

                    <button className="w-full bg-[#F4EEE0] h-12 rounded-md text-[#6D5D6E] text-xl font-bold hover:bg-[#f4eee0ea]" disabled={loading}>{loading ? "กรุณารอสักครู่" : "ยืนยัน"}</button>

                </form>

                <Link href="/forgot-password" className="flex mt-4 hover:text-gray-300 text-lg justify-center">ลืมรหัสผ่านใช่หรือไม่?</Link>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login