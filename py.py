import serial
import time
import os

ser = serial.Serial('COM8', 9600)

while True:
    line = ser.readline()
    if line:
        print line
        os.system('ps1.ps1')
        break
    time.sleep(1)
