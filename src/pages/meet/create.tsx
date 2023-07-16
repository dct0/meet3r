import { zodResolver } from "@hookform/resolvers/zod";
import type { GetServerSideProps } from "next";
import { useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import Button from "~/components/ui/Button";
import DatePicker from "~/components/ui/DatePicker";
import TextField from "~/components/ui/form/TextField";
import FieldLabel from "~/components/ui/form/components/FieldLabel";
import { useHeader } from "~/hooks/useHeader";
import type { CreateMeetFormValues } from "~/schemas/forms/CreateMeet";
import { CreateMeetSchema } from "~/schemas/forms/CreateMeet";
import type { PageProps } from "~/types";
import { api } from "~/utils/api";
import { requireAuth } from "~/utils/requireAuth";

const Page = ({ title }: PageProps) => {
  const [, setHeader] = useHeader();
  const createMeet = api.meet.create.useMutation();

  useEffect(() => {
    setHeader(title);
  }, [title, setHeader]);

  const { control, handleSubmit } = useForm<CreateMeetFormValues>({
    resolver: zodResolver(CreateMeetSchema),
    defaultValues: {
      name: "",
      location: "",
      description: "",
      dates: [],
    },
  });

  const onSubmit: SubmitHandler<CreateMeetFormValues> = (data) => {
    createMeet.mutate(data);
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
          name="location"
          control={control}
          type="text"
          label="Location"
          placeholder="Enter location"
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await requireAuth(context, (session) => ({
    props: { session, title: "Create meet" },
  }));
};

export default Page;
