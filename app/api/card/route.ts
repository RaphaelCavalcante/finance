import { NextRequest, NextResponse } from "next/server";
import { saveOrUpdate, findAll, deleteItem } from "./_controller";

export async function POST(request: NextRequest) {
  const method = request.nextUrl.searchParams.get("method");
  switch (method) {
    case "registry":
      return NextResponse.json(saveOrUpdate(await request.json()), {
        status: 201,
      });
  }
  return null;
}
export async function GET(request: NextRequest) {
  const method = request.nextUrl.searchParams.get("method");
  switch (method) {
    case "listAll":
      return NextResponse.json(await findAll(), { status: 200 });
  }
}
export async function DELETE(request: NextRequest) {
  return NextResponse.json(deleteItem(await request.json()), { status: 200 });
}
