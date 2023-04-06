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

function Header() {
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
          url="/administrator"
        />
        <DashboardSidebarItem
          icon={FaChild}
          iconBackgroundColor="bg-pink-500"
          iconFillColor="text-pink-500"
          title="Students"
          url="/administrator/students"
        />
        <DashboardSidebarItem
          icon={GiTeacher}
          iconBackgroundColor="bg-green-500"
          iconFillColor="text-green-500"
          title="Teachers"
          url="/administrator/teachers"
        />
      </nav>

      <UserAvatar />
    </DashboardSidebar>
  );
}

export default function AdministratorLayout(props: {
  children: React.ReactElement;
}) {
  return (
    <DashboardShell header={Header} sidebar={Sidebar}>
      {props.children}
    </DashboardShell>
  );
}
