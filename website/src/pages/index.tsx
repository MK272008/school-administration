import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { useRouter } from "next/router";

import { useEffect } from "react";

import Header from "@/components/Header";
import { PrimaryButton } from "@/components/buttons";
import { useUser } from "@/lib/hooks/auth";
import { api } from "@/utils/api";

const Home: NextPage = () => {
  const router = useRouter();

  const administratorProfileQuery = api.administrator.getByUser.useQuery();
  const schoolQuery = api.school.getByOwner.useQuery();

  const [text] = useTypewriter({
    words: ["Administrators", "Teachers", "Parents"],
    loop: Infinity,
  });
  const user = useUser();

  useEffect(() => {
    console.log(user);
  }, []);

  async function sendToDashboard() {
    if (user?.role == "administrator") await router.push("/administrator");
    else if (user?.role == "teacher") await router.push("/teacher");
    else if (user?.role == "parent") await router.push("/parent");
  }

  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="overflow-x-hidden">
        <Header />
        {/* Banner */}
        <section className="relative flex h-[70vh] items-center justify-center">
          <div className="m-auto flex flex-col items-center justify-center space-y-10">
            <div className="my-10 flex flex-col space-y-6 text-center">
              <h1
                className="mt-auto bg-gradient-to-r from-sky-400 to-primary bg-clip-text text-center font-heading text-5xl font-bold uppercase text-white"
                style={{
                  WebkitTextFillColor: "transparent",
                }}
              >
                We provide tech infrastructure for
              </h1>
              <p className="font-heading text-3xl">
                {text} <Cursor cursorStyle="_" />
              </p>
              <p className="mx-auto w-1/2 text-xl text-gray-400">
                Connect schools, teachers and parents together to get the most
                out of education and schooling in this modern age fof technology
              </p>
            </div>

            {user && (
              <div className="flex w-1/2 justify-around">
                <PrimaryButton onClick={() => void sendToDashboard()}>
                  Go to Dashboard, {user.name}
                </PrimaryButton>
              </div>
            )}
          </div>

          <div className="absolute -left-14 bottom-0">
            <Image
              src="/smartphone-hand.png"
              alt="Smartphone Hand"
              height={300}
              width={300}
            />
          </div>
        </section>
        <hr className="mx-auto w-[80%] border-2" />
      </div>
    </>
  );
};

export default Home;
