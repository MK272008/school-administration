import TableHeader, { HeaderIcon } from "@/components/dashboard-table/Header";
import { Checkbox, Searchbar } from "@/components/inputs";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { HiArrowLeft } from "react-icons/hi";
import { IoMdRefresh } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useRecoilState } from "recoil";
import { selectedStudentsState } from "./store";
import { motion } from "framer-motion";

interface HeaderProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setAddStudentModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ search, setAddStudentModal, setSearch}: HeaderProps) {
  const [checked, setChecked] = useState(false);
  const [selectedStudents, setSelectedStudents] = useRecoilState(selectedStudentsState);
  const studentsQuery = api.student.all.useQuery();
  const students = studentsQuery.data?.students;

  useEffect(() => {
    if (checked) {
      students?.forEach(student => {
        setSelectedStudents(state => [...state, student.id]);
       
      })
    }
    else setSelectedStudents([]);
  }, [checked])

  useEffect(() => {
    console.log(selectedStudents)
  }, [selectedStudents])

  const context = api.useContext();

  function refresh() {
    context.invalidate();
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
				onClick={() => setAddStudentModal(true)}
			/>
      </TableHeader>
  );
}

export function ActionHeader() {
  const [selectedStudents, setSelectedStudents] = useRecoilState(
    selectedStudentsState
  );

  const mutation = api.student.delete.useMutation();
  const context = api.useContext();

  async function deleteSelectedStudents() {
    selectedStudents.forEach(async studentId => {
      await mutation.mutateAsync({ id: studentId });
    });
    await context.student.all.invalidate();
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-[5%_5%]">
      <HeaderIcon icon={HiArrowLeft} onClick={() => setSelectedStudents([])} />
      <HeaderIcon icon={MdDelete} className='text-red-500' onClick={() => deleteSelectedStudents()} />
    </motion.div>
  );
}
