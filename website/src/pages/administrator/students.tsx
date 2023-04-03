import { useEffect, useState } from "react";

import { TableShell } from "@/components/dashboard-table/Page";
import { Searchbar } from "@/components/inputs";
import { DashboardHeader } from "@/layouts/Dashboards/Base";
import DashboardTableRow, { DashboardTableColumn } from "@/components/dashboard-table/Table";
import { AnimatePresence } from "framer-motion";
import Modal, { ModalHeading } from "@/components/dashboard-table/Modal";
import AddStudentModal from "@/components/administrator/students/AddStudentModal";
import StudentsTable from "@/components/administrator/students/Table";
import Header, { ActionHeader } from "@/components/administrator/students/Header";
import UpdateStudentModal from "@/components/administrator/students/UpdateStudentModal";
import { useRecoilState } from "recoil";
import { selectedStudentsState, selectedStudentToUpdate } from "@/components/administrator/students/store";
import AdministratorLayout from "@/layouts/Dashboards/Aministrator";



export default function AdministratorStudent() {

  const [search, setSearch] = useState("");
  const [actionHeader, setActionHeader] = useState(false);
  const [addStudentModal, setAddStudentModal] = useState(false);
  const [updateStudentModal, setUpdateStudentModal] = useState(false);

  const [toUpdate, setToUpdate] = useRecoilState(selectedStudentToUpdate);
  const [selectedStudents] = useRecoilState(selectedStudentsState);

  useEffect(() => {
	if (selectedStudents.length > 0) setActionHeader(true);
	else setActionHeader(false);
  }, [selectedStudents])

  useEffect(() => {
	if (toUpdate == undefined) setUpdateStudentModal(false);
	else setUpdateStudentModal(true)
  }, [toUpdate])

  return (
    <AdministratorLayout>
        <div className="overflow-hidden p-5 flex items-center justify-center relative">
			<div className="w-full grid grid-rows-[20%_80%] h-full">
				<AnimatePresence>
				{actionHeader ? (
					<ActionHeader />
				) : (
					<Header
						search={search}
						setSearch={setSearch}
						setAddStudentModal={setAddStudentModal}
					/>
				)}
				</AnimatePresence>
				<StudentsTable />
			</div>
			<AddStudentModal
				opened={addStudentModal}
				setOpened={setAddStudentModal}
        />
			<UpdateStudentModal
				opened={updateStudentModal}
				setOpened={setUpdateStudentModal}
        />
        </div>
    </AdministratorLayout>
  )
}





