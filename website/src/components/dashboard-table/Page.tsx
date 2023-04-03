import { BaseProps } from "@/interfaces";


export function TablePage(props: BaseProps) {
    return (
        <div className={`overflow-hidden p-5 flex items-center justify-center relative ${props.className}`}>
            {props.children}
        </div>
    );
}

export function TableShell(props: BaseProps) {
    return (
        <div className={`w-full grid grid-rows-[20%_80%] h-full ${props.className}`}>
            {props.children}
        </div>
    );
}