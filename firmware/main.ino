#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "Your_SSID";
const char* password = "Your_PASSWORD";
const char* mqtt_server = "broker.hivemq.com";

WiFiClient espClient;
PubSubClient client(espClient);

const int flowPins[3] = {34, 35, 32};
const int valvePins[3] = {5, 18, 19};
volatile int pulseCounts[3] = {0, 0, 0};
unsigned long lastSendTime = 0;

void IRAM_ATTR pulseCounter0() { pulseCounts[0]++; }
void IRAM_ATTR pulseCounter1() { pulseCounts[1]++; }
void IRAM_ATTR pulseCounter2() { pulseCounts[2]++; }

void setup_wifi() {
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);
}

void callback(char* topic, byte* payload, unsigned int length) {
  String command;
  for (int i = 0; i < length; i++) command += (char)payload[i];

  if (command == "ON1") digitalWrite(valvePins[0], HIGH);
  else if (command == "OFF1") digitalWrite(valvePins[0], LOW);
  else if (command == "ON2") digitalWrite(valvePins[1], HIGH);
  else if (command == "OFF2") digitalWrite(valvePins[1], LOW);
  else if (command == "ON3") digitalWrite(valvePins[2], HIGH);
  else if (command == "OFF3") digitalWrite(valvePins[2], LOW);
}

void reconnect() {
  while (!client.connected()) {
    if (client.connect("ESP32Client")) client.subscribe("greenhouse/control");
    else delay(5000);
  }
}

void setup() {
  for (int i = 0; i < 3; i++) {
    pinMode(valvePins[i], OUTPUT);
    pinMode(flowPins[i], INPUT_PULLUP);
  }
  attachInterrupt(digitalPinToInterrupt(flowPins[0]), pulseCounter0, FALLING);
  attachInterrupt(digitalPinToInterrupt(flowPins[1]), pulseCounter1, FALLING);
  attachInterrupt(digitalPinToInterrupt(flowPins[2]), pulseCounter2, FALLING);
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) reconnect();
  client.loop();

  if (millis() - lastSendTime > 1000) {
    lastSendTime = millis();
    char msg[100];
    snprintf(msg, 100, "{\"flow1\":%d,\"flow2\":%d,\"flow3\":%d}", pulseCounts[0], pulseCounts[1], pulseCounts[2]);
    client.publish("greenhouse/flow", msg);
    for (int i = 0; i < 3; i++) pulseCounts[i] = 0;
  }
}
