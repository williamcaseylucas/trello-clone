interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import ListContainer from "./_components/list-container";

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const lists = await db.list.findMany({
    // Grab list items where boardId matches params.id and where the Board has the same orgId
    where: {
      boardId: params.boardId,
      board: {
        orgId,
      },
    },
    // Add the cards relation items as well and order by since it is a list
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  console.log(lists);

  return (
    <div className="p-4 h-full overflox-x-auto">
      <ListContainer boardId={params.boardId} data={lists} />
    </div>
  );
};

export default BoardIdPage;
