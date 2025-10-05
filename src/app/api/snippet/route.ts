import mongoClient from '@/lib/mongoDB';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SnippetPostPayload;

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
    const user_id = searchParams.get('user_id');
    const snippet_id = searchParams.get('snippet_id');

    // Connect
    await mongoClient.connect();

    // Get collection
    const db = mongoClient.db('code_snippet_db');
    const collection = db.collection('snippets');

    // Count total documents
    const total = await collection.countDocuments({});
    const total_pages = Math.ceil(total / page_size);

    // Build query
    const query: any = {};
    if (user_id) {
      query.user_id = user_id;
    }

    // Fetch one detail
    if (snippet_id) {
      const product = await collection.findOne({
        _id: new ObjectId(snippet_id),
      });
      return NextResponse.json(product);
    }

    // Fetch list
    const snippets = await collection
      .find(query)
      .sort({ timestamp: 1 })
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

export async function PUT(req: Request) {
  const body = (await req.json()) as SnippetPutPayload;
  const { _id, ...restBody } = body;

  try {
    // Connect
    await mongoClient.connect();

    // Get collection
    const db = mongoClient.db('code_snippet_db');
    const collection = db.collection('snippets');

    // Save
    await collection.updateOne({ _id: new ObjectId(_id) }, { $set: restBody });

    return NextResponse.json({
      id: _id,
    });
  } catch (error) {}
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const snippet_id = searchParams.get('snippet_id');

  try {
    // Connect
    await mongoClient.connect();

    // Get collection
    const db = mongoClient.db('code_snippet_db');
    const collection = db.collection('snippets');

    // Save
    if (snippet_id) {
      await collection.deleteOne({ _id: new ObjectId(snippet_id) });
      return NextResponse.json({
        id: snippet_id,
      });
    }
  } catch (error) {}
}
