import { HiOutlinePencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { selectedStudentsState, selectedStudentToUpdate } from "./store";
import DashboardTableRow, {
  DashboardTableColumn,
} from "@/components/dashboard-table/Table";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/inputs";
import { api, RouterOutputs } from "@/utils/api";
import { useRecoilState } from "recoil";
import { PrimaryButton } from "@/components/buttons";

function TableHeader() {
  return (
    <DashboardTableRow>
      <span></span>

      <DashboardTableColumn className="">ID</DashboardTableColumn>
      <DashboardTableColumn className="">Name</DashboardTableColumn>
      <DashboardTableColumn className="">
        Parents' Name
      </DashboardTableColumn>
    </DashboardTableRow>
  );
}

export default function StudentsTable() {
  const studentsQuery = api.student.all.useQuery();
  const students = studentsQuery.data?.students ?? [];

  return (
    <div>
      <TableHeader />
      <div className="flex w-full flex-col">
        {students.map((student) => (
          <StudentRow {...student} />
        ))}
      </div>
    </div>
  );
}

function StudentRow(
  props: RouterOutputs["student"]["all"]["students"][number]
) {
  const [checked, setChecked] = useState(false);

  const [toUpdate, setToUpdate] = useRecoilState(selectedStudentToUpdate);
  const [selectedStudents, setSelectedStudents] = useRecoilState(selectedStudentsState);

  const mutation = api.student.delete.useMutation();
  const context = api.useContext();

  useEffect(() => {
		if (checked) {
			setSelectedStudents((state) => [...state, props.id]);
		} else {
			let s = selectedStudents;
			s = s.filter((val) => {
				if (val == props.id) return;
				else return val;
			});
			setSelectedStudents(s);
		}
	}, [checked]);

	useEffect(() => {
		if (selectedStudents.includes(props.id)) {
			setChecked(true);
		} else {
			setChecked(false);
		}
	}, [selectedStudents]);

  async function del() {
    await mutation.mutateAsync({ id: props.id });
    await context.student.invalidate();
  }

  return (
    <DashboardTableRow>
      <Checkbox checked={checked} setChecked={setChecked} />
      <DashboardTableColumn className="">
        {props.id}
      </DashboardTableColumn>
      <DashboardTableColumn className="">
        {props.name}
      </DashboardTableColumn>

      <DashboardTableColumn className="py-2">
        {props.parent?.parent.name ? props.parent?.parent.name : <PrimaryButton disabled={true}>INVITED</PrimaryButton> }
      </DashboardTableColumn>
      <div className="grid h-full w-full grid-cols-2">
        <HiOutlinePencil
          className="m-auto text-xl transition-colors hover:text-primary"
          onClick={() => setToUpdate(props.id)}
        />
        <MdDelete
          className="m-auto text-xl text-red-500 transition-colors"
          onClick={() => del()}
        />
      </div>
    </DashboardTableRow>
  );
}
