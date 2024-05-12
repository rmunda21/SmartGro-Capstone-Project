import { Card } from "flowbite-react";
import { Skeleton } from "./ui/skeleton";

const MyReadingsCard = ({heading, desc, reading, image_src, isLoading, classname}) => {

   function LoadingSkeleton(){
      return (
         <Skeleton className="w-[150px] h-[35px] rounded-lg" />
      )
   }

   function CardData ({reading, image_src}){
      return (
         <div className="flex flex-row justify-between items-center">
               <p className="text-slate-500 text-3xl font-bold">{reading && Number(reading.toFixed(2))}</p>
               <img src={image_src} alt="Humidity" />
         </div>
      )
   }

    return ( 
        <Card className={`w-[350px] flex-grow ${classname}`}>
           <h4 className="font-bold text-slate-600 text-sm">{heading}</h4>
           { isLoading ? <LoadingSkeleton /> : <CardData reading={reading} image_src={image_src} />}
           <p>{desc}</p>
        </Card>
     );
}
 
export default MyReadingsCard;