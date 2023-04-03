import { PrimaryButton } from "@/components/buttons";
import { FormInput } from "@/components/inputs";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { useState } from "react";

export default function CreateSchool() {
  const [name, setName] = useState("");
  const router = useRouter();
  const mutation = api.school.create.useMutation();
  const adminMutation = api.administrator.create.useMutation();
  const connectMutation = api.school.connectAdministrator.useMutation();

  async function submit(e: React.MouseEvent) {
    let { school } = await mutation.mutateAsync({ name: name });
    let { administratorProfile } = await adminMutation.mutateAsync({
      schoolID: school.id,
    });
    await connectMutation.mutateAsync({ schoolID: school.id });
    await router.push('/administrator');
  }

  return (
    // <AdministratorLayout>
    <div className="relative flex h-screen items-center justify-center">
      <div className="border-dark-border mx-auto flex w-[90%] flex-col space-y-4 bg-dark-secondary p-4 md:w-1/3">
        <h1 className="text-center text-4xl">Create Your School</h1>
        <FormInput
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <PrimaryButton onClick={(e) => submit(e)}>CONTINUE</PrimaryButton>
      </div>
    </div>
    // </AdministratorLayout>
  );
}
