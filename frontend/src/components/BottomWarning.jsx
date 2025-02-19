import { Link } from "react-router-dom"

function BottomWarning(props)
{
    return <div className="py-2 text-sm flex justify-center">
        <div>
            {props.label}
        </div>
        <Link className=" underline pl-1 cursor-pointer" to={props.to}>
            {props.buttonText}
        </Link>
    </div>
}

export default BottomWarning