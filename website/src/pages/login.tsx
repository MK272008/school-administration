import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { PrimaryButton } from "@/components/buttons";
import { Checkbox } from "@/components/inputs";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import Link from "next/dist/client/link";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export function FormInput(props: InputProps) {
  return (
    <div className="flex flex-col gap-y-1 text-slate-300">
      {/* <label className="px-1 font-heading">{props.placeholder}</label> */}
      <input
        {...props}
        className="rounded-lg bg-gray-700 px-2.5 py-3 outline-none transition-all placeholder:font-semibold placeholder:text-slate-400 focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}

export default function Signin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);

  const userQuery = api.user.getByEmail.useQuery({ email });
  const mutation = api.auth.login.useMutation();

  useEffect(() => {
    userQuery.refetch();
  }, [email]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(
      new FormData(e.target as HTMLFormElement).entries()
    ) as { email: string; password: string };

    let res = await mutation.mutateAsync(data);
    console.log(res);
    localStorage.setItem("token", res?.token ?? "");
    await router.push("/");
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-gray-700 to-dark-secondary">
      <div className="border-dark-border rounded-md bg-black bg-opacity-20 p-4 md:w-1/3">
        <div className="py-10">
        <h1 className=" text-center text-5xl font-light py-3">LOG IN</h1>
        <p className="text-center text-slate-300">Log in to your account. Manage everything easily</p>
        </div>
        <form
          onSubmit={(e) => void submit(e)}
          className="flex flex-col space-y-2"
        >
          <FormInput
            placeholder="Email"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput placeholder="Password" name="password" type="password" />
          <br />
          <div className="flex justify-between">
            <div className="flex space-x-3">
              <Checkbox checked={checked} setChecked={setChecked} />
              <span className="font-medium text-slate-400">Remember me</span>
            </div>
            <div>
              <Link href="/forgot" className="text-slate-400 font-medium italic">Forgot Password?</Link>
            </div>
          </div>
          <br />
          <button
            className={`bg-dark-black border-dark-border text-dark-bg h-max rounded-xl border-4 bg-dark-secondary px-10 py-3 text-white transition-all hover:bg-[rgb(80,88,255)] disabled:opacity-50 `}
          >
            LOG IN
          </button>
        </form>
        <hr className="border-slate-400 rounded-full my-5 w-[90%] mx-auto"/>
        <button
            className={`bg-dark-black border-dark-border text-dark-bg h-max rounded-xl border-4 bg-dark-secondary px-10 py-3   text-white transition-all hover:bg-[rgb(80,88,255)] disabled:opacity-50 w-full `}
          >
            CREATE AN ACCOUNT?
          </button> 
      </div>
    </div>
  );
}
