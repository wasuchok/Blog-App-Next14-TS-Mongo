import CrendentialsProvider from 'next-auth/providers/credentials'

import User from '@/models/user'
import bcrypt from 'bcrypt'
import dbConnect from '@/dbConnect'

export const authOptions = {
    session : {
        strategy : jwt
    },
    
    providers : [
        CrendentialsProvider({
            async authorize(credentials, req) {
                await dbConnect()

                const { email, password } = credentials

                const user = await User.findOne({ email })

                if(!user) {
                    throw new Error("Invalid email or password")
                }

                if(!user?.password) {
                    throw new Error("Please login via the method you used to signup")
                }

                const isPasswordMatched = await bcrypt.compare(password, user.password)

                if(!isPasswordMatched) {
                    throw new Error("Invalid email or password")
                }

                return user

            }
        })
    ],

    secret : process.env.DB_SECRET,

    pages : {
        signIn : '/login'
    }
}