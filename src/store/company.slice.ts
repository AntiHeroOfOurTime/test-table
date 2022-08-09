import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {ICompany, ICompanyForm, IUsers, IUsersForm} from "../interface/app.interface";

const initialState:ICompany[] = [
    {
        id:1,
        name:'Company 1',
        address:'Minsk, Belarus',
        users:[
            {
                id:1,
                name:'Ivan',
                surname:'Ivanov',
                status:'Boss',
            },
            {
                id:2,
                name:'Ivan2',
                surname:'Ivanov2',
                status:'Boss2',
            },
        ]
    },
    {
        id:2,
        name:'Company 2',
        address:'Minsk, Belarus',
        users:[
            {
                id:1,
                name:'Ivan',
                surname:'Ivanov',
                status:'Boss',
            },{
                id:2,
                name:'Ivan2',
                surname:'Ivanov2',
                status:'Boss2',
            },
        ]
    },
    {
        id:3,
        name:'Company 3',
        address:'Minsk, Belarus',
        users:[
            {
                id:1,
                name:'Ivan',
                surname:'Ivanov',
                status:'Boss',
            },{
                id:2,
                name:'Ivan2',
                surname:'Ivanov2',
                status:'Boss2',
            },
        ]
    },
    {
        id:4,
        name:'Company 4',
        address:'Minsk, Belarus',
        users:[
            {
                id:1,
                name:'Ivan',
                surname:'Ivanov',
                status:'Boss',
            },{
                id:2,
                name:'Ivan2',
                surname:'Ivanov2',
                status:'Boss2',
            },
        ]
    },
    {
        id:5,
        name:'Company 5',
        address:'Minsk, Belarus',
        users:[
            {
                id:1,
                name:'Ivan',
                surname:'Ivanov',
                status:'Boss',
            },{
                id:2,
                name:'Ivan2',
                surname:'Ivanov2',
                status:'Boss2',
            },
        ]
    },
    {
        id:6,
        name:'Company 6',
        address:'Minsk, Belarus',
        users:[
            {
                id:1,
                name:'Ivan',
                surname:'Ivanov',
                status:'Boss',
            },{
                id:2,
                name:'Ivan2',
                surname:'Ivanov2',
                status:'Boss2',
            },
        ]
    },
    {
        id:7,
        name:'Company 7',
        address:'Minsk, Belarus',
        users:[
            {
                id:1,
                name:'Ivan',
                surname:'Ivanov',
                status:'Boss',
            },{
                id:2,
                name:'Ivan2',
                surname:'Ivanov2',
                status:'Boss2',
            },
        ]
    },

]


const companySlice = createSlice({
    name: 'dataCompany',
    initialState,
    reducers: {
        addCompany(state,payload:PayloadAction<ICompanyForm>){
            state.push({
                id:state.length>0?state[state.length-1].id+1:1,
                name:payload.payload.name,
                address:payload.payload.address,
                users:[] as IUsers[],
            })
        },
        editCompany(state,payload:PayloadAction<ICompany>) {
            const currentCompany = state?.find(el => el.id === payload.payload.id)
            currentCompany!.name = payload.payload.name
            currentCompany!.address = payload.payload.address
        },
        removeCompany(state,payload:PayloadAction<number[]>){
            return state.filter(el=>!payload.payload.includes(el.id))
        },
        allRemoveCompany(){
            return []
        },
        addUsers(state, payload:PayloadAction<{companyId:number,user:IUsersForm} >) {
            const currentUsers = state.find((el)=>el.id===payload.payload.companyId)?.users
            currentUsers?.push({
                id:currentUsers.length>0?currentUsers[currentUsers.length-1].id+1:1,
                name:payload.payload.user.name,
                surname:payload.payload.user.surname,
                status:payload.payload.user.status,
            })
        },
        editUser(state,payload:PayloadAction<{companyId:number, user:IUsers}>) {
            const currentUsers = state.find((el) => el.id === payload.payload.companyId)?.users
            const currentUser = currentUsers?.find(el => el.id === payload.payload.user.id)
            currentUser!.name = payload.payload.user.name
            currentUser!.surname = payload.payload.user.surname
            currentUser!.status = payload.payload.user.status
        },
        removeUsers(state, payload:PayloadAction<{companyId:number, usersId:number[]}>){
            const currentCompany =  state.find((el)=>el.id===payload.payload.companyId)
            currentCompany!.users =  currentCompany!.users.filter(el=>!payload.payload.usersId.includes(el.id))
        },
        removeAllUsers(state,payload:PayloadAction<{companyId:number}>){
                state.find((el)=>el.id===payload.payload.companyId)!.users = [] as IUsers[]
        },
    },
})

export const {
    addCompany,
    removeCompany,
    allRemoveCompany,
    addUsers,
    removeUsers,
    removeAllUsers,
    editCompany,
    editUser
} = companySlice.actions
export default companySlice.reducer