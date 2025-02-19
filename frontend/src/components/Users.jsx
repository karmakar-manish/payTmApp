import { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Users(props)
{
    //replace with backend call
    const [users, setUsers] = useState([])  //an array of users
    const [filter, setFilter] = useState("")    //for filtering user data

    //add debouncing
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter)
            .then(response=>{
                setUsers(response.data.user)
            })
    }, [filter])

    return <div className="p-2">
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e)=>{setFilter(e.target.value)}} type="text" placeholder="Search Users...."
            className="w-full px-2 py-1 border border-slate-200 rounded"/>
        </div>
        <div>
            {/* maps through all the users state variable */}
            {users.map(user=> <User key={user._id} user={user}/>)}
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