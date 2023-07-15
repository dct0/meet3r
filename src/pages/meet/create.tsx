import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import Button from "~/components/ui/Button";
import DatePicker from "~/components/ui/DatePicker";
import TextField from "~/components/ui/form/TextField";
import { HeaderContext } from "~/contexts/HeaderContext";
import { formSchema } from "~/schema/forms/createMeet";
import type { FormValues } from "~/schema/forms/createMeet";
import type { PageProps } from "~/types";

export const Page = ({ title }: PageProps) => {
  const [, setHeader] = useContext(HeaderContext);

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
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
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
        <DatePicker name="dates" control={control} />
        <Button className="btn-primary mt-2" type="submit">
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
