function Button(props)
{
    return <div>
        <button onClick={props.onClick} type="button" className="w-full cursor-pointer text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{props.label}</button>
    </div>
}
export default Button