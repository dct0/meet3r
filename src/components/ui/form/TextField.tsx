import { useController } from "react-hook-form";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import FieldLabel from "./components/FieldLabel";

interface TextInputProps<T extends FieldValues> extends UseControllerProps<T> {
  type: "text" | "email" | "tel" | "password" | "url" | "date";
  label?: string;
  placeholder?: string;
  required?: boolean;
}

const TextInput = <T extends FieldValues>({
  label,
  placeholder,
  ...props
}: TextInputProps<T>) => {
  const { field, fieldState } = useController(props);

  return (
    <article className="form-control w-full">
      {label && (
        <FieldLabel htmlFor={props.name} required={props.required}>
          {label}
        </FieldLabel>
      )}
      <input
        {...field}
        className="input-bordered input w-full shadow"
        id={props.name}
        placeholder={placeholder}
        aria-invalid={!!fieldState.error?.message}
        aria-errormessage={`${props.name}-error`}
      />
      {fieldState.error && (
        <span id={`${props.name}-error`} role="alert">
          {fieldState.error?.message}
        </span>
      )}
    </article>
  );
};

export default TextInput;
