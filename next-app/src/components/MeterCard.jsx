import { Card } from "flowbite-react";
import MeterGauge from "./Meter";

const MeterCard = ({heading, desc, reading}) => {
    return ( 
        <Card className="w-[350px]">
           <h4 className="font-bold text-slate-600 text-sm">{heading}</h4>
           <div className="flex flex-row justify-between items-center">
                {/* <p className="text-slate-500 text-3xl font-bold">{reading}</p> */}
                <MeterGauge value={reading}/>
           </div>
           <p>{desc}</p>
        </Card>
     );
}
 
export default MeterCard;