import { useEffect, useState } from "react"
import Appbar from "../components/Appbar"
import Balance from "../components/Balance"
import Users from "../components/Users"
import axios from "axios"


//custom hook to fetch balance after every n seconds
function useFetchBalance(n)
{
    const [balance, setBalance] = useState(0) //state variable to store account balance

    useEffect(()=>{
        const fetchBalance = ()=> {
            axios.get("https://paytmapp-54gq.onrender.com/api/v1/account/balance", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }})
            .then(response => {
                setBalance(parseInt(response.data.balance))
            })
        }

        //fetch the balance initially
        fetchBalance();

        //fetch balance after every n sec
        const intervalId = setInterval(fetchBalance, n*1000)

        //anytime n changes, we want to clear the previous setTimeout
        return ()=>clearInterval(intervalId)

    },[n])

    return {balance}
}

function Dashboard(){
    const [firstName, setFirstname] = useState("")
    const [lastName, setLastname] = useState("")

    //fetch the firstname and lastname of the user
    useEffect(()=>{
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
    
    //get the balance from the custom hook
    const {balance} = useFetchBalance(10)
    
    return <div>
        <Appbar firstName={firstName} lastName={lastName}/>
        <Balance balance={balance}/>
        <Users/>
    </div>
}

export default Dashboard