window.onload = (event) => {

  console.log('page is fully loaded');

  var mqtt;
  var connected_flag = 0
  var reconnectTimeout = 2000;
  var pubtopic = "620108055_Project";       //Replace with your ID number ex. 620012345_lab3  
  var subtopic = "620108055";            //Replace with your ID number ex. 620012345. MQTT topic for subscribing to
  // var host                = "broker.hivemq.com";  // MQTT HOST
  var host = "www.yanacreations.com";  // MQTT HOST
  var port = 8883;                     // MQTT Port


  // var state = 12;
  /* HTML ELEMENT SELECTORS */
  // Query selector objects used to manipulate HTML elements
  let printMessage = document.querySelector("#messages");          // Query by HTML Element's id. Select <div> element
  let printStatus = document.querySelector("#status");
  let tempcard = document.querySelector(".temp");
  let temp_Ans = document.querySelector(".T_ans");
  let t_num1 = document.querySelector("#number");
  let pcard = document.querySelector(".Submitbtn");
  let p_Ans = document.querySelector(".p_ans");
  let p_num1 = document.querySelector("#number1");



  let Gauge_pressure = 0;
  let Humid_gauge = 0;
  let soil = 0;
  let temp = 0;
  let heatindex = 0;
  var value = 0;

  let elevationData = [];
  //  Temperature
  start = document.querySelector("#start");
  end = document.querySelector("#end");
  plotBtn = document.querySelector(".plot");
  // Humidity
  h_start = document.querySelector("#h_start");
  h_end = document.querySelector("#h_end");
  h_plotBtn = document.querySelector(".h_plot");
  g_humid = document.querySelector("#chart_div1");
  // g_humid.type="text/javascript";
  // g_humid.src="https://www.gstatic.com/charts/loader.js";
  // Heat Index
  hx_start = document.querySelector("#hx_start");
  hx_end = document.querySelector("#hx_end");
  hx_plotBtn = document.querySelector(".hx_plot");
  // Pressure
  p_start = document.querySelector("#p_start");
  p_end = document.querySelector("#p_end");
  p_plotBtn = document.querySelector(".p_plot");
  g_pressure = document.querySelector("#chart_div");
  g_pressure.type = "text/javascript";
  g_pressure.src = "https://www.gstatic.com/charts/loader.js";
  // Soil Moisture
  s_start = document.querySelector("#s_start");
  s_end = document.querySelector("#s_end");
  s_plotBtn = document.querySelector(".s_plot");




  tempcard.addEventListener("click", async () => {
    console.log("Temp convert submit Button clicked");

    // POST REQUEST 

    const URL = `/temp`;
    let data = { "number": t_num1.value }
    const response = await fetch(URL, { method: "POST", body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } });
    if (response.ok) {
      let res = await response.text();
      console.log(res);
      temp_Ans.innerHTML = res;
    }

  });

  pcard.addEventListener("click", async () => {
    console.log("Pressure convert submit Button clicked");

    // POST REQUEST 

    const URL = `/pressure`;
    let data = { "number1": p_num1.value }
    const response = await fetch(URL, { method: "POST", body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } });
    if (response.ok) {
      let res = await response.text();
      console.log(res);
      p_Ans.innerHTML = res;
    }

  });

  /*
   * Concept by Danny Iovane
   * https://codepen.io/gingerdude/pen/JXwgdK
   *
   * Modified by John Aleman
   */
  (function ($) {
    var timer = {};
    var currentPerc = 0;
    var totalPerc = 100;
    var percSegCount = 10;
    // var multiplier = Math.ceil(totalPerc / percSegCount);
    var maxSegIdx = Math.ceil(totalPerc / percSegCount);
    var currentIdx = 0;
    var prefix = 'water level-';

    var updateWaterLevelByPerc = updateWaterLevelByPerc;

    init();

    function init() {
      timer = initTimer();
    }

    function initTimer() {
      return setInterval(function () {
        var currentPrec = getCurrentPerc();
        updateWaterLevelByPerc(currentPrec);
        incSegmentIdx();
      }, 500);
    }

    function updateWaterLevelByPerc(perc) {
      var $loader = $('#loader');
      document.getElementById("W_percent").innerHTML = perc + "%";
      $loader.attr('class', ''); // clear class
      $loader.attr('class', prefix + perc);
    }

    function incSegmentIdx() {
      if (currentIdx >= maxSegIdx) {
        currentIdx = 0;
      } else {
        currentIdx++;
      }
    }

    function getCurrentPerc() {

      if (soil >= 100) {
        value = 100;
        return value;
      }
      else {
        value = soil;
        return value;
      }

    }

    function stopTimer() {
      clearInterval(timer);
    }
  })(jQuery);


  // load current chart package Pressure
  google.charts.load('current', {
    packages: ['corechart', 'gauge'],
  });

  // set callback function when api loaded
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    // create data object with default value
    let data = google.visualization.arrayToDataTable([
      ['Barometer'],
      [88.9],
    ]);

    // create options object with titles, colors, etc.
    let options = {

      title: 'Barometer kpa',

      hAxis: {
        textPosition: 'center',
      },
      vAxis: {
        title: 'Usage',
      },

      greenFrom: 75,
      greenTo: 140,
      yellowFrom: 45,
      yellowTo: 75,
      redFrom: 0,
      redTo: 45,

      max: 130,
      majorTicks:
        ["60", "70", "80", "90", "100", "110"],
      // units: "\k\P\a"
    };


    // draw chart on load
    let chart = new google.visualization.Gauge(
      document.getElementById('chart_div')
    );
    chart.draw(data, options);

    // max amount of data rows that should be displayed
    let maxDatas = 50;


    // interval for adding new data every 250ms
    let index = 0;
    setInterval(function () {
      // instead of this random, you can make an ajax call for the current cpu usage or what ever data you want to display
      let press = Gauge_pressure / 1000;

      console.log(press);



      if (data.getNumberOfRows() > maxDatas) {
        data.removeRows(0, data.getNumberOfRows() - maxDatas);
      }

      data.setValue(0, 0, press);

      chart.draw(data, options);

      index++;
    }, 1000);
  }
  // Heat Index Graph
  var gaugeHumid = new LinearGauge({
    renderTo: 'gauge-temperature',
    width: 150,
    height: 500,
    units: "Heat Index \xB0C",
    minValue: 0,
    startAngle: 90,
    ticksAngle: 180,
    maxValue: 60,
    colorValueBoxRect: "#049faa",
    colorValueBoxRectEnd: "#049faa",
    colorValueBoxBackground: "#f1fbfc",
    valueDec: 2,
    valueInt: 2,
    majorTicks: [
      "0",
      "5",
      "10",
      "15",
      "20",
      "25",
      "30",
      "35",
      "40",
      "45",
      "50",
      "55",
      "60"
    ],
    minorTicks: 4,
    strokeTicks: true,
    highlights: [{
      "from": 40,
      "to": 60,
      "color": "rgba(200, 50, 50, .75)"
    }],
    colorPlate: "#fff",
    colorBarProgress: "#CC2936",
    colorBarProgressEnd: "#049faa",
    borderShadowWidth: 0,
    borders: false,
    needleType: "arrow",
    needleWidth: 2,
    needleCircleSize: 7,
    needleCircleOuter: true,
    needleCircleInner: false,
    animationDuration: 1500,
    animationRule: "linear",
    barWidth: 10,
  }).draw();


  // Create Temperature/ Humidity Chart
  var chartT = new Highcharts.Chart({
    chart: {
      renderTo: 'chart-temperature'
    },
    series: [{
      name: 'Temperature (\xB0C)',
      type: 'spline',
      color: '#FF7878',
      marker: {
        symbol: 'circle',
        radius: 3,
        fillColor: '#FF7878',
      }
    },
    {
      name: 'Humidity (%)',
      type: 'spline',
      color: '#00A6A6',
      marker: {
        symbol: 'square',
        radius: 3,
        fillColor: '#00A6A6',
      }
    },
    ],
    title: {
      text: undefined
    },
    xAxis: {
      title: {
        text: 'Time'
      },
      type: 'datetime',
      dateTimeLabelFormats: {
        second: '%H:%M:%S'
      }
    },
    yAxis: {
      title: {
        text: 'Temperature & Humidity Levels'
      }
    },
    credits: {
      enabled: false
    }
  });




  /* MQTT FUNCTIONS  */
  onMessageArrived = (r_message) => {

    try {
      // Convert message received to json object
      let mssg = JSON.parse(r_message.payloadString);

      // Print json message to console(View in Browser Dev Tools)
      console.log(mssg);

      if (mssg.TYPE == "SENSOR") {
        // Update webpage 
        let timestamp = mssg.TIMESTAMP;
        let temperature = mssg.TEMPERATURE;
        heat = mssg.HEATINDEX;
        temp = mssg.TEMPERATURE;

        Gauge_pressure = mssg.PRESSURE;
        Humid_gauge = mssg.HUMID;

        soil = mssg.SOILMOISTURE;

        setInterval(function () {
          var x = timestamp;
          var y1 = temp;
          var y2 = Humid_gauge;
          gaugeHumid.value = heat;



          if (chartT.series[0].data.length > 40) {
            chartT.series[0].addPoint([x, y1], true, true, true);

          } else {
            chartT.series[0].addPoint([x, y1], true, false, true);
          }
          if (chartT.series[1].data.length > 40) {
            chartT.series[1].addPoint([x, y2], true, true, true);
          } else {
            chartT.series[1].addPoint([x, y2], true, false, true);
          }

        }, 2000);

      }
    }
    catch (error) {
      console.error(error);
    }


  }

  onConnectionLost = () => {
    console.log("connection lost");
    printMessage.classList.remove("mqttConnected");
    printMessage.classList.add("mqttdisconnected");
    setTimeout(connect, 3000);
  }


  onFailure = (message) => {
    console.log("Failed");
    printMessage.classList.remove("mqttConnected");
    printMessage.classList.add("mqttdisconnected");
    setTimeout(MQTTconnect, reconnectTimeout);
  }


  onConnected = (recon, url) => {
    console.log(" in onConnected " + recon);
  }

  onConnect = () => {
    // Once a connection has been made, make a subscription and send a message. 
    connected_flag = 1
    printMessage.classList.add("mqttConnected");
    printMessage.classList.remove("mqttDisconnected");
    console.log(`on Connect ${connected_flag}`);
    sub_topics();
  }


  makeid = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  var IDstring = makeid(12);

  MQTTconnect = () => {

    console.log(`connecting to  ${host}   ${port}`);
    mqtt = new Paho.MQTT.Client(host, port, IDstring);


    var options = {
      timeout: 3,
      onSuccess: onConnect,
      onFailure: onFailure,
      useSSL: true
    };

    mqtt.onConnectionLost = onConnectionLost;
    mqtt.onMessageArrived = onMessageArrived;
    mqtt.onConnected = onConnected;
    mqtt.connect(options);
    return false;


  }


  sub_topics = () => {
    console.log("Subscribing to topic = " + subtopic);
    mqtt.subscribe(subtopic);
    return false;
  }

  send_message = (msg) => {

    printStatus.innerHTML = "";
    if (connected_flag == 0) {
      out_msg = "<b style='color:red'> Not Connected so can't send </b>"
      console.log(out_msg);
      printStatus.innerHTML = out_msg;
      setTimeout(function () { printStatus.innerHTML = " "; }, 3000);
      return false;
    }
    else {
      // Send message                   
      var message = new Paho.MQTT.Message(msg);
      message.destinationName = pubtopic;
      mqtt.send(message);
      return true;
    }
  }

  // Connect to MQTT broker
  MQTTconnect();

};