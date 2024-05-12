import mqtt from 'mqtt';

var mqtt2;
var connected_flag = 0;
var reconnectTimeout = 2000;
var pubtopic = "G_Pro_1";       //Replace with your ID number ex. 620012345_lab3  
var subtopic = "G001";            //Replace with your ID number ex. 620012345. MQTT topic for subscribing to
var host = "broker.hivemq.com";  // MQTT HOST
// const url = "broker.emqx.io:1883"
const url = "wss://mqtt.flespi.io:443"// MQTT HOST
var port = 8883;
/* MQTT FUNCTIONS  */
// const onMessageArrived = (r_message) => {


//     try {
//         // const r_message = {
//         //     payloadString: '{"TYPE":"SENSOR","TIMESTAMP":"2022-01-01 12:00:00","TEMPERATURE":25,"HEATINDEX":28,"AIRQUALITY":80,"LIGHT":500,"HEATINGSTATUS":true,"COOLINGSTATUS":false,"PUMPSTATUS":true,"LIGHTSTATUS":false,"PRESSURE":1013,"HUMIDITY":60,"SOILMOISTURE":40}'
//         // };
//         // Convert message received to json object
//         let mssg = JSON.parse(r_message.payloadString);

//         // Print json message to console(View in Browser Dev Tools)
//         console.log(mssg);

//         if (mssg.TYPE == "SENSOR") {
//             // Update webpage 
//             let timestamp = mssg.TIMESTAMP;
//             let temperature = mssg.TEMPERATURE;
//             let heat = mssg.HEATINDEX;
//             let airquality = mssg.AIRQUALITY
//             let light = mssg.LIGHT;
//             let heating = mssg.HEATINGSTATUS;
//             let cooling = mssg.COOLINGSTATUS;
//             let pump = mssg.PUMPSTATUS;
//             let lighting = mssg.LIGHTSTATUS;
//             let Gauge_pressure = mssg.PRESSURE;
//             let Humid_gauge = mssg.HUMIDITY;
//             let soil = mssg.SOILMOISTURE;


//         }
//     }
//     catch (error) {
//         console.error(error);
//     }


// }

// const onConnectionLost = () => {
//     console.log("connection lost");
//     printMessage.classList.remove("mqttConnected");
//     printMessage.classList.add("mqttdisconnected");
//     setTimeout(connect, 3000);
// }


// const onFailure = (message) => {
//     console.log("Failed");
//     printMessage.classList.remove("mqttConnected");
//     printMessage.classList.add("mqttdisconnected");
//     setTimeout(MQTTconnect, reconnectTimeout);
// }


// const onConnected = (recon, url) => {
//     console.log(" in onConnected " + recon);
// }

// const onConnect = () => {
//     // Once a connection has been made, make a subscription and send a message. 
//     connected_flag = 1
//     printMessage.classList.add("mqttConnected");
//     printMessage.classList.remove("mqttDisconnected");
//     console.log(`on Connect ${connected_flag}`);
//     sub_topics();
// }


// const makeid = (length) => {
//     var result = '';
//     var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     var charactersLength = characters.length;
//     for (var i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
// }

// var IDstring = makeid(12);

const MQTTconnect = () => {


    const client = mqtt.connect(url, {
        username: "8z5wLEG2qXPH1MtDJzYNTkzo7eFQELAwB9hSRO4FeajhoWMdcFu9gWgS3gLYk52w",
        // password: ""
    })
    // const client = mqtt.connect('mqtts://broker.hivemq.com', {
    // port: 8883,
    // protocol: 'mqtts'
    // });
    console.log(client)

    client.on('connect', () => {
        console.log("Connected")
        client.subscribe('G001')
    })

    client.on('message', (topic, payload) => {
        console.log(`Received message from ${topic} and ${payload}.`)
    })
    // var client =  mqtt2.connect(host);
    // mqtt = Paho.MQTT.Client(host, port, IDstring);


    // var options = {
    //     timeout: 3,
    //     onSuccess: onConnect,
    //     onFailure: onFailure,
    //     useSSL: true
    // };

    // mqtt.onConnectionLost = onConnectionLost;
    // mqtt.onMessageArrived = onMessageArrived;
    // mqtt.onConnected = onConnected;
    // mqtt.connect(options);
    // return false;


}


// const sub_topics = () => {
//     console.log("Subscribing to topic = " + subtopic);
//     mqtt2.subscribe(subtopic);
//     return false;
// }

// const send_message = (msg) => {

//     printStatus.innerHTML = "";
//     if (connected_flag == 0) {
//         out_msg = "<b style='color:red'> Not Connected so can't send </b>"
//         console.log(out_msg);
//         printStatus.innerHTML = out_msg;
//         setTimeout(function () { printStatus.innerHTML = " "; }, 3000);
//         return false;
//     }
//     else {
//         // Send message                   
//         var message = new Paho.MQTT.Message(msg);
//         message.destinationName = pubtopic;
//         mqtt2.send(message);
//         return true;
//     }
// }

/**
 * Connects to the MQTT broker and performs necessary actions.
 */
export default function connect() {
    // Connect to MQTT broker
    MQTTconnect();
    // onMessageArrived(r_message);
    // // Subscribe to MQTT topic

    // mqtt2.on('r_message', onMessageArrived);
    // mqtt2.on('connect', onConnect);
    // mqtt2.on('reconnect', onConnect);
    // mqtt2.on('close', onConnectionLost);
    // mqtt2.on('error', onFailure);
}



