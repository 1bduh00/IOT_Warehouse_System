import paho.mqtt.client as mqtt
import time
import json
import random


# MQTT server details
mqtt_broker = "172.210.194.63"
mqtt_port = 1883
topic_to_publish = "sensor_data"
message_interval_seconds = 10  # Set the interval between messages
temp = 20
hum = 60


# Callbacks
def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to MQTT Broker")
    else:
        print(f"Connection failed with code {rc}")

# Create MQTT client
client = mqtt.Client()

# Set on_connect callback
client.on_connect = on_connect

# Connect to MQTT broker
client.connect(mqtt_broker, mqtt_port, keepalive=60)

# Start the MQTT loop
client.loop_start()

# Continuous message sending loop
try:
    while True:
        data = {
            "temperature": round(random.uniform(temp-2,temp), 4),  # Random float between 20 and 30
            "humidity": round(random.uniform(hum-2,hum), 2),  # Random float between 40 and 60
        }
        
        json_message = json.dumps(data)
        client.publish(topic_to_publish, json_message)
        print(f"Published message: {json_message}")
        
        # Wait for the next interval
        time.sleep(message_interval_seconds)

        press = int(input("continue with temp : "))
        if press == 0 :
            temp = int(input("temp :"))
        

        press = int(input("continue with hum : "))
        if press == 0 :
            hum = int(input("hum :"))
        

except KeyboardInterrupt:
    print("User interrupted the script.")

finally:
    # Disconnect from the MQTT broker
    client.loop_stop()
    client.disconnect()
    print("Disconnected from MQTT Broker")
