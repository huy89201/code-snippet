import mongoClient from '@/lib/mongoDB';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SnippetPayload;

    // Connect
    await mongoClient.connect();

    // Get collection
    const db = mongoClient.db('code_snippet_db');
    const collection = db.collection('snippets');

    // Save
    const res = await collection.insertOne(body);

    return NextResponse.json({
      id: res.insertedId,
    });
  } catch (error) {
    console.log(error);
  }
}
