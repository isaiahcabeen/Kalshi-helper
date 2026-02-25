import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("videos")
    .select("*");

  if (error) return NextResponse.json([], { status: 500 });

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const newVideo = await req.json();

  const { error } = await supabase
    .from("videos")
    .insert([newVideo]);

  if (error)
    return NextResponse.json(
      { error: "Failed to save video" },
      { status: 500 }
    );

  return NextResponse.json({ success: true });
}