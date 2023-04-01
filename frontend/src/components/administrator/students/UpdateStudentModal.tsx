import { PrimaryButton } from "@/components/buttons";
import Modal, { ModalHeading } from "@/components/dashboard-table/Modal";
import { FormInput } from "@/components/inputs";
import { api, RouterInputs } from "@/utils/api";
import React from "react";
import { useRecoilState } from "recoil";
import { selectedStudentToUpdate } from "./store";

interface Props {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UpdateStudentModal({ opened, setOpened }: Props) {
  const [toUpdate, setToUpdate] = useRecoilState(selectedStudentToUpdate);

  const studentQuery = api.student.getById.useQuery({ id: toUpdate ?? "" });
  const student = studentQuery.data?.student;

  const mutation = api.student.update.useMutation();
  const context = api.useContext()

  async function update(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(
      new FormData(e.target as HTMLFormElement).entries()
    ) as unknown as RouterInputs["student"]["update"];
    data.age = parseInt(data.age + "")
    data.standard = parseInt(data.standard + "")
    await mutation.mutateAsync(data);
    setOpened(false);
    setToUpdate(undefined);
    studentQuery.refetch();
    context.student.invalidate()
  }

  function exit() {
    setOpened(false);
    setToUpdate(undefined);
  }

  return (
    <Modal
      heading={<ModalHeading>Update Student </ModalHeading>}
      opened={opened}
      onSubmit={(e) => update(e)}
      onClickOutside={() => exit()}
    >
      <input type="string" name="id" value={student?.id} className="hidden" />
      <FormInput
        name="name"
        placeholder="Name"
        type="text"
        defaultValue={student?.name}
      />
      <FormInput
        name="standard"
        placeholder="Standard"
        type="number"
        defaultValue={student?.class?.name.split('-')[0]}
      />
      <FormInput
        name="section"
        placeholder="Section"
        type="text"
        defaultValue={student?.class?.name.split('-')[0]}
      />
      <FormInput
        name="age"
        placeholder="Age"
        type="number"
        defaultValue={student?.age}
      />
      <FormInput
        name="parent"
        placeholder="Parents' Email"
        type="email"
        defaultValue={student?.parent?.parent.email}
      />

      <PrimaryButton type="submit">UPDATE</PrimaryButton>
    </Modal>
  );
}
