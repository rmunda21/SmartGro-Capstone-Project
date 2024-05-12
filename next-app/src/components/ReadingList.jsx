'use client'

import MeterGauge from "./Meter";
import MeterCard from "./MeterCard";
import MyReadingsCard from "./ReadingCard";
import SwitchCard from "./SwitchCard";
import mqtt from 'mqtt';

// import connect from "../utils/test2"
import { useEffect, useState } from "react";

const ReadingList = () => {

    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [mqttClient, setMqttClient] = useState(null)

    const MQTTconnect = () => {
        const url = "wss://mqtt.flespi.io:443"// MQTT HOST
        const client = mqtt.connect(url, {
            username: "8z5wLEG2qXPH1MtDJzYNTkzo7eFQELAwB9hSRO4FeajhoWMdcFu9gWgS3gLYk52w",
        })

        console.log(client)
    
        client.on('connect', () => {
            console.log("Connected")
            client.subscribe('G001')
            // client.publish('G_Pro_1', 'Are you seeing my message')
        })
    
        client.on('message', (topic, payload) => {
            console.log(`Received message from ${topic} and ${payload}.`)
            if (topic === 'G001'){
                setData(JSON.parse(payload))
                setIsLoading(false)
            }
        })
        return client
    }


    useEffect(()=>{
        setMqttClient(MQTTconnect())
    },[])

    return ( 
        <div className="flex flex-col gap-6 flex-wrap">
            <div className="flex flex-row gap-6 flex-wrap">
                <MyReadingsCard classname={"bg-cyan-50 border-cyan-100"} isLoading={isLoading} heading={"Humidity(%)"} reading={data ? data.HUMIDITY : "34.5"} image_src={"/images/humidity.png"}/>
                <MyReadingsCard classname={"bg-yellow-50 border-yellow-100"} isLoading={isLoading} heading={"Temperature(°C)"} reading={data ? data.TEMPERATURE: "31"} image_src={"/images/temperature.png"}/>
                <MyReadingsCard classname={"bg-red-50 border-red-100"} isLoading={isLoading} heading={"Heat Index(°C)"} reading={data ? data.HEATINDEX:"34.5"} image_src={"/images/heat_index.png"}/>
            </div>
            <div className="flex flex-row gap-6 flex-wrap">
                <MyReadingsCard classname={"bg-green-50 border-green-100"} isLoading={isLoading} heading={"Air Pressure(Pa)"} reading={data ? data.PRESSURE:"93234.5"} image_src={"/images/air_pressure.png"}/>
                <MyReadingsCard classname={"bg-brown-50 border-brown-100"} isLoading={isLoading} heading={"Soil Mositure(%)"} reading={data ? data.SOILMOISTURE:"34.5"} image_src={"/images/soil_moisture.png"}/>
            </div>
            <div className="flex flex-row gap-6 flex-wrap">
                <MyReadingsCard classname={"bg-red-50 border-red-100"} isLoading={isLoading} heading={"Potassium(K)"} reading={data ? data.POTASSIUM:"34.5"} image_src={"/images/potassium.png"}/>
                <MyReadingsCard classname={"bg-green-50 border-green-100"} isLoading={isLoading} heading={"Nitrogen(N)"} reading={data ? data.NITROGEN:"93234.5"} image_src={"/images/nitrogen.png"}/>
                <MyReadingsCard classname={"bg-brown-50 border-yellow-100"} isLoading={isLoading} heading={"Phosphorus(P)"} reading={data ? data.PHOSPHORUS:"34.5"} image_src={"/images/phosphorus.png"}/>
            </div>
            <div className="flex flex-row gap-6 flex-wrap">
                <MeterCard isLoading={isLoading} heading={"Air Quality"} reading={data ? data.AIRQUALITY : 80}/>
                <SwitchCard isLoading={isLoading} statuses={{
                    'HEATINGSTATUS': data.HEATINGSTATUS,
                    'COOLINGSTATUS': data.COOLINGSTATUS,
                    'LIGHTSTATUS': data.LIGHTSTATUS,
                    'PUMPSTATUS': data.PUMPSTATUS
                }}
                onToggle={mqttClient ? mqttClient : null}
                />
            </div>
        </div>
     );
}
 
export default ReadingList;