import { useState, useCallback } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    // const reset = () => {
    //     setValue('')
    // }
    const reset = useCallback(() => setValue(""), []);


    return {
        type,
        value,
        onChange,
        reset
    }
}