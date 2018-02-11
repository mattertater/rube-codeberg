PImage template, piet;
int a = 0;

void setup() {
  size(96, 96);
  template = loadImage("template.png");
  piet = createImage(96, 96, RGB);
  template.loadPixels();
  piet.loadPixels();
  for (int i = 0; i < piet.pixels.length; i++) {
    piet.pixels[i] = color(255);
  }
  piet.updatePixels();
  image(piet, 0, 0);
}

void draw() {
  if (a < 9216) {
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
}