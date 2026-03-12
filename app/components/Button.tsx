interface ButtonProps{
    text:string;
    onClick?:() => void;
    className?:string;
}


const style="cursor-pointer w-100 bg-brand-orange text-white px-2 py-2 sm:px-4 rounded-md text-sm font-medium hover:text-brand-orange hover:bg-white transition duration-300 ease-in-out"

export function Button(props:ButtonProps){
    return <button className={`${style} ${props.className ?? ""}`} onClick={props.onClick}>{props.text}</button>
}