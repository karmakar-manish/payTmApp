import { useEffect, useState } from "react"
import Appbar from "../components/Appbar"
import Balance from "../components/Balance"
import Users from "../components/Users"
import axios from "axios"

function Dashboard(){
    const [amount, setAmount] = useState(0)
    const [firstName, setFirstname] = useState("")
    const [lastName, setLastname] = useState("")

    useEffect(()=>{
        //getting the balance of the user
        axios.get("https://paytmapp-54gq.onrender.com/api/v1/account/balance", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }})
            .then(response => {setAmount(parseInt(response.data.balance))})
        

        // //getting the fname and lname of user
        axios.get("https://paytmapp-54gq.onrender.com/api/v1/user/getuser", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response=>{
                setFirstname(response.data.firstName)
                setLastname(response.data.lastName)
            })
    }, [])
        

    return <div>
        <Appbar firstName={firstName} lastName={lastName}/>
        <Balance value={amount}/>
        <Users/>
    </div>
}

export default Dashboard