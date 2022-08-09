import React from 'react';
import {ICompany, IUsers, IUsersForm} from "../../interface/app.interface";
import {useDispatch} from "react-redux";
import {addUsers, removeUsers, removeAllUsers, editUser} from "../../store/company.slice";
import {useSelect} from "../hooks/useSelect";
import {UserForm} from "../form/usersForm";

interface IProps {
    currentCompany:ICompany,
}

export const UsersTable = ({currentCompany}:IProps) => {

   const data = currentCompany.users
   const companyId = currentCompany.id
   const {selectValue, allSelectValue, onSelect, onAllSelect} = useSelect<IUsers>(data)
    const dispatch = useDispatch()
    const onSubmitAddUsers = (data:IUsersForm)=>{
        dispatch(addUsers({companyId, user:data}))
    }
    const removeUsersHandle = () =>{
        if (data.length===selectValue.length)dispatch(removeAllUsers({companyId}))
        else dispatch(removeUsers({companyId, usersId:selectValue}))
    }
    const onSubmitEditUser = (dataForm:IUsersForm)=>{
        dispatch(editUser({
            companyId,
            user: {
               id:data.find(el=>el.id===selectValue[0])!.id,
               name:dataForm.name,
               surname:dataForm.surname,
               status:dataForm.status
            }}))
    }
    if (data.length===0)return<div className={'flex flex-col gap-[15px] w-[400px] mt-[20px]'}>
        <UserForm addUsers={onSubmitAddUsers}/>
    </div>
    return (
            <div className={'flex flex-col gap-[15px] w-[400px]'}>
                <table >
                    <caption className={'font-bold uppercase text-[20px]'}>Сотрудники</caption>
                    <thead>
                    <tr >
                        <td colSpan={4} className={'w-full text-center '}>

                            <input checked={allSelectValue} onChange={()=>onAllSelect()} type={'checkbox'}/>
                            <span className={'pl-[10px]'}>Выделить все</span>

                        </td>
                    </tr>
                    <tr className={'border'}>
                        <th>Выбрать</th>
                        <th>имя</th>
                        <th>фамилия</th>
                        <th>дожность</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(el=><tr className={selectValue.includes(el.id)?'bg-sky-200':''}  key={el.id}>
                        <td width={100}>
                            <input  checked={selectValue.includes(el.id)} onChange={()=>onSelect(el.id)} type={'checkbox'}/>
                        </td>
                        <td width={100} >{el.name}</td>
                        <td width={100} >{el.surname}</td>
                        <td  width={100}>{el.status}</td>
                    </tr>)}
                    </tbody>
                </table>
                <div className={'flex flex-col gap-[15px] mt-[10px]'}>
                    <UserForm addUsers={onSubmitAddUsers}/>
                    {selectValue.length===1&&<UserForm data={data.find(el=>el.id===selectValue[0])} addUsers={onSubmitEditUser}/>}
                    {data.length>0&&selectValue.length!==0&&<button onClick={()=>removeUsersHandle()}
                                                                    className={'bg-red-200 border p-[5px] w-full'}
                    >
                        Удалить сотрудника
                    </button>}

                </div>
            </div>


    );
};
