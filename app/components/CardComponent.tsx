import { Button } from "./Button";

interface Cardprops {
    image: string;
    showDelete?: boolean;
    onClick?: () => void;
}

export function Card(props: Cardprops) {
    return (
        <div 
            onClick={props.onClick}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-dark-layer-1 border border-dark-divider-border-2 hover:border-brand-orange/70 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(255,161,22,0.15)] cursor-pointer w-full"
        >
            <div className="relative aspect-video w-full overflow-hidden bg-black/50 p-6 flex items-center justify-center">
                {/* Micro background gradient for card image space */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-dark-layer-1 to-transparent z-10 border-none"></div>
                <img 
                    className="relative z-0 h-full w-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105" 
                    src={props.image} 
                    alt="Learning Path Thumbnail"
                />
            </div>
            <div className="p-5 flex flex-col relative z-20 border-t border-dark-divider-border-2/50 bg-dark-layer-1">
                <Button 
                    className="py-2.5 w-full bg-brand-orange text-white group-hover:bg-brand-orange-s transition-all duration-300 font-semibold rounded-xl ring-1 ring-brand-orange/30 group-hover:ring-brand-orange/70 flex items-center justify-center gap-2" 
                    text="Start Learning"
                />
            </div>
        </div>
    );
}