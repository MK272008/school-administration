import AddTeacherModal from "@/components/administrator/teachers/AddTeacher";
import Header, { ActionHeader } from "@/components/administrator/teachers/Header";
import TeachersTable from "@/components/administrator/teachers/Table";
import { NextPage } from "@/interfaces/app";
import AdministratorLayout from "@/layouts/Dashboards/Aministrator";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const AdministratorTeacher: NextPage = () => {

  const [search, setSearch] = useState("");
  const [actionHeader, setActionHeader] = useState(false);
  const [addTeacherModal, setAddTeacherModal] = useState(false);

//   useEffect(() => {
// 	if (selectedStudents.length > 0) setActionHeader(true);
// 	else setActionHeader(false);
//   }, [selectedStudents])

//   useEffect(() => {
// 	if (toUpdate == undefined) setUpdateStudentModal(false);
// 	else setUpdateStudentModal(true)
//   }, [toUpdate])

  return (
        <div className="overflow-hidden p-5 flex items-center justify-center relative">
			<div className="w-full grid grid-rows-[20%_80%] h-full">
				<AnimatePresence>
				{actionHeader ? (
					<ActionHeader />
				) : (
					<Header
						search={search}
						setSearch={setSearch}
						setAddTeacherModal={setAddTeacherModal}
					/>
				)}
				</AnimatePresence>
				<TeachersTable   />
			</div>
			<AddTeacherModal
				opened={addTeacherModal}
				setOpened={setAddTeacherModal}
        />
        </div>
  )
}


AdministratorTeacher.getLayout = (page) => (
	<AdministratorLayout>
		{page}
	</AdministratorLayout>
)

export default AdministratorTeacher