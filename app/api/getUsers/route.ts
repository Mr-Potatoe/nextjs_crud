// app/api/getUsers/route.ts
import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function GET() {
  try {
    const conn = await db();
    const [users] = await conn.execute('SELECT * FROM users');
    await conn.end();

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
}
