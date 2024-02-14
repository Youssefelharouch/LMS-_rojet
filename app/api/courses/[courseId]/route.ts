import { db } from "@/prisma/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

type paramsType = {
  params: { courseId: string };
};

export async function PATCH(req: Request, { params }: paramsType) {
  try {
    const { userId } = auth();
    const { courseId } = params;
    const values = await req.json();
    if (!userId) return new NextResponse("Unautorized", { status: 401 });
    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: { ...values },
    });
    return new NextResponse(JSON.stringify(course), { status: 200 });
  } catch (error) {
    console.log(`[courseId]`, error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
