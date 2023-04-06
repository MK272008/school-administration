import { PrimaryButton } from "@/components/buttons";
import TeacherLayout from "@/layouts/Dashboards/Teacher";
import { useUser } from "@/lib/hooks/auth";
import { RouterOutputs, api } from "@/utils/api";

export default function TeacherNotifications() {
  const user = useUser();
  const invitationsQuery = api.teacherInvitation.all.useQuery();

  const invitations = invitationsQuery.data

  return (
    <TeacherLayout>
      <div className="grid grid-cols-5 w-full p-10">
        {invitations?.map((invite) => (
          <Invitation invite={invite} />
        ))}
      </div>
    </TeacherLayout>
  );
}

function Invitation({ invite }: {invite: RouterOutputs['teacherInvitation']['all'][number]}) {

    const teacherProfile = api.teacher.getProfile.useQuery()

    const joinMutation = api.teacher.joinSchool.useMutation();

    const inviterQuery = api.administrator.getById.useQuery({ id: invite.senderId });
    const schoolQuery = api.teacherInvitation.getSchool.useQuery({ id: invite.id });

    const ctx = api.useContext()

    async function submit(e: React.FormEvent<HTMLButtonElement>) {
        e.preventDefault();
        await joinMutation.mutateAsync({ schoolID: schoolQuery.data?.administrator?.school.id ?? "" });
        await ctx.teacher.getProfile.invalidate()
    }

  return <div className="grid h-[400px] grid-rows-[40%_30%_15%_15%] bg-dark-secondary relative p-2 rounded-md border-dark-border">
    <span className="p-1 px-2 rounded-full absolute bg-primary font-bold">INVITATION</span>
    <h1 className='m-auto text-center text-2xl'>{invite.title}</h1>
        <p className='text-center font-semibold my-auto'>Invite from {inviterQuery.data?.administrator?.name}</p>
        <PrimaryButton className="w-max mx-auto my-auto" onClick={e => submit(e)} disabled={teacherProfile.data?.teacherProfile?.school?.id == schoolQuery.data?.administrator?.school.id ? true : false}>
            {teacherProfile.data?.teacherProfile?.school?.id == schoolQuery.data?.administrator?.school.id ? "JOINED" : "JOIN SCHOOL"}
        </PrimaryButton>
  </div>;
}
