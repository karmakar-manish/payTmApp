function Appbar(props){
    return <div className="flex justify-between h-14 shadow">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                <div className="text-right">Hello</div>
                <div>{props.firstName} {props.lastName}</div>
            </div>
            <div className="bg-slate-200 rounded-full h-12 w-12 flex justify-center mt-1 mr-2 ">
                <div className="flex flex-col justify-center h-full text-xl">{props.firstName[0]}</div>
            </div>
        </div>
    </div>
}

export default Appbar