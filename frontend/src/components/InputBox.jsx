import { useState } from "react"

function InputBox(props)
{
    return <div>
        <div className="text-sm font-medium text-left py-2">
            {props.label}
        </div>
        {/* any time the input changes  */}
        <input placeholder={props.placeholder} onChange={props.onChange}
        className="w-full px-2 py-1 border border-gray-300 rounded-sm"/>
    </div>
}

export default InputBox