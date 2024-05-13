'use client'

import { Card } from 'flowbite-react'
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"

const SwitchCard = ({onToggle, statuses, isLoading}) => {

   function LoadingSkeleton(){
      return (
         <div className="flex flex-col justify-center items-center">
            <Skeleton className="w-full h-[40px] rounded-lg m-5" />
            <Skeleton className="w-full h-[40px] rounded-lg m-5" />
            <Skeleton className="w-full h-[40px] rounded-lg m-5" />
            <Skeleton className="w-full h-[40px] rounded-lg m-5" />
         </div>
         
      )
   }

   function CardData ({statuses, handleToggle}){
      return (
         <div className="flex flex-col">
               <div className='flex flex-row justify-between p-5'>
                  <h4 className="font-bold text-slate-600 text-lg">Cooling Status</h4>
                  <Switch checked={statuses.COOLINGSTATUS === "ON" ? true : false} disabled/>
               </div>
               <div className='flex flex-row justify-between p-5'>
                  <h4 className="font-bold text-slate-600 text-lg">Heating Status</h4>
                  <Switch checked={statuses.HEATINGSTATUS === "ON" ? true : false} disabled/>
               </div>
               <div className='flex flex-row justify-between p-5'>
                  <h4 className="font-bold text-slate-600 text-lg">Light</h4>
                  <Switch checked={statuses.LIGHTSTATUS === "ON" ? true : false} onCheckedChange={()=>handleToggle("lighting",
                     statuses.LIGHTSTATUS === "ON" ? false : true
                  )} />
               </div>
               <div className='flex flex-row justify-between p-5'>
                  <h4 className="font-bold text-slate-600 text-lg">Pump</h4>
                  <Switch checked={statuses.PUMPSTATUS === "ON" ? true : false} onCheckedChange={()=>handleToggle("pump",
                     statuses.PUMPSTATUS === "ON" ? false : true
                  )} />
               </div>
            </div>
      )
   }

   const handleToggle = (status, state)=>{
      console.log(status, state)
      if (status === "lighting"){
         onToggle.publish('G_Pro_1', JSON.stringify({
            TYPE: "SWITCHSTATUS",
            status: "LIGHTSTATUS",
            requested_state: state
         }))
      }
      else{
         onToggle.publish('G_Pro_1', JSON.stringify({
            TYPE: "SWITCHSTATUS",
            status: "PUMPSTATUS",
            requested_state: state
         }))
      }
         
   }
    return ( 
        <Card className="w-[350px] flex-grow">
            <h4 className="font-bold text-slate-600 text-sm mb-auto">Status</h4>
            {isLoading ? <LoadingSkeleton /> : <CardData statuses={statuses} handleToggle={handleToggle} />}
            
            {/* <div className="flex flex-col">
               <div className='flex flex-row justify-between p-5'>
                  <h4 className="font-bold text-slate-600 text-lg">Cooling Status</h4>
                  <Switch checked={statuses.COOLINGSTATUS} disabled/>
               </div>
               <div className='flex flex-row justify-between p-5'>
                  <h4 className="font-bold text-slate-600 text-lg">Heating Status</h4>
                  <Switch checked={statuses.HEATINGSTATUS} disabled/>
               </div>
               <div className='flex flex-row justify-between p-5'>
                  <h4 className="font-bold text-slate-600 text-lg">Light Status</h4>
                  <Switch onCheckedChange={()=>handleToggle("lighting")} />
               </div>
               <div className='flex flex-row justify-between p-5'>
                  <h4 className="font-bold text-slate-600 text-lg">Pump Status</h4>
                  <Switch onCheckedChange={()=>handleToggle("pump")} />
               </div>
            </div> */}
            

        </Card>
     );
}

export default SwitchCard;