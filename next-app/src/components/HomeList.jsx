'use client'

import { APIEndpoint } from "@/utils/api";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

const HomeList = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [userData, setUserData] = useState({})
    const userAPI = new APIEndpoint()
    userAPI.get('user/')
    .then((res)=>{
        setUserData(res.data)
        console.log(res)
    })
    .catch(err=>console.log(err))
    .finally(()=>{
        setIsLoading(false)
    })

    function WelcomeUser({firstname="Guest", isLoading}){
        if (isLoading){
            return (
                <Skeleton className="w-3/4 h-[35px] rounded-lg" />
                // <p>Loading please wait...</p>
            )
        }
        else{
            return (
                <h1 className="text-2xl font-bold">Welcome back {firstname}, lets see how your crops are doing!</h1>
            )
        } 
    }

    return ( 
        <div className="w-full flex flex-col">
            <WelcomeUser firstname={userData?.firstname} isLoading={isLoading} />
        </div>
     );
}
 
export default HomeList;