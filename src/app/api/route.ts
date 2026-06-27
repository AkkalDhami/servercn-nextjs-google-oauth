import { usersTable } from "@/db";
import db from "@/db/connection";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const user: typeof usersTable.$inferInsert = {
      name: "John",
      age: 30,
      email: "john@example.com"
    };
    await db.insert(usersTable).values(user);

    const users = await db.select().from(usersTable);
    console.log({ users });

    return NextResponse.json(
      {
        success: true,
        data: users
      },
      { status: 500 }
    );
  } catch (error) {
    console.error("Delete error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error"
      },
      { status: 500 }
    );
  }
};
