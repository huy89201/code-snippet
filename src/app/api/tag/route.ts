import mongoClient from '@/lib/mongoDB';
import { Tag } from '@/types/tag';
import { NextResponse } from 'next/server';

export interface GetTagRes {
  data: Tag[];
}

export async function GET() {
  try {
    // Connect
    await mongoClient.connect();

    // Get collection
    const db = mongoClient.db('code_snippet_db');
    const collection = db.collection('tags');

    // Fetch all documents
    const tags = await collection.find({}).toArray();

    return NextResponse.json({ data: tags });
  } catch (error) {
    console.log(error);
  }
}
