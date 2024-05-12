import { Card } from "flowbite-react";

const MyReadingsCard = ({heading, desc, reading, image_src}) => {
    return ( 
        <Card className="w-[350px] flex-grow">
           <h4 className="font-bold text-slate-600 text-sm">{heading}</h4>
           <div className="flex flex-row justify-between items-center">
                <p className="text-slate-500 text-3xl font-bold">{reading}</p>
                <img src={image_src} alt="Humidity" />
           </div>
           <p>{desc}</p>
        </Card>
     );
}
 
export default MyReadingsCard;