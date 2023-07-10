import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

interface TextInputProps<T extends FieldValues = FieldValues>
  extends UseControllerProps<T> {
  type: "text" | "email" | "tel" | "password" | "url" | "date";
  label?: string;
  placeholder?: string;
  required?: boolean;
}

const TextInput = <T extends FieldValues = FieldValues>({
  label,
  placeholder,
  ...props
}: TextInputProps<T>) => {
  const { field, fieldState } = useController(props);
  return (
    <div className="form-control w-full">
      {label && (
        <label className="label" htmlFor={props.name}>
          <span className="label-text">
            {label}
            {props.required && (
              <span className="font-bold text-primary">*</span>
            )}
          </span>
        </label>
      )}
      <input
        {...field}
        className="input-bordered input w-full"
        placeholder={placeholder}
        aria-invalid={!!fieldState.error?.message}
        aria-errormessage={`${props.name}-error`}
      />
      {fieldState.error && (
        <div id={`${props.name}-error`}>{fieldState.error?.message}</div>
      )}
    </div>
  );
};

export default TextInput;
