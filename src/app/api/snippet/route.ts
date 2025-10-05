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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page'));
    const page_size = Number(searchParams.get('page_size'));

    // Connect
    await mongoClient.connect();

    // Get collection
    const db = mongoClient.db('code_snippet_db');
    const collection = db.collection('snippets');

    // Count total documents
    const total = await collection.countDocuments({});
    const total_pages = Math.ceil(total / page_size);

    const snippets = await collection
      .find({})
      .skip((page - 1) * page_size)
      .limit(page_size)
      .toArray();

    return NextResponse.json({
      page,
      page_size,
      total,
      total_pages,
      data: snippets,
    });
  } catch (error) {}
}
