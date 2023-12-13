"use client";
import { State } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { create } from "@/actions/create-board";
import { useFormState } from "react-dom";

const Form = () => {
  const initialState = { message: null, errors: { title: undefined } };

  const [state, dispatch] = useFormState(create, initialState as any);

  return (
    <form action={dispatch}>
      <div className="flex flex-col space-y-2"></div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Form;
