"use client"

import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const Register = () => {
    const router = useRouter()


    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false) 

    const handleSubmit = async (e : any) => {
        e.preventDefault()

        try {
            setLoading(true)

            const response = await axios.post(`/api/register`, {
                name,
                email,
                password
            })

            console.log(response)

            if(response.status == 201) {
                toast.success(response.data.success)
                router.push('/login')
            } else {

                setLoading(false)
                toast.error("Error: " + response.status)
                console.log(response)
            }

        } catch (err) {
            console.log(err)
            setLoading(false)
            toast.error("An error occurred, Please try again")
        }
    }

  return (
    <>
    <div className="">
        <div className="flex justify-center items-center h-[90vh] text-white ">
            <div className="p-10 shadow-xl w-[80vh] mx-auto">
                <h2 className="text-[29px]">หน้าสมัครสมาชิก</h2>

                <form onSubmit={handleSubmit}>
                    
                    <input type="text" value={name} onChange={(e : any) => setName(e.target.value)} className="p-3 mb-4 rounded-md w-full text-black" placeholder='Your name' required />
                    <input type="email" value={email} onChange={(e : any) => setEmail(e.target.value)} className="p-3 mb-4 rounded-md w-full text-black" placeholder='Your email' />
                    <input type="password" value={password} onChange={(e : any) => setPassword(e.target.value)} className="p-3 mb-4 rounded-md w-full text-black"  placeholder='Your password' />

                    <button className="w-full bg-[#F4EEE0] h-12 rounded-md text-[#6D5D6E] text-xl font-bold hover:bg-[#f4eee0ea]" disabled={loading}>{loading ? "กรุณารอสักครู่" : "บันทึก"}</button>

                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default Register