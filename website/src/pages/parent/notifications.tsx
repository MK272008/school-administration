import { PrimaryButton } from '@/components/buttons';
import ParentLayout from '@/layouts/Dashboards/Parent'
import { api } from '@/utils/api';
import { ParentInvitation } from '@prisma/client';

export default function ParentNotifications() {

  const invitationsQuery = api.parentInvitation.all.useQuery();

  return (
    <ParentLayout>
        <div className='grid grid-cols-5 p-10'>
        {invitationsQuery.data?.map(inv => <Invitation invitation={inv}/>)}
        </div>
    </ParentLayout>
  )
}


function Invitation({invitation}: {invitation: ParentInvitation}) {

  const joinMutation = api.parentInvitation.accept.useMutation();
  const schoolQuery = api.parent.getStudentSchool.useQuery();
  const student = schoolQuery.data?.student;
  const schoolFromInvQuery = api.parentInvitation.getSchoolFromInvitation.useQuery({ invitationID: invitation.id })
  const context = api.useContext();

  async function submit() {
    await joinMutation.mutateAsync({ invitationID: invitation.id });
    await context.parent.getStudentSchool.invalidate();
  }

  return (
    <div className='relative p-2 h-72 w-full bg-dark-secondary hover:bg-dark-tertiary transition-all cursor-pointer border-dark-border rounded-md grid grid-rows-2'>
      <span className="absolute px-2 py-1 bg-primary rounded-full m-2">INVITATION</span>
      <h1 className='text-center mt-auto text-xl'>{invitation.title}</h1>
      <PrimaryButton onClick={() => void submit()} className='mt-auto' disabled={student?.schoolId == schoolFromInvQuery.data?.school?.sender.school.id}>
        {student?.schoolId == schoolFromInvQuery.data?.school?.sender.school.id ? "JOINED" : "JOIN SCHOOL"}
      </PrimaryButton>
    </div>
  );
}