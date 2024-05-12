'use client'

import MeterGauge from "./Meter";
import MeterCard from "./MeterCard";
import MyReadingsCard from "./ReadingCard";
import mqtt from 'mqtt';

// import connect from "../utils/test2"
import { useEffect, useState } from "react";

const ReadingList = () => {

    const [data, setData] = useState({})

    const MQTTconnect = () => {
        const url = "wss://mqtt.flespi.io:443"// MQTT HOST
        const client = mqtt.connect(url, {
            username: "8z5wLEG2qXPH1MtDJzYNTkzo7eFQELAwB9hSRO4FeajhoWMdcFu9gWgS3gLYk52w",
        })

        console.log(client)
    
        client.on('connect', () => {
            console.log("Connected")
            client.subscribe('G001')
        })
    
        client.on('message', (topic, payload) => {
            console.log(`Received message from ${topic} and ${payload}.`)
            if (topic === 'G001'){
                setData(JSON.parse(payload))
            }
        })
    }


    useEffect(()=>{
        MQTTconnect()
    },[])

    return ( 
        <div className="flex flex-col gap-6 flex-wrap">
            <div className="flex flex-row gap-6 flex-wrap">
                <MyReadingsCard heading={"Humidity(%)"} reading={data ? data.HUMIDITY : "34.5"} image_src={"/images/humidity.png"}/>
                <MyReadingsCard heading={"Temperature(°C)"} reading={data ? data.TEMPERATURE: "31"} image_src={"/images/temperature.png"}/>
                <MyReadingsCard heading={"Heat Index(°C)"} reading={data ? data.HEATINDEX:"34.5"} image_src={"/images/heat_index.png"}/>
                <MyReadingsCard heading={"Air Pressure(Pa)"} reading={data ? data.PRESSURE:"93234.5"} image_src={"/images/air_pressure.png"}/>
                <MyReadingsCard heading={"Soil Mositure(%)"} reading={data ? data.SOILMOISTURE:"34.5"} image_src={"/images/soil_moisture.png"}/>
            </div>
            <div className="flex flex-row gap-6 flex-wrap">
                <MeterCard heading={"Air Quality"} reading={data ? data.AIRQUALITY:80}/>
                {/* <SwitchCard heading={"Humidity(%)"} reading={data ? data.HUMIDITY : "34.5"} image_src={"/images/humidity.png"}/> */}
            </div>
        </div>
     );
}
 
export default ReadingList;