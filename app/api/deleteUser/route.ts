// app/api/deleteUser/route.ts
import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function DELETE(req: Request) {
  const { id }: { id: number } = await req.json();

  try {
    const conn = await db();
    const query = 'DELETE FROM users WHERE id = ?';
    await conn.execute(query, [id]);
    await conn.end();

    return NextResponse.json({ message: 'User deleted successfully!' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
  }
}
