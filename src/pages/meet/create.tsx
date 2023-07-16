import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import Button from "~/components/ui/Button";
import DatePicker from "~/components/ui/DatePicker";
import TextField from "~/components/ui/form/TextField";
import FieldLabel from "~/components/ui/form/components/FieldLabel";
import { useHeader } from "~/hooks/useHeader";
import type { FormValues } from "~/schema/forms/createMeet";
import { formSchema } from "~/schema/forms/createMeet";
import type { PageProps } from "~/types";

export const Page = ({ title }: PageProps) => {
  const [, setHeader] = useHeader();

  useEffect(() => {
    setHeader(title);
  }, [title, setHeader]);

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      dates: [],
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await Promise.resolve();
    console.log(data);
  };

  return (
    <main className="container mx-auto p-2">
      <form
        className="flex flex-col items-center gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          name="name"
          control={control}
          type="text"
          label="Name"
          placeholder="Enter meeting name"
          required
        />

        <TextField
          name="description"
          control={control}
          type="text"
          label="Description"
          placeholder="Enter description"
        />
        <div className="w-full">
          <FieldLabel htmlFor="dates" required>
            Dates
          </FieldLabel>
          <DatePicker className="w-full" name="dates" control={control} />
        </div>
        <Button className="btn-primary mt-2 w-full" type="submit">
          Submit
        </Button>
      </form>
    </main>
  );
};

export function getStaticProps() {
  return {
    props: {
      title: "Create meet",
    },
  };
}

export default Page;
