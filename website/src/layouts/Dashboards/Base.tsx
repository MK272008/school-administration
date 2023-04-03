
import { IconType } from "react-icons/lib";
import { useUser } from "@/lib/hooks/auth";

import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/router";
import Link from "next/link";

interface DashboardShellProps {
    sidebar: () => React.ReactElement
    header: () => React.ReactElement
    children: React.ReactNode
}

export default function DashboardShell(props: DashboardShellProps) {
    return (
        <div className="grid grid-cols-[16%_84%] grid-rows-[8%_92%] h-screen">
            <props.header />
            <props.sidebar />
            {props.children}
        </div>
    );
}



interface DashboardSidebarProps {
    children: React.ReactNode;
    className?: string;
}

export function DashboardSidebar(props: DashboardSidebarProps) {
    return (
        <div className={`h-full w-full px-2 py-2 bg-dark-secondary border-dark-border border-t-0 flex flex-col justify-between ${props.className}`}>
            {props.children}
        </div>
    );
}

/**
 *             <nav className="grid grid-rows-5 gap-y-1">
                {props.children}
            </nav>

            {props.avatar}
 */



interface DashboardSidebarItemProps {
    icon: IconType;
    title: string;
    iconBackgroundColor: string;
    iconFillColor: string;
    url: string;
}

export function DashboardSidebarItem({
    icon: Icon,
    title,
    iconBackgroundColor,
    iconFillColor,
    url
}: DashboardSidebarItemProps) {
    const { pathname: location } = useRouter()
    return (
        <Link href={url}>
            <div
                className={`h-full w-full hover:bg-dark-tertiary ${location == url && "bg-dark-tertiary"
                    } grid grid-cols-[40px_80%] p-2 rounded-md transition-colors cursor-pointer`}
            >
                <div
                    className={`p-1 ${iconBackgroundColor} ${iconFillColor}  bg-opacity-20 rounded-md`}
                >
                    <Icon className={`text-2xl m-auto`} />
                </div>
                <div className="grid grid-cols-[40px_80%] text-lg px-5">
                    {title}
                </div>
            </div>
        </Link>
    );
}

export function UserAvatar() {
    const user = useUser();
    return (
        <div>
            <hr className="my-2 border-dark-border border-4" />
            <div className="relative group h-16 p-2 hover:bg-dark-tertiary grid grid-cols-[20%_80%] grid-rows-[60%_40%] cursor-pointer gap-x-2">
                <div className="row-span-2 flex items-center justify-center">
                    <img src={user?.image ?? ""} alt="" className="h-10 rounded-full" />
                </div>
                <h1 className="text-lg">{user?.username}</h1>
                <div className="text-[12px] my-auto max-w-[90%] truncate">
                    <span className="">{user?.email}</span>
                </div>
                <div className="absolute right-0 bottom-0 flex items-center justify-center h-full px-2 ">
                    <IoIosArrowForward className="opacity-0 -translate-x-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
            </div>
        </div>
    );
}

export function DashboardHeader(props: { children: React.ReactNode }) {
    return (
        <div className="bg-dark-secondary border-dark-border col-span-2 w-full h-full">
            {props.children}
        </div>
    );
}
