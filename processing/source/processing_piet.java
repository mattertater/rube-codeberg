import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class processing_piet extends PApplet {

PImage template, piet;
int a = 0;

public void setup() {
  
  template = loadImage("template.png");
  piet = createImage(13, 13, RGB);
  template.loadPixels();
  piet.loadPixels();
  for (int i = 0; i < piet.pixels.length; i++) {
    piet.pixels[i] = color(255);
  }
  piet.updatePixels();
  image(piet, 0, 0);
}

public void draw() {
  if (a < 169) {
    piet.pixels[a] = template.pixels[a];
    a++;
  }
  else {
    piet.save("..\\piet\\piet.png");
    delay(10000);
    exit();
  }
    
  piet.updatePixels();
  image(piet, 0, 0);
  delay(25);
}
  public void settings() {  size(13, 13); }
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "processing_piet" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
