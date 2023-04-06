import { PrimaryButton } from "@/components/buttons";
import { FormInput } from "@/components/inputs";
import { api, RouterInputs } from "@/utils/api";
import { useRouter } from "next/router";
import React from "react";

export default function AddChild() {

    const router = useRouter();

    const profileMutation = api.parent.create.useMutation();
    const childMutation = api.parren.useMutation();

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = Object.fromEntries((new FormData(e.target as HTMLFormElement))) as unknown as RouterInputs["parent"]["addChild"]
        data.age = parseInt(data.age + "");
        await profileMutation.mutateAsync();
        await childMutation.mutateAsync(data);
        await router.push('/parent/');
    }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="border-dark-border p-4 md:w-1/3 w-full rounded-md">
        <h1 className="text-4xl text-center py-10">Enter your Childs information to Continue</h1>
        <form className="flex flex-col space-y-2" onSubmit={submit}>
          <FormInput name="name" placeholder="Name" type="text" />
          {/* <FormInput name="standard" placeholder="Standard" type="number" />
          <FormInput name="section" placeholder="Section" type="text" /> */}
          <FormInput name="age" placeholder="Age" type="number" />
          <PrimaryButton type="submit">CONTINUE</PrimaryButton>
        </form>
      </div>
    </div>
  );
}
