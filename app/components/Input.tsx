interface InputProps{
    ref?:any;
    placeholder:string;
    className?: string;
}
export function Input(props:InputProps) {
    return <>
        <input ref={props.ref} placeholder={props.placeholder} type="text" className={`px-4 text-white font-medium py-2 rounded text-left placeholder:text-left ${props.className ?? 'w-100'}`} />
    </>
}
