"use client";
interface FormInputProps {
  // errors?: Record<string, any>;
  errors?: {
    title?: string[];
  };
}

import { Input } from "@/components/ui/input";
import { useFormStatus } from "react-dom";

const FormInput = ({ errors }: FormInputProps) => {
  // This works because we are inside of a form component for the parent which is attached to the dispatch method
  const { pending } = useFormStatus();
  return (
    <div>
      <Input
        id="title"
        name="title"
        required
        placeholder="Enter a board title"
        disabled={pending}
      />
      {errors?.title ? (
        <div>
          {errors?.title.map((error: string) => (
            <p key={error} className="text-rose-500">
              {error}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default FormInput;
