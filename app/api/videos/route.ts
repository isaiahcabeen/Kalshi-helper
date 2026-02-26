import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const client = supabase(); // call the function to get the client
  const { data, error } = await client
    .from("videos")
    .select("*");

  if (error) return NextResponse.json([], { status: 500 });

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const newVideo = await req.json();
  const client = supabase(); // call the function to get the client

  const { error } = await client
    .from("videos")
    .insert([newVideo]);

  if (error)
    return NextResponse.json(
      { error: "Failed to save video" },
      { status: 500 }
    );

  return NextResponse.json({ success: true });
}