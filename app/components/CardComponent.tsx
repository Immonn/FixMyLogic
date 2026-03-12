import { Button } from "./Button";

interface Cardprops {
    image: string;
    showDelete?: boolean;
}

export function Card(props: Cardprops) {
    return <div className="border rounded-lg w-70 m-10 max-w-md">
        <img  src={props.image} />
        <Button className="py-5 w-full bg-gray-900" text="Start Learning"></Button>
    </div>
}