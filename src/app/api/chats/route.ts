import { prisma } from "@/app/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
  const messages = await prisma.chat.findMany({orderBy: {created_at: "desc"}})
  return NextResponse.json(messages)
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  if (!body.message) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 })
  }

  const messageCreated = await prisma.chat.create({
    data: {
      message: body.message
    }
  })
  return NextResponse.json(messageCreated)
}
