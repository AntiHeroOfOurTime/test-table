import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {ICompany, ICompanyForm} from "../../interface/app.interface";


interface IProps {
    onSubmit:(data:ICompanyForm)=>void
    data?:ICompany;
}
export const CompanyForm = ({onSubmit, data}:IProps) => {
    const [open,setOpen] = useState<boolean>(false)
    const { register, handleSubmit, reset } = useForm<ICompanyForm>({
        defaultValues:{
            name:data?.name,
            address:data?.address
        }
    });
    const onSubmitHandle = handleSubmit((data:ICompanyForm) => {
        onSubmit(data)
        setOpen(false)
        reset()
    });

  return (
        <div className={'w-full'}>
            {!open&&<button className={`bg-green-200 border disabled:bg-red-200 p-[5px] w-full ${data&&'bg-amber-200'}`}
                            onClick={()=>setOpen(true)}
            >
                {data?'Редактировать компанию':'Добавить компанию'}
            </button>}
            {open&&<form onSubmit={onSubmitHandle} className={'flex flex-col gap-[10px] w-full '}>
                <input className={'p-[5px] border border-amber-300'} {...register("name")} placeholder="Name" />
                <input className={'p-[5px] border border-amber-300'}  {...register("address")} placeholder="Address" />
                <button type="submit" className={'w-full bg-green-200 border  disabled:bg-red-200 p-[5px] '} >Сохранить</button>
            </form>}
        </div>
    );
};
