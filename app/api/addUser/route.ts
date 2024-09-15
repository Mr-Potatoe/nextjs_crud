// app/api/addUser/route.ts
import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { ResultSetHeader } from 'mysql2';

export async function POST(req: Request) {
  const { name, email }: { name: string; email: string } = await req.json();

  try {
    const conn = await db();
    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    const values = [name, email];
    const [result] = await conn.execute<ResultSetHeader>(query, values);
    await conn.end();

    return NextResponse.json({ id: result.insertId, message: 'User added successfully!' });
  } catch (error) {
    return NextResponse.json({ error: 'Error adding user' }, { status: 500 });
  }
}
