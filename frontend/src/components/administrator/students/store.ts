import { atom } from 'recoil';


export const selectedStudentsState = atom<string[]>({
    key: 'selectedStudentsState',
    default: []
})

export const selectedStudentToUpdate = atom<string|undefined>({
    key: 'selectedStudentToUpdate',
    default: undefined
})