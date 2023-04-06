import React from "react";
import { FormInput } from "../login";
import { Select, Option as DefaultOption } from "@/components/inputs";
import { PrimaryButton } from "@/components/buttons";
import { useRouter } from "next/router";
import { api } from "@/utils/api";

const Option = (
  props: React.DetailedHTMLProps<
    React.OptionHTMLAttributes<HTMLOptionElement>,
    HTMLOptionElement
  >
) => {
  return (
    <DefaultOption {...props}>
      {props.value?.toString().toUpperCase()}
    </DefaultOption>
  );
};

export default function TeacherCreateProfile() {
  const router = useRouter();
  const subjectMutation = api.teacher.setSubject.useMutation();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(
      new FormData(e.target as HTMLFormElement).entries()
    ) as unknown as { subject: string };

    await subjectMutation.mutateAsync(data);

    await router.push("/teacher");
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="border-dark-border w-1/3 rounded-md border bg-dark-secondary p-4">
        <h1 className="py-10 text-center text-3xl">Choose your subject:</h1>
        <form onSubmit={submit} className="flex flex-col">
          <Select defaultValue="english" placeholder="Subject" name="subject">
            <Option value="physics"></Option>
            <Option value="chemistry"></Option>
            <Option value="biology"></Option>
            <Option value="english"></Option>
            <Option value="mathematics"></Option>
            <Option value="hindi"></Option>
            <Option value="geography"></Option>
            <Option value="history"></Option>
            <Option value="computers"></Option>
          </Select>
          <PrimaryButton type="submit" className="mt-2">
            CONTINUE
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
}
