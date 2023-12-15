// import { create } from "@/actions/create-board";
// import { Board } from "./board-old";
// import { db } from "@/lib/db";

import Info from "./_components/info";

const OrganizationIdPage = async () => {
  // const boards = await db.board.findMany();

  return (
    <div className="w-full mb-20">
      <Info />
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
