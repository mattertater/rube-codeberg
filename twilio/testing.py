from twilio.rest import Client

# Your Account SID from twilio.com/console
account_sid = "ACf29191e593b36f61191a0ae8b3c406e9"
# Your Auth Token from twilio.com/console
auth_token  = "4786efce33c6c6f6bf2a3b05a5e070c3"

client = Client(account_sid, auth_token)

message = client.messages.create(
    to="+13302830727",
    from_="+12342035704",
    body="Hello from Python!")

print(message.sid)
