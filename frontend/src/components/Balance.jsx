function Balance(props){
    return <div className="flex mt-2 ml-2">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="ml-4 font-semibold text-lg"> 
            Rs {props.balance}
        </div>
    </div>
}

export default Balance