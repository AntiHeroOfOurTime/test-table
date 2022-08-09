import {useEffect, useState} from "react";


export const useSelect = <T extends { id: number }>(data:T[]) =>{
    const [selectValue,setSelect] = useState<number[]>([] as number[])
    const [allSelectValue,setAllSelect] = useState(false)
    useEffect(()=>{
        if (data.length===0)setSelect([])
        if (data.length!==selectValue.length)setAllSelect(false)
    },[data.length])
    useEffect(()=>{
        if (selectValue.length===data.length)setAllSelect(true)
        else setAllSelect(false)
    },[selectValue.length])
    const onSelect = (id:number) =>{
        setSelect(prevState => {
            if(selectValue.includes(id)) return [...prevState.filter(el=>el!==id)]
            else return [...prevState, id]
        })
    }
    const onAllSelect = () => {
        if (allSelectValue) {
            setAllSelect(false)
            setSelect([])
        } else {
            setSelect(data.map(el => el.id))
            setAllSelect(true)
        }
    }
    const clean = () =>{
        setSelect([]);
        setAllSelect(false)
    }
    return {allSelectValue, selectValue, onSelect, onAllSelect, clean}
}