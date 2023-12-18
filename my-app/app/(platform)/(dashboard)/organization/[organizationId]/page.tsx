// import { create } from "@/actions/create-board";
// import { Board } from "./board-old";
// import { db } from "@/lib/db";

import { Separator } from "@/components/ui/separator";
import Info from "./_components/info";
import BoardList from "./_components/board-list";
import { Suspense } from "react";

const OrganizationIdPage = async () => {
  // const boards = await db.board.findMany();

  return (
    <div className="w-full mb-20">
      <Info />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  );

  // old
  // return (
  //   <div className="flex flex-col space-y-4">
  //     <div className="space-y-2">
  //       {boards.map((board) => (
  //         <Board key={board.id} title={board.title} id={board.id} />
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default OrganizationIdPage;
