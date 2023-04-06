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
  const invitationMutation = api.parentInvitation.create.useMutation();
  const studentCreateMutation = api.student.create.useMutation();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(
      new FormData(e.target as HTMLFormElement).entries()
    ) as unknown as {
      name: string;
      standard: number;
      section: string;
      age: number;
      parent: string;
    };

    data.standard = parseInt(data.standard + "");
    data.age = parseInt(data.age + "");

    const { student } = (await studentCreateMutation.mutateAsync(data)) ?? {
      student: null,
    };
    console.log(student)
    await invitationMutation.mutateAsync({
      parentEmail: data.parent,
      studentId: student?.id ?? "",
    });
    context.student.all.invalidate();
    setOpened(false);
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
