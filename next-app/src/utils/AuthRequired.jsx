'use client'

import { useState } from "react";
import { APIEndpoint } from "./api";
import { useRouter } from "next/navigation";
import { Card } from "flowbite-react";
import { Spinner } from "flowbite-react";

const AuthRequired = ({children}) => {

    const [verifying, setVerifying] = useState(false)
    const router = useRouter()
    // const verifyAPI = new APIEndpoint()
    // verifyAPI.post('verify/')
    // .then((res)=>{
    //     setVerifying(false)
    //     console.log("Successfully authenticated", res)
    // })
    // .catch((err)=>{
    //     router.push('/sign-in')
    //     console.log(err)
    // })

    function VerifyingCard(){
        return (
            <div className="w-full h-screen flex flex-col justify-center items-center">
                <Card>
                    <h1 className="text-center text-lg font-bold">SmartGro IOT</h1>
                    <h4 className="font-normal text-base">Verifying credentials please wait</h4>
                    <div className="flex flex-col justify-center items-center">
                        <Spinner aria-label="xl-spinner" size="xl" />
                    </div>
                    
                </Card>
            </div>
            
        )
    }

    return ( 
        <>

            {verifying ? <VerifyingCard /> : children}
        </>
        
     );
}
 
export default AuthRequired;