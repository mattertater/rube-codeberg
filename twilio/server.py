from twilio.twiml.voice_response import VoiceResponse
from flask import Flask
import sys

app = Flask(__name__)

@app.route("/voice", methods=['GET', 'POST'])

def voice():
    resp = VoiceResponse()
    resp.say(sys.argv[1], voice='alice')
    return str(resp)

if __name__ == "__main__":
    app.run(debug=True)
