import bcrypt from "bcrypt";
import pool from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }

    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (result.rowCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = Jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
    return NextResponse.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
