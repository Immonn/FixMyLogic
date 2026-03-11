import { atom } from "recoil";

type AuthModalState={
    isOpen:boolean;
    type:'signin' | 'signup' | 'resetpassword'
}

const initialModalState: AuthModalState={
    isOpen:false,
    type:'signin',
}

export const authmodalstate=atom<AuthModalState>({
    key:'authmodalstate',
    default:initialModalState
})
