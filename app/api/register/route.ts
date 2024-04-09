import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import User from "@/models/user"

import bcrypt from 'bcrypt'

export async function POST(req : Request) {
    await dbConnect()

    const { name, email, password } = await req.json();
    
    try {
        await new User({
            name,
            email,
            password : await bcrypt.hash(password, 10)
        }).save()
        return NextResponse.json({ success : "User created successfully" }, { status : 201 })
    } catch (err : any) {
        return NextResponse.json({ error : err.message }, { status : 422})
    }
}