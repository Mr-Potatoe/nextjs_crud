// app/api/updateUser/route.ts
import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function PUT(req: Request) {
  const { id, name, email }: { id: number; name: string; email: string } = await req.json();

  try {
    const conn = await db();
    const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    const values = [name, email, id];
    await conn.execute(query, values);
    await conn.end();

    return NextResponse.json({ message: 'User updated successfully!' });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
  }
}
