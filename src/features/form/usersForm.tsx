import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {IUsers, IUsersForm} from "../../interface/app.interface";


interface IProps {
    addUsers: (data: IUsersForm) => void;
    data?:IUsers;
}

export const UserForm = ({addUsers, data}: IProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const {register, handleSubmit, reset} = useForm<IUsersForm>({
        defaultValues:{
            name:data?.name,
            surname:data?.surname,
            status:data?.status,
        }
    });
    const onSubmitHandle = handleSubmit((data: IUsersForm) => {
        addUsers(data)
        setOpen(false)
        reset()
    });


    return (
        <div className={'w-full'}>
            {!open &&
                <button className={`bg-green-200 border disabled:bg-red-200 p-[5px] w-full ${data&&'bg-amber-200'}`}
                        onClick={() => setOpen(true)}
                >
                    {data?'Редактировать сотрудника':'Добавить сотрудника'}
                </button>}
            {open && <form onSubmit={onSubmitHandle} className={'flex flex-col gap-[10px]'}>
                <input className={'p-[5px] border border-amber-300'} {...register("name")} placeholder="Name"/>
                <input className={'p-[5px] border border-amber-300'} {...register("surname")} placeholder="Surname"/>
                <input className={'p-[5px] border border-amber-300'} {...register("status")} placeholder="Status"/>
                <button className={'w-full bg-green-200 border p-[5px] '} type="submit">Сохранить</button>
            </form>}
        </div>
    );
};
