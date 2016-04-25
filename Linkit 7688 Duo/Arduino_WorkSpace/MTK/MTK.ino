
int led_pin = 13;
int in_pin = 2;
int read_value;


void setup() {
  Serial.begin(115200); // open serial connection to USB Serial
  //port(connected to your computer)
  Serial1.begin(57600); // open internal serial connection to
  //MT7688

  pinMode(led_pin, OUTPUT); // in MT7688, this maps to device
  pinMode(in_pin, INPUT);      // sets the digital pin 7 as input
}
void loop() {

  read_value = digitalRead(in_pin);
  digitalWrite(led_pin, read_value);

  if (!read_value)
  {
    Serial1.write(0);
    delay(50);
  }
//  else {
//    Serial1.write(0);
//    delay(50);
//  }



}
