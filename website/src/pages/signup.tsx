import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { motion } from "framer-motion";

import { PrimaryButton } from "@/components/buttons";
import { FormInput, Option, Select } from "@/components/inputs";
import { storage } from "@/lib/firebase";
import { api, type RouterInputs } from "@/utils/api";
import { useUser } from "@/lib/hooks/auth";

export default function Signin() {
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileURL, setFileURL] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);

  const mutation = api.auth.signup.useMutation();
  const userQuery = api.user.getByEmail.useQuery({ email });
  const context = api.useContext();

  useEffect(() => {
    userQuery.refetch();

    if (userQuery.data?.user) {
      setEmailError("A user with the email already exists!");
    } else {
      setEmailError(null);
    }
  }, [email, userQuery]);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file as Blob);
    setFileURL(url);
  }, [file]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    type LOL = RouterInputs["auth"]["signup"];
    const data = Object.fromEntries(
      new FormData(e.target as HTMLFormElement).entries()
    ) as unknown as LOL;

    const bucket = ref(storage, `/users/profile-pics/${data.email}`);

    await uploadBytes(bucket, file as Blob);
    const downloadURL = await getDownloadURL(bucket);

    data.image = downloadURL;
    let res = await mutation.mutateAsync(data);
    localStorage.setItem("token", res.token);

    await context.user.invalidate();

    if (data.role == "administrator")
      router.push("/administrator/create-school");
    else if (data.role == "parent") await router.push(`/parent/add-child`);
    else if (data.role == "teacher") await router.push("/teacher/create-profile");
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="border-dark-border m-auto grid w-full grid-cols-2 grid-rows-[max-content_max-content] rounded-md bg-dark-secondary p-4 md:w-[70vw]">
        <div className="row-span-2 flex items-center justify-center">
          <div
            className="flex h-60 w-60 cursor-pointer rounded-full bg-dark-tertiary"
            onClick={() => fileInputRef.current?.click()}
          >
            {fileURL ? (
              <img
                className="h-full w-full rounded-full"
                src={fileURL}
                alt="Profile Pic"
              />
            ) : (
              <CgProfile className="m-auto h-1/2 w-1/2" />
            )}
          </div>

          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={(e) =>
              e.target?.files && setFile(e?.target?.files[0] as File)
            }
          />
        </div>
        <h1 className="mx-auto py-10 font-heading text-6xl">SIGNUP</h1>
        <form
          className="mx-auto flex w-full flex-col gap-y-2"
          onSubmit={(e) => void submit(e)}
        >
          <FormInput placeholder="Name" type="text" name="name" />
          <FormInput placeholder="Username" type="text" name="username" />
          <div>
            <FormInput
              placeholder="Email"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className={`${emailError && "border-red-500"}`}
            />
            {emailError && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="m-2 font-medium text-red-500"
              >
                {emailError}
              </motion.span>
            )}
          </div>
          <FormInput placeholder="Password" type="Password" name="password" />
          <Select
            name="role"
            placeholder="Role"
            defaultValue="administrator"
            defaultChecked={true}
          >
            <Option value="administrator">Administrator</Option>
            <Option value="teacher">Teacher</Option>
            <Option value="parent">Parent</Option>
          </Select>
          <PrimaryButton
            className="mt-5"
            type="submit"
            disabled={emailError ? true : false}
          >
            CONTINUE
          </PrimaryButton>
          {/* <div className="flex space-x-5"> */}
          {/* </div> */}
        </form>
      </div>
    </div>
  );
}
