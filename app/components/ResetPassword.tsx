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
                <div className="absolute inset-0 bg-gray-900 opacity-60" />
                <div
                    className="bg-white rounded-lg shadow relative px-10 py-10 w-100 flex flex-col gap-2 bg-linear-to-b from-brand-orange to-slate-900"
                    onClick={e => e.stopPropagation()}
                >  <p className='font-medium items-center flex justify-center text-2xl text-gray-300'>Reset Password</p>
                    <span className="flex justify-end cursor-pointer" onClick={onclose}>
                        <div className="hover:bg-white p-1 rounded transition duration-150"><CrossIcon /></div>
                    </span>
                    <Input placeholder='Email' className='w-full'></Input>
                    <Input placeholder='New Password' className='w-full'></Input>
                    

                    <div className="flex justify-center mt-2">
                        <Button text="Send OTP" />
                    </div>
                </div>
            </div>
        )}
    </div>
}