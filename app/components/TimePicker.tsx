'use client'
import ReactSelect, {Props as SelectProps} from "react-select";
import clsx from "clsx";
import {useEffect, useState} from "react";
import {rentTimes} from "@/lib/types/rentTimes";

export default function TimePicker({id}: { id: string })
{
    return (
        <Select
            id={id}
            name={id}
            defaultValue={rentTimes[0]}
            menuPlacement='top'
            required
            options={rentTimes}/>
    );
}

const controlStyles = {
    base: "bg-none hover:cursor-pointer select lg:select-sm relative bg-transparent !text-base !pl-0 !pr-5" +
        " font-bold !min-h-0 lg:!py-0 !transition-[border,padding] !duration-[100ms] !ease-[cubic-bezier(.4,0,.2,1)]",
    focus: "!pl-4 !pr-9",
    nonFocus: "",
};

const optionStyles = {
    base: "hover:cursor-pointer px-3 py-2 rounded-lg text-base-content",
    focus: "bg-primary text-primary-content active:bg-gray-400",
};


function Select(props: SelectProps)
{
    // 'document' can't be accessed in SSR, so we have to wait until the component get mounted on client.
    const [_document, set_document] = useState<Document | null>(null)

    useEffect(() =>
    {
        set_document(document)
    }, [])

    if (_document === null) return null;

    return (
        <ReactSelect {...props}
                     menuPortalTarget={_document.body}
                     unstyled
                     styles={{
                         control: (baseStyles: object, state: { isFocused: boolean; }) => ({
                             ...baseStyles,
                             borderWidth: '1px',
                             borderColor: !state.isFocused ? 'transparent' : 'oklch(var(--p))',
                             transition: 'none'
                         }),
                     }}
                     classNames={{
                         container: () => 'time-picker-container',
                         control: ({isFocused}: { isFocused: boolean }) =>
                             clsx(
                                 isFocused ? controlStyles.focus : controlStyles.nonFocus,
                                 controlStyles.base,
                             ),
                         placeholder: () => 'text-gray-500 pl-1 py-0.5',
                         dropdownIndicator: () => 'p-1 absolute',
                         menu: () => 'menu bg-base-200 rounded-lg min-w-24 max-h-60 shadow-lg !z-[9999]',
                         option: ({isFocused}: { isFocused: boolean }) =>
                             clsx(
                                 isFocused && optionStyles.focus,
                                 optionStyles.base,
                             ),
                     }}
        />
    );
}