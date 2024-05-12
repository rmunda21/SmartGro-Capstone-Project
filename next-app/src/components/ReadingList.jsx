import { useEffect, useState } from "react";
import MeterGauge from "./Meter";
import MeterCard from "./MeterCard";
import MyReadingsCard from "./ReadingCard";
import { APIEndpoint } from "@/utils/api";

const ReadingList = () => {

    const farmAPI = new APIEndpoint('...')
    const [data, setData] = useState({})

    return ( 
        <div className="flex flex-col gap-6 flex-wrap">
            <div className="flex flex-row gap-6 flex-wrap">
                <MyReadingsCard heading={"Humidity(%)"} reading={data.humidity} image_src={"/images/humidity.png"}/>
                <MyReadingsCard heading={"Temperature(°C)"} reading={"23.5"} image_src={"/images/temperature.png"}/>
                <MyReadingsCard heading={"Heat Index(°C)"} reading={"34.5"} image_src={"/images/heat_index.png"}/>
                <MyReadingsCard heading={"Air Pressure(Pa)"} reading={"93234.5"} image_src={"/images/air_pressure.png"}/>
                <MyReadingsCard heading={"Soil Mositure(%)"} reading={"34.5"} image_src={"/images/soil_moisture.png"}/>
            </div>
            <div className="flex flex-row gap-6 flex-wrap">
                <MeterCard heading={"Air Quality"} reading={80}/>
            </div> 
        </div>
     );
}
 
export default ReadingList;