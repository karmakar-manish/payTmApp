import { useNavigate, useSearchParams } from "react-router-dom";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import { useState } from "react";
import axios from "axios";
import { number } from "zod";

function SendMoney()
{
    //a hook that allows to read query parameters from the URL.
    const [searchParams] = useSearchParams()   
    const id = searchParams.get("id");  //get the id from the URL
    const name = searchParams.get("name")   //get the name from URL
    const [amount, setAmount] = useState(0);    //amount state variable

    const navigate = useNavigate();

    return <div className="flex justify-center h-screen bg-gray-200">
        <div className="flex flex-col justify-center h-full">
            <div className="border h-min text-card-foreground max-w-md p-4 bg-white rounded-lg text-center space-y-8 w-96 shadow-lg">
                <Heading label={"Send Money"}/>
                <div className="p-6">
                    <div className="flex items-center space-x-4">
                        <div className="bg-green-500 w-12 h-12 rounded-full flex justify-center">
                            <div className="flex flex-col justify-center text-2xl text-white">{name[0].toUpperCase()}</div>
                        </div>
                        <h3 className="font-semibold text-2xl">{name}</h3>
                    </div>

                <div className="space-y-4">
                    <div className="mt-1">
                        <InputBox label={"Amount (in Rs)"} placeholder={"Enter Amount"} inputMode="numeric"
                        pattern="[0-9]*" 
                        onChange={(e)=>{
                                const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
                                setAmount(value)
                            }}
                        />
                    </div>
                    <div>
                        <button className="bg-green-500 text-white text-md cursor-pointer font-medium rounded-md h-10 w-full "
                        onClick={()=>{
                            axios.post("https://paytmapp-54gq.onrender.com/api/v1/account/transfer", {
                                to:id,
                                amount: amount
                            }, {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("token")    //send the jwt token in header
                                }
                            })

                            //navigate to dashboard
                            navigate("/dashboard")
                        }}>Initiate Transfer</button>
                    </div>
                </div>

                </div>
            </div>
        </div>
    </div>
}   

export default SendMoney;