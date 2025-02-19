import Heading from "../components/Heading"
import BottomWarning from "../components/BottomWarning"
import SubHeading from "../components/SubHeading"
import InputBox from "../components/InputBox"
import Button from "../components/Button"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


function Signin(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign in"}/>
                <SubHeading label={"Enter your credentials to access your account"}/>
                <InputBox label={"Email"} placeholder={"manish@gmail.com"} 
                onChange={(e)=>setUsername(e.target.value)}/>
                <InputBox label={"Password"} placeholder={"123456"}
                onChange={(e)=>setPassword(e.target.value)}/>

                <div className="pt-4">
                    <Button label={"Sign in"} onClick={async()=>{
                        const response = await axios.post("https://paytmapp-54gq.onrender.com/api/v1/user/signin", {
                            username,
                            password
                        })

                        //storing the token sent in the response
                        localStorage.setItem("token", response.data.token); //{key, value}

                        //navigate to the dashboard
                        navigate(`/dashboard`)
                    }}/>
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}/>
            </div>
        </div>
    </div>
}

export default Signin