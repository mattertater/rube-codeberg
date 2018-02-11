#include <FastLED.h>
#define NUM_LEDS 10
#define DATA_PIN 6
#include <Wire.h>
#include "Adafruit_TCS34725.h"
#define SWITCH_PIN 7

int switchstate = 0;
int lastswitchstate = 0;
bool isLightOn = false;
bool isLightDetected = false;

Adafruit_TCS34725 tcs = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_700MS, TCS34725_GAIN_1X);


CRGB leds[NUM_LEDS];
void setup() {
  FastLED.addLeds<TM1803, DATA_PIN>(leds, NUM_LEDS);
  pinMode(SWITCH_PIN, INPUT);
  Serial.begin(9600);
  if (tcs.begin()) {
    tcs.setInterrupt(true);
    //Serial.prSeintln("Found sensor");
  } else {
    //Serial.println("No TCS34725 found ... check your connections");
    while (1);
  }
  


}

void onRed() {
    for(int i = 0; i < 10; i++) {
    leds[i] = CRGB::Red;
    FastLED.show();
    leds[i] = CRGB::Black;
    delay(75);
  }
  isLightOn = true;
  //Serial.println("Lights are ON RED");


}

void onGreen() {
    for(int i = 0; i < 10; i++) {
    leds[i] = CRGB::Blue;
    FastLED.show();
    leds[i] = CRGB::Black;
    delay(75);
  }
  isLightOn = true;
  //Serial.println("Lights are ON GREEN");


}

void onBlue() {
    for(int i = 0; i < 10; i++) {
    leds[i] = CRGB::Green;
    FastLED.show();
    leds[i] = CRGB::Black;
    delay(75);
  }
  isLightOn = true;
  //Serial.println("Lights are ON BLUE");


}

void off() {
  for(int i = 0; i < 10; i++) {
    leds[i] = CRGB::Black;
  }
  FastLED.show();
  isLightOn = false;
  isLightDetected = false;
  //Serial.println("Lights are OFF");
}


void onRedLightDetected() {
  FastLED.show();
  isLightDetected = true;
  Serial.println("R");
}

void onGreenLightDetected() {
  FastLED.show();
  isLightDetected = true;
  Serial.println("G");
}

void onBlueLightDetected() {
  FastLED.show();
  isLightDetected = true;
  Serial.println("B");
}
void loop() {

  uint16_t r, g, b, c, colorTemp, lux;
  tcs.getRawData(&r, &g, &b, &c);
  //colorTemp = tcs.calculateColorTemperature(r, g, b);
  //lux = tcs.calculateLux(r, g, b);
  //Serial.print("Color Temp: "); Serial.print(colorTemp, DEC); Serial.print(" K - ");
  //Serial.print("Lux: "); Serial.print(lux, DEC); Serial.print(" - ");
  //Serial.print("R: "); Serial.print(r, DEC); Serial.print(" ");
  //Serial.print("G: "); Serial.print(g, DEC); Serial.print(" ");
  //Serial.print("B: "); Serial.print(b, DEC); Serial.print(" ");
  //Serial.print("C: "); Serial.print(c, DEC); Serial.print(" ");
  //Serial.println(" ");

  //Check if the light is on and has not been detected yet
  if ((r > 500 || g > 500 || b > 500) && isLightDetected == false) {
    //Check if light is red
    if (r > 6000 && g < 1000 && b < 1000) {
      onRedLightDetected();
    }
    //Check if light is green
    else if (r < 1000 && g > 3000 && b > 1000) {
      onGreenLightDetected();
    }
    //Check if light is blue
    else if (r < 1000 && g > 500 && g < 2000 && b > 3000) {
      onBlueLightDetected();
    }
  }
  
  lastswitchstate = switchstate;
  switchstate = digitalRead(SWITCH_PIN);

  //Check if the switch state changed
  if (lastswitchstate != switchstate) {
    //Pulse Green if its now on
    if (switchstate == 1) {
      onBlue();
    }
    else if (switchstate == 0) {
      off();
    }
  }
  delay(700);
}


