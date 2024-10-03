#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <DHT.h>
#include <DHT_U.h>

// Credenciais do Wi-Fi
const char* ssid = "iPhone de Lucas";
const char* password = "aaaaa123";

// Definições do sensor DHT
DHT dht(D2, DHT11);

WiFiClient client;  // Criar o objeto WiFiClient

void setup() {
  Serial.begin(9600);
  delay(10);

  // Conectar ao Wi-Fi
  Serial.println();
  Serial.print("Conectando-se a ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("Conexão estabelecida!");
  Serial.print("Endereço IP: ");
  Serial.println(WiFi.localIP());

  dht.begin();
}

void loop() {
// Aguarda entre as leituras do sensor
  delay(3000); // Atraso de 3 segundos

  // Lê a umidade e a temperatura
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  // Verifica se a leitura falhou e tenta novamente
  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Falha ao ler do sensor DHT!");
    return;
  }

  // Exibe as leituras no Monitor Serial
  Serial.print("Umidade: ");
  Serial.print(humidity);
  Serial.print(" %\t");
  Serial.print("Temperatura: ");
  Serial.print(temperature);
  Serial.println(" *C");
}

