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
  float temp = dht.readTemperature();
  float umid = dht.readHumidity();

  delay(2000);

  if (isnan(temp) || isnan(umid)) {
    Serial.println("Falha no sensor");
    return;
  }

  // Enviar os dados para o servidor Node.js local
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    // Definir o URL do servidor Node.js (substitua o IP pelo da sua máquina local)
    String serverUrl = "http://172.20.10.11:3000/save_data";

    // Usar a nova API que exige WiFiClient como parâmetro
    http.begin(client, serverUrl);

    // Configurar o tipo de conteúdo para o POST
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");

    // Dados a serem enviados
    String httpRequestData = "temperature=" + String(temp) + "&humidity=" + String(umid);

    // Enviar a requisição POST
    int httpResponseCode = http.POST(httpRequestData);

    // Verificar a resposta do servidor
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println(httpResponseCode);  // Código de resposta HTTP
      Serial.println(response);          // Resposta do servidor
    } else {
      Serial.print("Erro na requisição POST. Código: ");
      Serial.println(httpResponseCode);
    }

    http.end();  // Fechar a conexão
  } else {
    Serial.println("Erro de conexão Wi-Fi");
  }

  delay(10000);  // Intervalo de 10 segundos
}

