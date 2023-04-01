import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { PrimaryButton, SecondaryButton } from "./buttons";
import { useState } from "react";
import Image from "next/image";
import { useUser } from "@/lib/hooks/auth";
import { logOut } from "@/utils/auth";

export default function Header() {
  const user = useUser();

  return (
    <header className="border-dark-border sticky top-0 z-10 grid grid-cols-3 bg-dark-secondary py-4">
      <div className="flex items-center justify-center">
        <h1 className="text-2xl">EduTech</h1>
      </div>
      <nav className="mx-auto grid grid-cols-3">
        <Link
          href="/"
          className="m-auto text-xl transition-colors hover:text-primary"
        >
          Home
        </Link>
      </nav>
      {user ? (
        <PrimaryButton className="mx-auto w-max" onClick={() => logOut()}>
          SIGN OUT
        </PrimaryButton>
      ) : (
        <div className="relative z-10 flex items-center justify-end px-10">
          <Link href="/login">
            <SecondaryButton className="mx-10">LOG IN</SecondaryButton>
          </Link>
          <Link href="/signup">
            <PrimaryButton>SIGN UP</PrimaryButton>
          </Link>
        </div>
      )}
    </header>
  );
}

function SigninDropdown() {
  const variants = {
    hidden: {
      right: -300,
    },
    animate: {
      right: 10,
    },
  };

  return (
    <motion.div
      className="border-dark-border absolute top-20 z-0 grid w-60 grid-rows-3 rounded-md bg-dark-secondary p-2"
      variants={variants}
      initial="hidden"
      animate="animate"
      exit="hidden"
    >
      <SignInDropdownTile url="/signup/teacher" teacherImage="/teacher.png">
        TEACHER
      </SignInDropdownTile>
      <SignInDropdownTile url="/signup/parent" teacherImage="/family.png">
        PARENTS
      </SignInDropdownTile>
      <SignInDropdownTile
        url="/signup/administrator"
        teacherImage="/school-building.png"
      >
        ADMINISTRATORS
      </SignInDropdownTile>
    </motion.div>
  );
}

function SignInDropdownTile(props: {
  children?: string;
  teacherImage: string;
  url: `/${string}`;
}) {
  return (
    <Link href={props.url}>
      <div className="border-dark-border my-2 grid cursor-pointer grid-cols-[30%_70%] rounded-md p-2 transition-all hover:bg-dark-tertiary">
        <span className="w-max rounded-full bg-primary p-1">
          <Image
            src={props.teacherImage}
            alt="Teacher"
            className="mx-auto h-8"
          />
        </span>
        <span className="my-auto font-bold">{props.children}</span>
      </div>
    </Link>
  );
}
