import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";
import FormDelete from "./form-delete-old";

interface BoardProps {
  title: string;
  id: string;
}

export const Board = ({ title, id }: BoardProps) => {
  // binds our server action to this component so when the submit occurs we delete from the server
  const deleteBoardWithId = deleteBoard.bind(null, { id });
  return (
    <form action={deleteBoardWithId} className="flex items-center gap-x-2">
      <p>Board title: {title}</p>
      <FormDelete />
    </form>
  );
};
