#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <WiFiManager.h>

/*const char* ssid= "WiFi-Name";
const char* password= "WiFi-Pass";*/

String data = "";
/*  Enter The Names Of Stable sorrounding WiFi networks to read their strength*/
String saved_networks[] ={"WiFi1", "WiFi2",  "WiFi3", "WiFi4", "WiFi5","WiFi6", "WiFi7",  "WiFi8"    ,"WiFi9"}; 
String scanned_ssids[9];
int rssi_values[9];

int w_len = sizeof(saved_networks) / sizeof(saved_networks[0]);
int s_len = sizeof(scanned_ssids) / sizeof(scanned_ssids[0]);
int s_index = 0;          // index for scanned_ssids
int w_index = 0;          // index for saved_networks
int n = 0;                // number of scanned networks
void setup() {
  // put your setup code here, to run once:
  WiFi.disconnect();
  Serial.begin(9600);
  /* establish the connection to start sending strength values to the server  */
  /*WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while(WiFi.status()!=WL_CONNECTED)
  {  
    Serial.println("Connecting"); 
    delay(5000);
    }
  Serial.print("wifi_connected");*/
}

void loop() {
  /*  Read the strength of the scanned networks to be saved to the csv file*/
  n = WiFi.scanNetworks();
  saveValues();
 for (int i = 0; i < 9; i++){
    //Serial.print(scanned_ssids[i]);
    //Serial.print(" : ");
    Serial.print(rssi_values[i]);
    Serial.print(";");}
  Serial.println("x"); // label of the place
  /* Start sending the avlues to the server to be predicted */
  /*data = toJSON(rssi_values);
  Serial.println(data);
  postValues(data);
  delay(2000);*/
}

int postValues(String json) {
  WiFiClient ourClient;
  HTTPClient http; //Declare object of class HTTPClient
  http.begin(ourClient,"http://192.168.16.174:8000/post"); //Specify request destination
  http.addHeader("Content-Type", "application/json"); //Specify content-type header
  //http.addHeader("Content-Type",0); //Specify content-type header
  int httpCode = http.POST(json);//Send the request
  Serial.println(json);
  String payload = http.getString(); //Get the response payload
  Serial.println(payload);
  Serial.println(httpCode);
  return httpCode;
}

String toJSON(int arr[]) { 
    return String("{\"value\": ") + "[" + arr[0] + "," + arr[1] + "," + arr[2] + "," + arr[3] + "," + arr[4] + "," + arr[5] + "," + arr[6] + "," + arr[7] + "," + arr[8] +"]}";
  // return String("{\"value\": ") + "[" + arr[0] + "," + arr[1] + "," + arr[2] + "," + arr[3] + "," + arr[4] + "," + arr[5] + "," + arr[6] + "," + arr[7] + "," + arr[8] +"," + arr[9] +"," + arr[10] +"]}";
}

void saveValues()
{
  // Save SSIDs and RSSIs to array
  for (int i = 0; i < n; ++i)
  {
    // Check if the ssid exists in the saved networks
    s_index = findElement(saved_networks, w_len, WiFi.SSID(i));
    if (s_index != -1)
    {
      scanned_ssids[s_index] = WiFi.SSID(i);
      rssi_values[s_index] = WiFi.RSSI(i);
      rssi_values[s_index] = rssi_values[s_index] + 101;
    }
  }

  // Check if there's a network in saved and not scanned (Error while scanning)
  // So put it's RSSI = 0 (Take average later)
  for (int i = 0; i < w_len; i++)
  {
    w_index = findElement(scanned_ssids, w_len, saved_networks[i]);
    // If it is saved network and not scanned -> put rssi = 0
    if (w_index == -1)
    {
      scanned_ssids[i] = saved_networks[i];
      rssi_values[i] = 0;
    }
  }
}

int findElement(String arr[], int n, String val)
{
  int indx = -1;

  for (int i = 0; i < n; i++)
  {
    // if found -> 0 -> !0 = 1 = True
    if (val == String(arr[i]))
    {
      indx = i;
      break;
    }
  }
  return indx;
}
