import { BaseProps } from "@/interfaces";
import { motion } from "framer-motion";
import { IconBaseProps, IconType } from "react-icons/lib";

interface DashboardHeaderProps extends BaseProps {
    
}

export default function DashbordHeader(props: DashboardHeaderProps) {
  return (
    <motion.div {...props} className={`grid grid-cols-[5%_85%_5%_5%] ${props.className}`}  initial={{ opacity: 0}} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

    </motion.div>
  )
}


interface IconProps extends IconBaseProps {
  icon: IconType;
}

export function HeaderIcon(props: IconProps) {
  return (
    <props.icon {...props} className={`cursor-pointer hover:bg-dark-tertiary transition-all m-auto text-dark-text h-10 w-10 rounded-full bg-dark-secondary border-dark-border p-1.5 ${props.className}`} />
  );
}