import axios from "axios"
import Heading from "../components/Heading.jsx";
import SubHeading from "../components/SubHeading.jsx";
import InputBox from "../components/InputBox.jsx";
import Button from "../components/Button.jsx";
import BottomWarning from "../components/BottomWarning.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup(){
    //state variables
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()    //for navigating to different URL

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"}/>
                <SubHeading label={"Enter your information to create an account"} />

                <InputBox label={"First Name"} placeholder={"Manish"} onChange={(e) => {
                    setFirstName(e.target.value)
                }}/>
                <InputBox label={"Last Name"} placeholder={"Karmakar"} onChange={(e)=>{
                    setLastName(e.target.value)
                }}/>
                <InputBox label={"Email"} placeholder={"manishxyz@gmail.com"} onChange={(e)=>{
                    setUsername(e.target.value)
                }}/>
                <InputBox label={"Password"} placeholder={"123456"} onChange={(e)=>{
                    setPassword(e.target.value)
                }}/>
                <div className="pt-4">
                    <Button label={"Sign up"} onClick={async()=>{
                        const response = await axios.post("https://paytmapp-54gq.onrender.com/api/v1/user/signup", {
                            username,
                            password,
                            firstName,
                            lastName
                        })

                        //we need to store the token sent in the response
                        //----------- store it in local storage --------------
                        localStorage.setItem("token", response.data.token)  //{key, value}
                        
                        //navigate to the dashboard
                        navigate("/dashboard");
                        
                    }}/>
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
            </div>
        </div>

    </div>
    
}


export default Signup;