import { PrimaryButton } from "@/components/buttons";
import { Invitation } from "@/interfaces/firebase";
import TeacherLayout from "@/layouts/Dashboards/Teacher";
import { db } from "@/lib/firebase";
import { useUser } from "@/lib/hooks/auth";
import { api } from "@/utils/api";
import {
  collection,
  CollectionReference,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function TeacherNotifications() {
  const user = useUser();
  const [invitations, setInvitations] = useState<
    QueryDocumentSnapshot<Invitation>[]
  >([]);

  useEffect(() => {
    if (!user) return;
    const colRef = collection(
      db,
      "invitations"
    ) as CollectionReference<Invitation>;

    const q = query(colRef, where("to", "==", user?.email));

    getDocs<Invitation>(q).then((docs) => setInvitations(docs.docs));
  }, [user]);

  return (
    <TeacherLayout>
      <div className="grid grid-cols-5 w-full p-10">
        {invitations.map((invite) => (
          <Invitation invite={invite} />
        ))}
      </div>
    </TeacherLayout>
  );
}

function Invitation({ invite }: {invite: QueryDocumentSnapshot<Invitation>}) {

    const teacherProfile = api.teacher.getProfile.useQuery()

    const joinMutation = api.teacher.joinSchool.useMutation();

    const inviterQuery = api.user.getByEmail.useQuery({email: invite.data().from});

    const ctx = api.useContext()

    async function submit(e: React.FormEvent<HTMLButtonElement>) {
        e.preventDefault();
        await joinMutation.mutateAsync({ schoolID: invite.data().schoolID });
        ctx.teacher.getProfile.invalidate()
    }

  return <div className="grid h-[400px] grid-rows-[40%_30%_15%_15%] bg-dark-secondary relative p-2 rounded-md border-dark-border">
    <span className="p-1 px-2 rounded-full absolute bg-primary font-bold">INVITATION</span>
    <h1 className='m-auto text-center text-2xl'>{invite.data().title}</h1>
    <p className="text-center">{invite.data().body}</p>
        <p className='text-center font-semibold my-auto'>Invite from {inviterQuery.data?.user?.name}</p>
        <PrimaryButton className="w-max mx-auto my-auto" onClick={e => submit(e)} disabled={teacherProfile.data?.teacherProfile?.school?.id == invite.data().schoolID ? true : false}>
            {teacherProfile.data?.teacherProfile?.school?.id == invite.data().schoolID ? "JOINED" : "JOIN SCHOOL"}
        </PrimaryButton>
  </div>;
}
