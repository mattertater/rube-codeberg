import serial
import time
import os
from twilio.rest import Client
from twilio.twiml.voice_response import VoiceResponse
from flask import Flask
from subprocess import Popen, PIPE

# Your Account SID from twilio.com/console
account_sid = "COUNT_SID"
# Your Auth Token from twilio.com/console
auth_token  = "TH_TOKEN"
client = Client(account_sid, auth_token)

ser = serial.Serial('COM8', 9600)

while True:
    line = ser.readline()
    line = line.strip()
    line = line.replace('\\n','')
    if line is 'R' or 'B' or 'G':
        print 'Color detected...'
        number = raw_input('ROADBLOCK ENCOUNTERED: PLEASE ENTER YOUR PHONE NUMBER TO CONTINUE:')
        command = 'powershell.exe .\ps1.ps1 -color %s' % (line)
        print 'Thanks!'
        os.system(command)
        break
while True:
    line = ser.readline()
    line = line.strip()
    line = line.replace('\\n','')
    if line is 'x' or 'y' or 'z':
        print line
        if line is 'x':
            color = 'red'
        elif line is 'y':
            color = 'green'
        elif line is 'z':
            color = 'blue'
        saying = '\"Hello. The color was %s\"' % color
        command = 'server.py %s' % saying
        # launch webserver
        print command
        command = 'python %s' % command
        process = Popen(command)
        print 'Launching web server...'
        time.sleep(3)
        print 'Calling...'
        call = client.api.account.calls.create(
            to=number,
            from_="+12342035704",
            url="http://29010828.ngrok.io/voice")
        break
