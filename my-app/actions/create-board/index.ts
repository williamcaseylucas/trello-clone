"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";

// Whenever this is called, InputType has been bounded to use-action validation
const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, image } = data;

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split("|");

  console.log({
    imageId,
    imageThumbUrl,
    imageFullUrl,
    imageLinkHTML,
    imageUserName,
  });

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHTML ||
    !imageUserName
  )
    return { error: "Missing fields. Failed to create board" };

  let board;

  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML,
      },
    });
  } catch (e) {
    return {
      error: "Failed to create",
    };
  }

  revalidatePath(`/board/${board.id}`);

  return { data: board };
};

// Pass in Schema and then async handler
export const createBoard = createSafeAction(CreateBoard, handler);

// Now have to create hooks to give onSuccess, onComplete for createBoard

// create-board.ts version
// import { db } from "@/lib/db";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

// import { z } from "zod";

// // For our form validator later
// export type State = {
//   errors?: {
//     title?: string[];
//   };
//   message?: string | null;
// };

// const CreateBoard = z.object({
//   title: z.string().min(3, {
//     message: "Minimum length of 3 letters is required",
//   }),
// });

// // New to nextjs 14, may not always be the best thing for security reasons
// export async function create(prevState: State, formData: FormData) {
//   // How we ensure type safety with zod (parse breaks app, safeparse doesn't)
//   const validatedFields = CreateBoard.safeParse({
//     title: formData.get("title"),
//   });
//   // const title = formData.get("title") as string;

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: "Missing Fields.",
//     };
//   }

//   const { title } = validatedFields.data;

//   try {
//     await db.board.create({
//       data: {
//         title,
//       },
//     });
//   } catch (e) {
//     return {
//       message: "Database error",
//     };
//   }

//   revalidatePath("/organization/org_2ZTNhQcZhzHtitfjadUIHEpOg8B");
//   redirect("/organization/org_2ZTNhQcZhzHtitfjadUIHEpOg8B");
// }
