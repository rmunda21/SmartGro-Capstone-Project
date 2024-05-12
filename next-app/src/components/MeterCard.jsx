import { Card } from "flowbite-react";
import { Skeleton } from "./ui/skeleton";
import MeterGauge from "./Meter";

const MeterCard = ({heading, desc, reading, isLoading}) => {

   function LoadingSkeleton(){
      return (
         <div className="flex flex-col justify-center items-center">
            <Skeleton className="w-[220px] h-[220px] rounded-full" />
         </div>     
      )
   }

    return ( 
        <Card className="w-[350px]">
           <h4 className="font-bold text-slate-600 text-sm mb-auto">{heading}</h4>
                {isLoading ? <LoadingSkeleton /> : <div className="flex flex-row justify-between items-center"> <MeterGauge value={reading}/> </div>}
           <p>{desc}</p>
        </Card>
     );
}
 
export default MeterCard;