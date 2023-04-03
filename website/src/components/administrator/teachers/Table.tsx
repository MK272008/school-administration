import { HiOutlinePencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { selectedTeachersState } from "./store";
import DashboardTableRow, {
  DashboardTableColumn,
} from "@/components/dashboard-table/Table";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/inputs";
import { api, RouterOutputs } from "@/utils/api";
import { useRecoilState } from "recoil";

function TableHeader() {
  return (
    <DashboardTableRow className="grid-cols-[5%_5%_30%_30%_30%]">
      <span></span>
      <DashboardTableColumn className="">ID</DashboardTableColumn>
      <DashboardTableColumn className="px-10">Name</DashboardTableColumn>
      <DashboardTableColumn>Email</DashboardTableColumn>
      <DashboardTableColumn className="px-10">
        Subject Taught
      </DashboardTableColumn>

    </DashboardTableRow>
  );
}

export default function TeachersTable() {
  const teacherQuery = api.teacher.all.useQuery();
  const students = teacherQuery.data?.teacherProfiles ?? [];

  return (
    <div>
      <TableHeader />
      <div className="flex w-full flex-col">
        {students.map((teacher) => (
          <TeacherRow {...teacher} />
        ))}
      </div>
    </div>
  );
}

function TeacherRow(
  props: RouterOutputs["teacher"]["all"]["teacherProfiles"][number]
) {
  const [checked, setChecked] = useState(false);
  const [selectedTeachers, setSelectedTeachers] = useRecoilState(selectedTeachersState);

  const mutation = api.teacher.remove.useMutation();
  const context = api.useContext();

  useEffect(() => {
		if (checked) {
			setSelectedTeachers((state) => [...state, props.id]);
		} else {
			let s = selectedTeachers;
			s = s.filter((val) => {
				if (val == props.id) return;
				else return val;
			});
			setSelectedTeachers(s);
		}
	}, [checked]);

	useEffect(() => {
		if (selectedTeachers.includes(props.id)) {
			setChecked(true);
		} else {
			setChecked(false);
		}
	}, [selectedTeachers]);

  async function del() {
    await mutation.mutateAsync({ id: props.id });
    await context.student.invalidate();
  }

  return (
    <DashboardTableRow className="grid-cols-[5%_5%_30%_30%_30%]">
      <Checkbox checked={checked} setChecked={setChecked} />
      <DashboardTableColumn className="mx-auto">
        {props.id}
      </DashboardTableColumn>
      <DashboardTableColumn className="px-10">
        {props.teacher.name}
      </DashboardTableColumn>
      <DashboardTableColumn className="px-10">
        {props.teacher.email}
      </DashboardTableColumn>

      <DashboardTableColumn className="px-10">
        {props.subject}
      </DashboardTableColumn>
      <div className="grid h-full w-full grid-cols-2">
        <span></span>
        <MdDelete
          className="m-auto text-xl text-red-500 transition-colors"
          onClick={() => del()}
        />
      </div>
    </DashboardTableRow>
  );
}
