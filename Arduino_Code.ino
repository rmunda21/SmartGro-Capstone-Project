/*
   Простой пример, демонстрирующий основные функции измерения температуры, давления и влажности
*/

#include <Wire.h>
#include <WiFi.h>
#include "time.h"
#include "sntp.h"
#include "DHT.h"
#include <Adafruit_BMP280.h>
#include "GyverBME280.h"
#include "Adafruit_SGP40.h"
#include <PubSubClient.h>
#ifndef ARDUINOJSON_H
#include <ArduinoJson.h>

// #include <SoftwareSerial.h>  // INCLUDE SOFTWARESERIAL LIBRARY
// SoftwareSerial mySerial(35,33);  // PIN 35 = RX, PIN 33 = TX

#endif
WiFiClient espClient;
PubSubClient client(espClient);

GyverBME280 bme;
Adafruit_BMP280 bmp;
Adafruit_SGP40 sgp;

#define light_pin 2
#define photo_sensor_pin 34
#define pump_pin 17
#define moisture_pin 33
#define cooling_element 12
#define heating_element 13
#define DHTPIN 32
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

float temperature, pressure, Altitude, humidity, DHTTemp, H_Index;
float target_temp, target_moisture, target_N, target_P, target_K;
int light_intensity, moisture, moisture_perc;
const int light_threshold = 800;
const int WaterValue = 1100;  //Analogue reading when sensor is wet
const int AirValue = 2700;    //Analogue Reading when sensor is dry
char* cooling_status;
char* heating_status;
char* pump_status;
char* light_status;


int Raw;
int voc_index;

int Timestamp = 0, previousTimestamp = 0;

const char* ssid = "ANDRE3379";
const char* password = "891z2N|6";

// const char* mqtt_server = "broker.hivemq.com";
const char* mqtt_server = "mqtt.flespi.io";
const char* mqtt_SubTopic = "G_Pro_1";  // Replace with your ID number ex. 620012345_Project
const char* IDNumber = "G001";
const char* mqttUser = "8z5wLEG2qXPH1MtDJzYNTkzo7eFQELAwB9hSRO4FeajhoWMdcFu9gWgS3gLYk52w";
const char* mqttPassword = "";
const char* device_name = IDNumber;
const char* mqtt_PubTopic = IDNumber;

const char* ntpServer1 = "pool.ntp.org";
const char* ntpServer2 = "time.nist.gov";
const long gmtOffset_sec = 3600;
const int daylightOffset_sec = 3600;

const char* time_zone = "CET-1CEST,M3.5.0,M10.5.0/3";  // TimeZone rule for Europe/Rome including daylight adjustment rules (optional)
void reconnect();
void setup_wifi();
void callback(char* topic, byte* message, unsigned int length);
void transmit();
void cooling();
void heating();
void lighting();
void watering();
void nutrients();
void airquality();
void received();

void printLocalTime() {
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    Serial.println("No time available (yet)");
    return;
  }
  Serial.println(&timeinfo, "%A, %B %d %Y %H:%M:%S");
}

unsigned long getTime() {
  // RETURNS TIMESTAMP FOR CURRENT TIME FROM NTP SERVER
  time_t now;
  struct tm timeinfo;

  // get time from ntp server first and save to system
  if (!getLocalTime(&timeinfo)) {
    log_d("%s", "Failed to obtain time, NTP");
    return (0);
  }

  // Retrieve time[Timestamp] from system and save to &now variable
  time(&now);
  return now;
}

int TimeStamp(void) {
  // RETURNS TIMESTAMP FOR CURRENT TIME
  time_t now;

  // Retrieve time[Timestamp] from system and save to &now variable
  time(&now);
  Timestamp = (int)now;
  return now;
}

// Callback function (get's called when time adjusts via NTP)
void timeavailable(struct timeval* t) {
  Serial.println("Got time adjustment from NTP!");
  Serial.println("***SYNCHRONIZED***");
  printLocalTime();
}

void setup_wifi() {
  vTaskDelay(10 / portTICK_PERIOD_MS);  // delay 10 ms

  Serial.printf("\nConnecting to %s", ssid);  // We start by connecting to a WiFi network
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    vTaskDelay(500 / portTICK_PERIOD_MS);  // delay 500 ms
    Serial.print(".");
  }

  Serial.printf("\nWiFi connected! IP address: %s ", WiFi.localIP().toString().c_str());
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.println("\nAttempting MQTT connection...");

    // Attempt to connect
    if (client.connect("G_Pro_1", mqttUser, mqttPassword)) {
      Serial.println("Connected to MQTT server");
      // if (client.connect(IDNumber)) {
      //   Serial.println("MQTT connected");

      // Subscribe
      client.subscribe(mqtt_SubTopic);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 2 seconds");

      vTaskDelay(2000 / portTICK_PERIOD_MS);  // delay 2 second
    }
  }
}

void callback(char* topic, byte* message, unsigned int length) {

  char received[900] = { 0 };

  for (int i = 0; i < length; i++) {
    received[i] = (char)message[i];
  }

  // PRINT RECEIVED MESSAGE
  Serial.printf("Message received! \nTopic: %s \nPayload: %s\n", topic, received);

  DynamicJsonDocument doc(100);
  // Serial.println("Testing....1...");
  deserializeJson(doc, received);
  // Serial.println("Testing....2...");
  

  const char* type = doc["Type"];
  // Serial.println("Testing....3...");
  if (strcmp(type, "CropData") == 0) {

    const char* cropname = doc["CropName"];
    const float Temperature = doc["temperature"];
    const float rainfall = doc["rain"];
    const float potassium = doc["potassium"];
    const float nitrogen = doc["nitrogen"];
    const float phosphorus = doc["phosphorus"];
    target_temp = Temperature;
    target_moisture = map(rainfall, 45, 250, 0, 100);
    target_N = nitrogen;
    target_P = phosphorus;
    target_K = potassium;
    // doc.clear();
    // Serial.print("Crop Data: ");
    // Serial.println(target_temp);
    // Serial.print("SOil moisture: ");
    // Serial.println(target_moisture);
    // Serial.print("N: ");
    // Serial.println(target_N);
    // Serial.print("P: ");
    // Serial.println(target_P);
    // Serial.print("K: ");
    // Serial.println(target_K);
  }

  if (strcmp(type, "SWITCH") == 0) {
    // Serial.println("Testing..................");

    const char* Status = doc["status"];
    bool stat = doc["requested_state"];

    if (Status == "PUMPSTATUS" && stat == true) {
      Serial.println("Pump Running");
    }
    if (Status == "PUMPSTATUS" && stat == false) {
      Serial.println("Pump OFF");
    }

    if (Status == "LIGHTSTATUS" && stat == true) {
      Serial.println("Light ON");
    }
    if (Status == "LIGHTSTATUS" && stat == false) {
      Serial.println("Light OFF");
    }
  }
 
}


void setup() {
  pinMode(light_pin, OUTPUT);
  pinMode(cooling_element, OUTPUT);
  pinMode(heating_element, OUTPUT);
  pinMode(photo_sensor_pin, INPUT);
  pinMode(pump_pin, OUTPUT);
  pinMode(moisture_pin, INPUT);
  Wire.begin();  // join i2c bus (address optional for master)
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  Serial.begin(115200);
  // mySerial.begin(115200);   // OPEN SERIAL COMMUNICATION, SOFTWARE SERIAL,BAUD RATE = 115200
  // USE FOR ARDUINO TO SIGNAL BOARD COMMUNICATION
  bme.begin();

  if (!sgp.begin()) {
    Serial.println("SGP40 sensor not found :(");
    while (1)
      ;
  }

  dht.begin();
  // set notification call-back function
  sntp_set_time_sync_notification_cb(timeavailable);

  /**
   * NTP server address could be aquired via DHCP,
   *
   * NOTE: This call should be made BEFORE esp32 aquires IP address via DHCP,
   * otherwise SNTP option 42 would be rejected by default.
   * NOTE: configTime() function call if made AFTER DHCP-client run
   * will OVERRIDE aquired NTP server address
   */
  sntp_servermode_dhcp(1);  // (optional)

  /**
   * This will set configured ntp servers and constant TimeZone/daylightOffset
   * should be OK if your time zone does not need to adjust daylightOffset twice a year,
   * in such a case time adjustment won't be handled automagicaly.
   */
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer1, ntpServer2);

  /**
   * A more convenient approach to handle TimeZones with daylightOffset 
   * would be to specify a environmnet variable with TimeZone definition including daylight adjustmnet rules.
   * A list of rules for your zone could be obtained from https://github.com/esp8266/Arduino/blob/master/cores/esp8266/TZ.h
   */
  //configTzTime(time_zone, ntpServer1, ntpServer2);
  getTime();

  if (!bmp.begin(0x76)) {
    Serial.println(F("Could not find a valid BMP280 sensor, check wiring or try a different address!"));
    while (1) delay(10);
  }
}

void heating() {
  if (temperature < target_temp) {
    heating_status = "ON";
    digitalWrite(heating_element, HIGH);
    // Serial.println("heating ON");
  } else if (temperature > target_temp) {
    digitalWrite(heating_element, LOW);
    // Serial.println("Heating OFF");
    heating_status = "OFF";
  }
}

void cooling() {
  if (temperature > target_temp) {
    cooling_status = "ON";
    digitalWrite(cooling_element, HIGH);
    // Serial.println("Cooling ON");
  } else if (temperature < target_temp) {
    digitalWrite(cooling_element, LOW);
    // Serial.println("Cooling OFF");
    cooling_status = "OFF";
  }
}

void lighting() {
  light_intensity = analogRead(photo_sensor_pin);
  Serial.print("LDR = ");
  Serial.println(light_intensity);
  delay(500);
  if (light_intensity < light_threshold) {
    digitalWrite(light_pin, HIGH);
    light_status = "ON";
  } else {
    digitalWrite(light_pin, LOW);
    light_status = "OFF";
  }
}

void watering() {
  moisture = analogRead(moisture_pin);
  moisture_perc = map(moisture, AirValue, WaterValue, 0, 100);

  // delay(500);
  if (moisture_perc < 0) {
    moisture_perc = 0;
  }
  if (moisture_perc > 100) {
    moisture_perc = 100;
  }
  // Serial.print("Soil Moisture = ");
  // Serial.println(moisture_perc);
  if (moisture_perc < target_moisture) {
    digitalWrite(pump_pin, HIGH);
    pump_status = "ON";
  } else {
    digitalWrite(pump_pin, LOW);
    pump_status = "OFF";
  }
}

void airquality() {
  Raw = sgp.measureRaw(DHTTemp, humidity);
  // Serial.print("Raw measurement: ");
  // Serial.println(Raw);

  voc_index = sgp.measureVocIndex(DHTTemp, humidity);
  // Serial.print("Voc Index: ");
  // Serial.println(voc_index);
}

// void nutrients()
// {
//   if(mySerial.available())    // CHECKS IF SIGNAL BOARD SENT UNO/NANO ANY DATA
//   {
//     char received[500] = {0};                // BUFFER TO STORE INCOMING MESSAGES AS CHAR ARRAY
//     const int BUFFER_SIZE = 500;            //MAX SIZE EXPECTED FOR INCOMING MESSAGES
//     char buff[BUFFER_SIZE];                 //BUFFER USED TO STORE INCOMING MESSAGE AS BYTES
//     int rlen = mySerial.readBytesUntil('\n',buff,BUFFER_SIZE);  // READ INCOMING MESSAGE, STORE IN BUFF

//     for(int i = 0; i < rlen; i++)           // CONVERT MESSAGE FROM BYTES TO CHAR ARRAY
//     {
//       received[i] = (char)buff[i];
//     }
//     // PRINT RECIEVED MESSAGE. 'recieved' CAN THEN BE MANIPULATED TO DO ANYTHING USEFUL
//     Serial.print(received);
//     Serial.println();

//   }
// }
void transmit() {
  static int capacity = JSON_OBJECT_SIZE(50);
  DynamicJsonDocument json(capacity);

  char message[1000] = { 0 };
  json["TYPE"] = "SENSOR";
  json["ID"] = IDNumber;
  json["TIMESTAMP"] = Timestamp;
  json["TEMPERATURE"] = temperature;
  json["HEATINDEX"] = H_Index;
  json["HUMIDITY"] = humidity;
  json["AIRQUALITY"] = voc_index;
  json["NITROGEN"] = target_N;
  json["PHOSPHORUS"] = target_P;
  json["POTASSIUM"] = target_K;
  json["PRESSURE"] = pressure;
  json["SOILMOISTURE"] = moisture_perc;
  json["COOLINGSTATUS"] = cooling_status;
  json["HEATINGSTATUS"] = heating_status;
  json["LIGHTSTATUS"] = light_status;
  json["PUMPSTATUS"] = pump_status;


  serializeJson(json, message);
  json.clear();

  // Serial.println(message);
  // PUBLISH MESSAGE
  if ((Timestamp >= 167701500) && (Timestamp > previousTimestamp)) {

    client.publish(mqtt_PubTopic, message);
  }
  previousTimestamp = Timestamp;
  vTaskDelay(1000 / portTICK_PERIOD_MS);  // delay 1 second
}


void loop() {
  if (!client.connected()) {
    reconnect();
  }

  client.loop();

  // delay(5000);
  // printLocalTime();  // it will take some time to sync time :)
  Serial.println(TimeStamp());
  delay(1000);

  // Serial.print("Temperature BME: ");
  // Serial.print(bme.readTemperature());        // Выводим темперутуру в [*C]
  // Serial.println(" °C");

  temperature = bmp.readTemperature();
  // Serial.print("Temperature BMP: ");
  // Serial.print(temperature);
  // Serial.println(" °C");

  pressure = bmp.readPressure();
  // Serial.print("BME  Altitide: ");
  // Serial.print(pressureToAltitude(bme.readPressure())); // Выводим высоту в [м над ур. моря]
  // Serial.println(" m");

  humidity = dht.readHumidity();
  // Serial.print("Humidity: ");
  // Serial.print(humidity);
  // Serial.println(" %");

  DHTTemp = dht.readTemperature();
  // Serial.print("Temperature DHT: ");
  // Serial.print(DHTTemp);
  // Serial.println(" °C");

  H_Index = dht.computeHeatIndex(DHTTemp, humidity, false);
  // Serial.print(H_Index);
  // Serial.println(" °C");



  cooling();
  heating();
  lighting();
  watering();
  airquality();
  // nutrients();
  transmit();
}