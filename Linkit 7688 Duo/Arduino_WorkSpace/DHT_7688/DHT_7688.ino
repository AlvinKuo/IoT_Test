#include <DHT.h>

#define dht_dpin 2
#define DHTTYPE DHT11   // DHT 11
DHT dht(dht_dpin, DHTTYPE);

#define MT7688_Head 0x8E
#define Buffer_size 4

char Sensordata[Buffer_size] = {0};
char Sensor_checkSum = 0;
unsigned char CheckSum(unsigned int Length, char *buf);

void setup() {
  Serial.begin(115200); // open serial connection to USB Serial
  Serial1.begin(57600); // open internal serial connection to MT7688
  delay(300);
  dht.begin();
}

void loop() {
  // put your main code here, to run repeatedly:

  Sensordata[0] = MT7688_Head;
  Sensordata[1] = dht.readHumidity();
  Sensordata[2] = dht.readTemperature();
  Sensordata[3] = CheckSum(Buffer_size, Sensordata);

  Serial.write(Sensordata, Buffer_size);
  delay(50);
  Serial1.write(Sensordata, Buffer_size);
  delay(50);
  memset(Sensordata,0,Buffer_size);
  delay(1000);            //每1000ms更新一次
}


unsigned char CheckSum(unsigned int Length, char *buf)
{
  unsigned char ChkSUM = 0;
  unsigned int i = 0;
  for (i = 0; i < (Length - 1); i++) {
    ChkSUM = ChkSUM + (unsigned char)buf[i];
  }
  ChkSUM = (0xFF - ChkSUM) + 1;

  return ChkSUM;
}



