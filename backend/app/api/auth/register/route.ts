import bcrypt from "bcrypt";
import pool from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();
    if (!username || !email || !password) {
      return NextResponse.json({ error: "Username, email, and password are required" }, { status: 400 });
    }

    const checkUser = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (checkUser && checkUser.rows.length > 0) {
      return NextResponse.json({ error: "Username already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", [username, email, hashedPassword]);

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
