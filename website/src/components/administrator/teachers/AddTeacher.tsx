import { PrimaryButton } from "@/components/buttons";
import Modal, { ModalHeading } from "@/components/dashboard-table/Modal";
import { FormInput } from "@/components/inputs";
import { api } from "@/utils/api";
import { db } from "@/lib/firebase";

import { AnimatePresence, motion } from "framer-motion";
import {
  addDoc,
  collection,
  CollectionReference,
  doc,
} from "firebase/firestore";
import { Invitation } from "@/interfaces/firebase";
import { useEffect, useState } from "react";

interface AddStudentModalProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddTeacherModal({
  opened,
  setOpened,
}: AddStudentModalProps) {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const user = api.auth.getUserByToken.useQuery().data?.user;

  const teacherProfile = api.teacher.getByEmail.useQuery({ email });

  const schoolQuery = api.school.getByOwner.useQuery();
  const school = schoolQuery.data?.school;

  useEffect(() => {
    console.log(teacherProfile);
    if (!teacherProfile.data?.teacherProfile && email !== "")
      setErrors((state) =>
        Array.from(new Set([...state, "The teacher does not exist!"]))
      );
    else setErrors([]);
  }, [email]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    setOpened(false);
  }

  function exit() {
    setOpened(false);
  }

  return (
    <Modal
      heading={<ModalHeading>Add Teacher</ModalHeading>}
      onSubmit={(e) => submit(e)}
      onClickOutside={() => exit()}
      opened={opened}
    >
      <FormInput
        name="email"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <AnimatePresence>
        {errors.map((error) => (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-semibold text-red-500"
          >
            {error}
          </motion.span>
        ))}
      </AnimatePresence>
      <PrimaryButton type="submit" disabled={teacherProfile.data?.teacherProfile ? false : true}>
        ADD
      </PrimaryButton>
    </Modal>
  );
}
