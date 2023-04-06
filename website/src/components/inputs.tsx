import React from "react";
import { HiCheck } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineSearch } from "react-icons/ai";
import { NextPage } from "@/interfaces/app";

type InputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

export function FormInput(props: InputProps) {
    return (
        <div className="flex flex-col gap-y-1 text-slate-300">
            {/* <label className="px-1 font-heading">{props.placeholder}</label> */}
            <input
                {...props}
            
                className="bg-gray-700 rounded-lg px-2.5 py-3 outline-none focus:ring-2 focus:ring-primary transition-all placeholder:text-slate-400 placeholder:font-semibold"
            />
        </div>
    );
}

type CheckboxProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {
    checked: boolean;
    setChecked: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Checkbox(props: CheckboxProps) {
    return (
        <div
            className="flex items-center justify-center relative h-max w-max"
            style={{ margin: "auto" }}
        >
            <input
                type="checkbox"
                className={`bg-dark-secondary hover:bg-dark-tertiary transition-colors w-5 h-5 rounded-md border-dark-border ${props.className ?? ""}`}
                style={{ margin: "auto" }}
                onChange={() => props.setChecked(!props.checked)}
            />
            <AnimatePresence>
                {props.checked && (
                    <motion.div
                        className="absolute h-full w-full top-0 left-0 flex items-center justify-center"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => props.setChecked(!props.checked)}
                    >
                        <HiCheck />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function Searchbar({ placeholder, setSearch }: { placeholder: string, search: string, setSearch: React.Dispatch<React.SetStateAction<string>> }) {
    return (
        <div className="grid grid-cols-[10%_90%] focus-within:ring-2 focus-within:ring-primary border-dark-border bg-dark-secondary rounded-md px-2.5 py-2 w-full transition-all">
            <AiOutlineSearch className="text-[30px]" />
            <input
                type="text"
                className="outline-none bg-transparent text-xl"
                placeholder={placeholder}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    );
}


export function Select(props: React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>) {
    return (
        <div className="py-2">
            <label className="pb-1 font-heading">{props.placeholder}</label>
            <div className="w-full bg-gray-700 rounded-lg px-2.5 outline-none focus:ring-2 focus:ring-primary transition-all">
            <select {...props} className='h-full w-full bg-transparent py-2 outline-none'></select>
            </div>
            
        </div>
    );
}

export function Option(props: React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>) {
    return (
        <option {...props} className='bg-gray-700 hover:bg-gray-900'></option>
    );
}