import { Button } from "./Button";

interface Cardprops {
    image: string;
    showDelete?: boolean;
    onClick?:()=> void;
}

export function Card(props: Cardprops) {
    return <div className="border rounded-lg w-70 m-10 max-w-md">
        <img className=" rounded-md p-2 bg-gray-900" src={props.image} />
        <Button onClick={props.onClick} className="py-2 w-full bg-slate-600" text="Start Learning"></Button>
    </div>
}