import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const client = supabase(); // call it at runtime
  const { data, error } = await client.from("videos").select("*");

  if (error) {
    console.error(error);
    return NextResponse.json([], { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const client = supabase(); // call it at runtime
  const newVideo = await req.json();

  const { error } = await client.from("videos").insert([newVideo]);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save video" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}