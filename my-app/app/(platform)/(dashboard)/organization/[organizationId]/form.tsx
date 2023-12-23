// old

"use client";
// import { State } from "@/actions/create-board";
// import { create } from "@/actions/create-board";
// import { useFormState } from "react-dom";
// import FormButton from "./form-button";
import { createBoard } from "@/actions/create-board";
import FormInput from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { useAction } from "@/hooks/use-action";

const Form = () => {
  // What we used when we only had a create-board function
  // const initialState = { message: null, errors: { title: undefined } };
  // const [state, dispatch] = useFormState(create, initialState as any);

  // Very similar to useMutation that ReactQuery gives you
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, "Success!");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    // execute({ title });
  };

  return (
    // <form action={dispatch}>
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        {/* By writing it in this way, our create next.js server function is ensuring we have type safety through the 'create' method */}
        {/* <FormInput errors={state?.errors} /> */}
        {/* <FormInput errors={fieldErrors} /> */}
        <FormInput id="title" errors={fieldErrors} label="Board Title" />
      </div>
      {/* <FormButton /> */}
      <FormSubmit>Save</FormSubmit>
    </form>
  );
};

export default Form;
