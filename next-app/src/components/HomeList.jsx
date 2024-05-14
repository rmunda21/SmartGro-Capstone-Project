'use client'

import { APIEndpoint } from "@/utils/api";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Card } from "flowbite-react";

const HomeList = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isCropRecLoading, setCropRecLoading] = useState(true)
    const [userData, setUserData] = useState({})
    const [cropRec, setCropRec] = useState(null)

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

    const cropRecommendationAPI = new APIEndpoint()
    cropRecommendationAPI.get('crop_data/')
    .then((res)=>{
        setCropRec(res.data)
        console.log(res)
    })
    .catch(err=>console.log(err))
    .finally(()=>{
        setCropRecLoading(false)
    })

    function WelcomeUser({firstname="Guest", isLoading}){
        if (isLoading){
            return (
                <Skeleton className="w-3/4 h-[35px] rounded-lg" />
            )
        }
        else{
            return (
                <h1 className="text-2xl font-bold">Welcome back {firstname}, lets see how your crops are doing!</h1>
            )
        } 
    }

    function CropData({isLoading, cropType, quantity}){
        if (isLoading){
            return (
                <div className="flex flex-row flex-wrap gap-5">
                    <Skeleton className="flex-grow w-[250px] h-[105px] rounded-lg" />
                    <Skeleton className="flex-grow w-[250px] h-[105px] rounded-lg" />
                    <Skeleton className="flex-grow w-[250px] h-[105px] rounded-lg" />
                </div>            
            )
        }
        else{
            return (
                <div className="flex flex-row flex-wrap gap-5">
                    <Card className={`w-[350px] flex-grow bg-green-50 border-green-100`}>
                        <h4 className="font-bold text-slate-600 text-sm">Crop Type</h4>
                        <div className="flex flex-row justify-between items-center">
                            <p className="text-slate-500 text-3xl font-bold">{cropType ? cropType : "Mango"}</p>
                            <img width={32} src='/images/plant.png' alt="Crop Image" />
                        </div>
                    </Card>
                    <Card className={`w-[350px] flex-grow bg-light-blue-50 border-light-blue-100`}>
                        <h4 className="font-bold text-slate-600 text-sm">Quantity</h4>
                        <div className="flex flex-row justify-between items-center">
                            <p className="text-slate-500 text-3xl font-bold">{quantity ? quantity : "100"}</p>
                        </div>
                    </Card>
                </div>
            )
        }
    }

    function CropRecommendations({isLoading, cropData}){
        if (isLoading){
            return (
                <div className="flex flex-col flex-wrap gap-5">
                    <div className="flex flex-row flex-wrap gap-5">
                        <Skeleton className="flex-grow w-[250px] h-[105px] rounded-lg" />
                        <Skeleton className="flex-grow w-[250px] h-[105px] rounded-lg" />
                        <Skeleton className="flex-grow w-[250px] h-[105px] rounded-lg" />
                    </div>
                    <div className="flex flex-row flex-wrap gap-5">
                        <Skeleton className="flex-grow w-[250px] h-[105px] rounded-lg" />
                        <Skeleton className="flex-grow w-[250px] h-[105px] rounded-lg" />
                    </div>
                </div>            
            )
        }
        else{
            return(
                <div className="flex flex-col flex-wrap gap-5">
                    <div className="flex flex-row flex-wrap gap-5">
                        <Card className={`w-[350px] flex-grow bg-red-50 border-red-100`}>
                            <h4 className="font-bold text-slate-600 text-sm">{'Potassium(K) Kg/ha'}</h4>
                            <div className="flex flex-row justify-between items-center">
                                <p className="text-slate-500 text-3xl font-bold">{cropData ? cropData.K : "32"}</p>
                                <img width={32} src='/images/potassium.png' alt="Potassium Icon" />
                            </div>
                        </Card>
                        <Card className={`w-[350px] flex-grow bg-green-50 border-green-100`}>
                            <h4 className="font-bold text-slate-600 text-sm">{'Nitrogen(N) Kg/ha'}</h4>
                            <div className="flex flex-row justify-between items-center">
                                <p className="text-slate-500 text-3xl font-bold">{cropData ? cropData.N : "32"}</p>
                                <img width={32} src='/images/nitrogen.png' alt="Nitrogen Icon" />
                            </div>
                        </Card>
                        <Card className={`w-[350px] flex-grow bg-brown-50 border-brown-100`}>
                            <h4 className="font-bold text-slate-600 text-sm">{'Phosphorus(P) Kg/ha'}</h4>
                            <div className="flex flex-row justify-between items-center">
                                <p className="text-slate-500 text-3xl font-bold">{cropData ? cropData.P : "32"}</p>
                                <img width={32} src='/images/phosphorus.png' alt="Phosphorus Icon" />
                            </div>
                        </Card>
                    </div>
                    <div className="flex flex-row flex-wrap gap-5">
                        <Card className={`w-[350px] flex-grow bg-cyan-50 border-cyan-100`}>
                            <h4 className="font-bold text-slate-600 text-sm">{'Humidity(%)'}</h4>
                            <div className="flex flex-row justify-between items-center">
                                <p className="text-slate-500 text-3xl font-bold">{cropData ? cropData.humidity : "32"}</p>
                                <img width={32} src='/images/humidity.png' alt="Humidity Icon" />
                            </div>
                        </Card>
                        <Card className={`w-[350px] flex-grow bg-yellow-50 border-yellow-100`}>
                            <h4 className="font-bold text-slate-600 text-sm">{'Temperature(°C)'}</h4>
                            <div className="flex flex-row justify-between items-center">
                                <p className="text-slate-500 text-3xl font-bold">{cropData ? cropData.temperature : "32"}</p>
                                <img width={32} src='/images/temperature.png' alt="Humidity Icon" />
                            </div>
                        </Card>
                    </div>
                </div>
            )
        }
    }

    return ( 
        <div className="w-full flex flex-col gap-5">
            <WelcomeUser firstname={userData?.firstname} isLoading={isLoading} />
            <CropData isLoading={isLoading} />
            <h1 className="text-lg font-bold text-gray-600">Recommendations for Crop</h1>
            <CropRecommendations cropData={cropRec} isLoading={isCropRecLoading} />
        </div>
     );
}
 
export default HomeList;