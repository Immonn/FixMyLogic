import { forwardRef } from 'react';

interface InputProps{
    placeholder:string;
    className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return (
        <input ref={ref} placeholder={props.placeholder} type="text" className={`px-4 text-white font-medium py-2 rounded text-left placeholder:text-left ${props.className ?? 'w-100'}`} />
    );
});
Input.displayName = 'Input';
