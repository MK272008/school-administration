type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export function PrimaryButton(props: ButtonProps) {
	return (
		<button {...props} className={`h-max px-10 py-3 disabled:opacity-50 bg-primary disabled:hover:bg-primary hover:bg-[rgb(80,88,255)] transition-all text-black text-dark-bg font-extrabold rounded-xl ${props.className ?? ""}`}>{props.children}</button>
	);
}

export function SecondaryButton(props: ButtonProps) {
	return (
		<button {...props} className={`h-max px-10 py-3 border-2 border-white  text-white font-extrabold rounded-xl hover:text-black hover:bg-white transition-colors ${props.className ?? ""}`}>{props.children}</button>
	);
}