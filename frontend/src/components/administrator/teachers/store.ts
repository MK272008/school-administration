import { atom } from 'recoil';


export const selectedTeachersState = atom<string[]>({
    key: 'selectedStudentsState',
    default: []
})
