import { useEffect, useRef, useState } from "react";


const PastedExcelInput = (props) => {
    const [pastedData, setPastedData] = useState('')
    const [validationWarning, setValidationWarning] = useState(false)
    const inputRef = useRef(null);


    const onPaste = (e) => {
        if (validation(e)) {
            setValidationWarning(false)
            props.warning(validationWarning)
            return setPastedData(e.target.value)
        }
        setValidationWarning(true)
        props.warning(validationWarning)
        return setPastedData('')
    };

    const validation = (e) => {
        let rows = e.target.value.split(' ')
            .map(row => {
                let cell = row.split('	')
                return cell;
            })
        let firstRow = [...rows[0]]
        const uniqueColumnsNamesValidation = new Set(firstRow)
        return uniqueColumnsNamesValidation.size === firstRow.length
    };

    useEffect(() => {
        props.data(pastedData)
    }, [pastedData, props])

    useEffect(() => {
        inputRef.current.focus();
    }, [])


    return (
        <>
            <div>you can easily create the plot you need, paste your excel data below and try it out!</div>
            <div className="get-input">
                <label htmlFor="getData">Paste Your Data from Excel Here: </label>
                <input ref={inputRef} id="getData" onChange={(e) => onPaste(e)} />
                {validationWarning && <div style={{ color: 'red' }}>Columns names must be unique</div>}
            </div>
        </>
    )
}

export default PastedExcelInput;