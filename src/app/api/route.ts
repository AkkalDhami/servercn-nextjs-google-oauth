import { usersTable } from "@/db";
import db from "@/db/connection";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const user: typeof usersTable.$inferInsert = {
      name: "John",
      age: 30,
      email: "john123@example.com"
    };

    await db.insert(usersTable).values(user);
    console.log("New user created!");

    const users = await db.select().from(usersTable);
    console.log("Getting all users from the database: ", users);
    await db
      .update(usersTable)
      .set({
        age: 31
      })
      .where(eq(usersTable.email, user.email));
    console.log("User info updated!");

    await db.delete(usersTable).where(eq(usersTable.email, user.email));
    console.log("User deleted!");

    return NextResponse.json(
      {
        success: true,
        data: users
      },
      { status: 200 }
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
