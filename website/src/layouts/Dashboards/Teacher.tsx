import { useUser } from "@/lib/hooks/auth";
import DashboardShell, {
  DashboardHeader,
  DashboardSidebar,
  DashboardSidebarItem,
  UserAvatar,
} from "./Base";

import { FaChild } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { HiHome } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";

function Header() {
  const user = useUser();

  return (
    <DashboardHeader>
      <div className="w-full h-full flex">
        <h1 className="my-auto text-2xl mx-4">{user?.name}</h1>
      </div>
    </DashboardHeader>
  );
}

function Sidebar() {
  return (
    <DashboardSidebar>
      <nav className="grid grid-rows-5 gap-y-1">
        <DashboardSidebarItem
          icon={HiHome}
          iconBackgroundColor="bg-blue-500"
          iconFillColor="text-blue-500"
          title="Home"
          url="/teacher"
        />
        <DashboardSidebarItem
          icon={IoMdNotificationsOutline}
          iconBackgroundColor="bg-pink-500"
          iconFillColor="text-pink-500"
          title="Notifications"
          url="/teacher/notifications"
        />
        <DashboardSidebarItem
          icon={GiTeacher}
          iconBackgroundColor="bg-green-500"
          iconFillColor="text-green-500"
          title="Classroom"
          url="/teacher/classroom"
        />
      </nav>

      <UserAvatar />
    </DashboardSidebar>
  );
}

export default function TeacherLayout(props: {
  children: React.ReactElement;
}) {
  return (
    <DashboardShell header={Header} sidebar={Sidebar}>
      {props.children}
    </DashboardShell>
  );
}
