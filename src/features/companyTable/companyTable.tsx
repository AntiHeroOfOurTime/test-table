import React from 'react';
import {ICompany, ICompanyForm} from "../../interface/app.interface";
import './styles.module.css'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {CompanyForm} from "../form/companyForm";
import {addCompany, allRemoveCompany, editCompany, removeCompany} from "../../store/company.slice";
import {useSelect} from "../hooks/useSelect";
import {UsersTable} from "../usersTable/usersTable";


export const CompanyTable = () => {
    const dispatch = useDispatch()
    const data = useSelector((state:RootState) => state.dataTable )
    const {selectValue, allSelectValue, onSelect, onAllSelect, clean} = useSelect<ICompany>(data)
    const onSubmitAddCompany = (data:ICompanyForm)=>{
        dispatch(addCompany({name:data.name, address:data.address}))
    }
    const onSubmitEditCompany = (data:ICompanyForm)=>{
        dispatch(editCompany({
            id:selectValue[0],
            name:data.name,
            address:data.address,
        } as ICompany))
    }
    const removeCompanyHandle = () =>{
        if (data.length===selectValue.length)dispatch(allRemoveCompany())
        else dispatch(removeCompany(selectValue))
        clean()
    }
    return (
        <div className={'flex w-full justify-between gap-16 mx-[20px]'}>
            <div className={'flex flex-col gap-[15px] w-[600px]'} >
                <table>
                    <caption className={'font-bold uppercase text-[20px]'}>Компании</caption>
                    <thead>
                    <tr >
                        <td colSpan={4} className={'w-full text-center '}>
                                <input  checked={allSelectValue} onChange={()=>onAllSelect()} type={'checkbox'}/>
                                <span className={'pl-[10px]'}>Выделить все</span>
                        </td>
                    </tr>
                    <tr className={'border'}>
                        <th>Выбрать</th>
                        <th >имя</th>
                        <th >адресс</th>
                        <th >количество сотрудников</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(el=><tr className={selectValue.includes(el.id)?'bg-sky-200':''}  key={el.id}>
                        <td>
                            <input checked={selectValue.includes(el.id)} onChange={()=>onSelect(el.id)} type={'checkbox'}/>
                        </td>
                        <td >{el.name}</td>
                        <td >{el.address}</td>
                        <td >{el.users.length}</td>
                    </tr>)}
                    </tbody>
                </table>
                <div className={'flex flex-col gap-[15px] mt-[10px]'}>
                    <CompanyForm onSubmit={onSubmitAddCompany} />
                    {selectValue.length===1&&<CompanyForm data={data.find(el=>el.id===selectValue[0])} onSubmit={onSubmitEditCompany}/>}
                    {data.length>0&&selectValue.length!==0&&<button
                        onClick={()=>removeCompanyHandle()}
                        className={'bg-red-200 border p-[5px]'}

                    >
                        Удалить компанию
                    </button>}
                </div>


            </div>
            {selectValue.length===1&&data.length>0&&<UsersTable currentCompany={data.find(el=>el.id===selectValue[0])||{} as ICompany} />}
        </div>
    );
};
