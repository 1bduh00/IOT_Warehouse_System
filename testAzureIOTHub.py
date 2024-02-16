import asyncio
from azure.iot.device.aio import IoTHubDeviceClient
import random
import json
import time

async def send_telemetry(device_connection_string, telemetry_data):
    # Create an instance of the device client
    device_client = IoTHubDeviceClient.create_from_connection_string(device_connection_string)

    # Connect to Azure IoT Hub
    await device_client.connect()

    # Send telemetry data
    await device_client.send_message(telemetry_data)

    # Disconnect from Azure IoT Hub
    await device_client.disconnect()

if __name__ == "__main__":
    # Replace 'your_device_connection_string' with your actual device connection string
    device_connection_string = "HostName=Warehouse-hub.azure-devices.net;DeviceId=device1;SharedAccessKey=yTxsdpKSmFe8JP+El4aA5kk/r7pEgwW5qAIoTIPErVY="
    
    while True :
        telemetry_data = {
        "temperature": random.uniform(10.0, 50.0),
        "humidity": random.uniform(30.0, 80.0),
        "pressure": random.uniform(980.0, 1030.0),
        # Add more fields as needed
        }

        # Convert dictionary to JSON string
        telemetry_json = json.dumps(telemetry_data)

        asyncio.run(send_telemetry(device_connection_string, telemetry_json))
        
        time.sleep(5)