import { BaseProps } from "@/interfaces";


export default function DashboardTableRow(props: BaseProps) {
	return (    
		<div className={`grid grid-cols-[5%_25%_30%_30%__10%] border-dark-border rounded-md hover:bg-dark-secondary transition-all cursor-pointer ${props.className}`}>
            {props.children}
        </div>
	);
}

type DashboardTableColumnProps = BaseProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

export function DashboardTableColumn(props: DashboardTableColumnProps) {
    return (
        <span {...props} className={`my-auto mr-auto px-4 py-4 ${props.className}`}>
            {props.children}
        </span>
    );
}
