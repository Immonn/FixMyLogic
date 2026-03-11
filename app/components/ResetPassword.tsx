import { Input } from '@/app/components/Input';
import { Button } from '@/app/components/Button';
import { CrossIcon } from '../icons/Close';

//@ts-ignore
export function ResetPassword({open,onclose}){
    return  <div>
        {open && (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center"
                onClick={onclose}
            >
                <div className="absolute inset-0 bg-slate-500 opacity-60" />
                <div
                    className="bg-white rounded-lg shadow relative px-10 py-10 w-100 flex flex-col gap-2 bg-linear-to-b from-brand-orange to-slate-900"
                    onClick={e => e.stopPropagation()}
                >
                    <span className="flex justify-end cursor-pointer" onClick={onclose}>
                        <div className="hover:bg-red-600 p-1 rounded transition duration-150"><CrossIcon /></div>
                    </span>
                    <Input placeholder='Email' className='w-full'></Input>
                    

                    <div className="flex justify-center mt-2">
                        <Button text="Submit" />
                    </div>
                </div>
            </div>
        )}
    </div>
}