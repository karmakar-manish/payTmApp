import { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Users()
{
    //replace with backend call
    const [users, setUsers] = useState([])  //an array of users
    const [filter, setFilter] = useState("")    //for filtering user input
    const [debouncedFilter, setDebouncedFilter] = useState("")    //stores the debounced input

    const [loading, setLoading] = useState(true)    //to show loading on screen

    //updates debouncedFilter after a delay
    useEffect(()=>{
        const handler = setTimeout(()=>{
            setDebouncedFilter(filter);
        }, 300) //300ms delay

        //cleanup function to clear previous timeout
        return () => clearTimeout(handler)
        
    }, [filter])    //runs whenever filter state variable changes


    useEffect(()=>{
        axios.get("https://paytmapp-54gq.onrender.com/api/v1/user/bulk?filter="+debouncedFilter)
            .then(response=>{
                setUsers(response.data.user)
                setLoading(false)   
            })
    }, [debouncedFilter])   //runs whenever debouncedFilter changes


    return <div className="p-2">
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e)=>{setFilter(e.target.value)}} type="text" placeholder="Search Users...."
            className="w-full px-2 py-1 border border-slate-200 rounded"/>
        </div>
        <div>
            {loading?(
                <div className="flex justify-center items-center h-16">
                    <div className="w-10 h-10 border-5 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                </div>  
            ) : (
                users.map(user=> <User key={user._id} user={user}/>)
            )}
        </div>
    </div>
}

function User(props){
    const navigate = useNavigate(); //go navigating to different route

    return <div className="flex justify-between">
        <div className="flex ">
            <div className="h-12 w-12 bg-slate-200 flex justify-center rounded-full mt-1 mr-2">
                <div className="flex flex-col justify-center text-xl">
                    {props.user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                {props.user.firstName} {props.user.lastName}
            </div>
        </div>
        <div className="flex flex-col justify-center h-full">
            <Button label={"Send Money"} onClick={(e)=>{
                //navigate to SendMoney.jsx route
                navigate(`/sendmoney?id=${props.user._id}&name=${props.user.firstName}`)
            }}/>
        </div>
    </div>
}

export default Users;