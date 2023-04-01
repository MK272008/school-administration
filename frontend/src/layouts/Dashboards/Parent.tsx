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
import { api } from "@/utils/api";
import { IoMdNotificationsOutline } from "react-icons/io";

function Header() {
  const user = useUser();

  const schoolQuery = api.school.getByOwner.useQuery();

  return (
    <DashboardHeader>
      <div className="w-full h-full flex">
        <h1 className="my-auto text-2xl mx-4">{schoolQuery.data?.school?.name}</h1>
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
          url="/parent"
        />
        <DashboardSidebarItem
          icon={FaChild}
          iconBackgroundColor="bg-pink-500"
          iconFillColor="text-pink-500"
          title="Students"
          url="/parent/child"
        />
        <DashboardSidebarItem
          icon={IoMdNotificationsOutline}
          iconBackgroundColor="bg-red-500"
          iconFillColor="text-red-500"
          title="Notifications"
          url="/parent/notifications"
        />
        <DashboardSidebarItem
          icon={GiTeacher}
          iconBackgroundColor="bg-green-500"
          iconFillColor="text-green-500"
          title="Classroom"
          url="/parent/classroom"
        />
      </nav>

      <UserAvatar />
    </DashboardSidebar>
  );
}

export default function ParentLayout(props: {
  children: React.ReactElement;
}) {
  return (
    <DashboardShell header={Header} sidebar={Sidebar}>
      {props.children}
    </DashboardShell>
  );
}
