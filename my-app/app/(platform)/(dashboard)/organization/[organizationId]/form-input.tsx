interface FormInputProps {
  errors?: Record<string, any>;
}

const FormInput = ({ errors }: FormInputProps) => {
  return (
    <div>
      <input
        id="title"
        name="title"
        required
        placeholder="Enter a board title"
        className="border-black border p-1"
      />
      {errors?.errors?.title ? (
        <div>
          {errors?.errors?.title.map((error: string) => (
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
