import { NextRequest, NextResponse } from "next/server";
import { registry } from "./_controller";

export async function POST(request: NextRequest) {
  try {
    const method: any = await request.nextUrl.searchParams.get("method");
    try {
      switch (method) {
        case "registry":
          const data = registry(await request.json());
          return NextResponse.json(
            { success: true, message: "Message sent successfully" },
            { status: 201 }
          );
        default:
          throw Error("500");
      }
    } catch (e) {
      return NextResponse.json({
        error: true,
        message: "500 Something went wrong",
      });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Failed to send message" },
      { status: 400 }
    );
  }
}
