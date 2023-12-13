"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { z } from "zod";

// For our form validator later
export type State = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
};

const CreateBoard = z.object({
  title: z.string().min(3, {
    message: "Minimum length of 3 letters is required",
  }),
});

// New to nextjs 14, may not always be the best thing for security reasons
export async function create(prevState: State, formData: FormData) {
  // How we ensure type safety with zod (parse breaks app, safeparse doesn't)
  const validatedFields = CreateBoard.safeParse({
    title: formData.get("title"),
  });
  // const title = formData.get("title") as string;

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields.",
    };
  }

  const { title } = validatedFields.data;

  try {
    await db.board.create({
      data: {
        title,
      },
    });
  } catch (e) {
    return {
      message: "Database error",
    };
  }

  revalidatePath("/organization/org_2ZTNhQcZhzHtitfjadUIHEpOg8B");
  redirect("/organization/org_2ZTNhQcZhzHtitfjadUIHEpOg8B");
}
