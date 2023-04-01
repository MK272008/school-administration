import { PrimaryButton } from "@/components/buttons";
import Modal, { ModalHeading } from "@/components/dashboard-table/Modal";
import { FormInput } from "@/components/inputs";
import { api, RouterInputs } from "@/utils/api";

interface AddStudentModalProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddStudentModal({
  opened,
  setOpened,
}: AddStudentModalProps) {
  // const mutation = api.student.create.useMutation();

  const context = api.useContext();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
  //   const data = Object.fromEntries(
  //     new FormData(e.target as HTMLFormElement).entries()
  //   ) as unknown as RouterInputs["student"]["create"];

  //   data.age = parseInt((data.age + ""));
  //   data.standard = parseInt((data.standard + ""));

  //   e.preventDefault();
  //   await mutation.mutateAsync(data);
  //   setOpened(false);
  //   await context.student.all.invalidate();
  }

  function exit() {
    setOpened(false);
  }

  return (
    <Modal
      heading={<ModalHeading>Add Student</ModalHeading>}
      onSubmit={(e) => submit(e)}
      onClickOutside={() => exit()}
      opened={opened}
    >
      <FormInput name="name" placeholder="Name" type="text" />
      <FormInput name="standard" placeholder="Standard" type="number" />
      <FormInput name="section" placeholder="Section" type="text" />
      <FormInput name="age" placeholder="Age" type="number" />
      <FormInput name="parent" placeholder="Parents' Email" type="email" />

      <PrimaryButton type="submit">ADD</PrimaryButton>
    </Modal>
  );
}
