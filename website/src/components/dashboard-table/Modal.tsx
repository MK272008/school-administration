import { AnimatePresence, motion } from "framer-motion";

interface ModalBackdropProps {
	onClickOutside: () => void;
}

const ModalBackdrop = ({ onClickOutside }: ModalBackdropProps) => {
	return (
		<motion.div
			className="bg-black top-0 left-0 bottom-0 h-full w-full absolute z-0"
			initial={{ opacity: 0 }}
			animate={{ opacity: 0.5 }}
			exit={{ opacity: 0 }}
			onClick={() => onClickOutside()}
		></motion.div>
	);
};

export function ModalHeading(
	props: React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLHeadingElement>,
		HTMLHeadingElement
	>
) {
	return (
		<h1
			{...props}
			className={`text-center font-heading py-6 text-6xl ${props.className}`}
		>
			{props.children}
		</h1>
	);
}

interface ModalBodyProps {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	heading: React.ReactElement;
	children: React.ReactNode;
    className?: string;
}

const ModalBody = ({ heading, onSubmit, children, className }: ModalBodyProps) => {
	return (
				<motion.div
					className={`bg-dark-secondary border-dark-border rounded-md p-2 h-max w-1/2 absolute ${className}`}
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0, opacity: 0 }}
				>
                    {heading}
					<form
						onSubmit={onSubmit}
						className="flex space-y-4 flex-col"
                        >
						{children}
					</form>
				</motion.div>
	);
};

interface ModalProps {
	opened: boolean;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	onClickOutside: () => void;
	heading: React.ReactElement;
	children: React.ReactNode;
}

export default function Modal({
	opened,
	onSubmit,
	onClickOutside,
	heading,
	children,
}: ModalProps) {
	return (
		<>
			<AnimatePresence>
				{opened && (
					<ModalBackdrop onClickOutside={() => onClickOutside()} />
				)}
			</AnimatePresence>
			<AnimatePresence>
				{opened && (
					<ModalBody
						heading={heading}
						children={children}
						onSubmit={onSubmit}
					/>
				)}
			</AnimatePresence>
		</>
	);
}
