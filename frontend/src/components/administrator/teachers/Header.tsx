import TableHeader, { HeaderIcon } from "@/components/dashboard-table/Header";
import { Checkbox, Searchbar } from "@/components/inputs";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { HiArrowLeft } from "react-icons/hi";
import { IoMdRefresh } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useRecoilState } from "recoil";
import { selectedTeachersState } from "./store";
import { motion } from "framer-motion";

interface HeaderProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setAddTeacherModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ search, setAddTeacherModal, setSearch}: HeaderProps) {
  const [checked, setChecked] = useState(false);
  const [selectedStudents, setSelectedStudents] = useRecoilState(selectedTeachersState);
  const teacherQuery = api.teacher.all.useQuery();
  const teachers = teacherQuery.data?.teacherProfiles ?? [];

  useEffect(() => {
    if (checked) {
      teachers.forEach(teacher => {
        setSelectedStudents(state => [...state, teacher.id]);
       
      })
    }
    else setSelectedStudents([]);
  }, [checked])

  const context = api.useContext();

  function refresh() {
    context.teacher.all.invalidate();
  }

  return (
      <TableHeader className="w-full">
      <Checkbox
				className="m-auto"
				checked={checked}
				setChecked={setChecked}
			/>
			<div className="h-max m-auto w-full">
				<Searchbar
					search={search}
					setSearch={setSearch}
					placeholder="Search..."
				/>
			</div>
			<HeaderIcon icon={IoMdRefresh} onClick={() => refresh()} />
			<HeaderIcon
				icon={AiOutlinePlus}
				onClick={() => setAddTeacherModal(true)}
			/>
      </TableHeader>
  );
}

export function ActionHeader() {
  const [selectedTeachers, setSelectedTeachers] = useRecoilState(
    selectedTeachersState
  );

  const mutation = api.teacher.remove.useMutation();
  const context = api.useContext();

  async function deleteSelectedTeachers() {
    selectedTeachers.forEach(async teacherID => {
      await mutation.mutateAsync({ id: teacherID });
    });
    await context.teacher.all.invalidate();
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-[5%_5%]">
      <HeaderIcon icon={HiArrowLeft} onClick={() => setSelectedTeachers([])} />
      <HeaderIcon icon={MdDelete} className='text-red-500' onClick={() => deleteSelectedTeachers()} />
    </motion.div>
  );
}
