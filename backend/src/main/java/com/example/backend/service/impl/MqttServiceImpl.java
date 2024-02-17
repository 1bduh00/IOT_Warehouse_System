package com.example.backend.service;

import org.eclipse.paho.client.mqttv3.*;

public class MqttService {

    private final String serverUri;
    private final String clientId;

    public MqttService(String serverUri, String clientId) {
        this.serverUri = serverUri;
        this.clientId = clientId;
    }

    public void sendMessage(String topic, String message) {
        try (MqttClient mqttClient = new MqttClient(serverUri, clientId)) {
            mqttClient.connect();

            MqttMessage mqttMessage = new MqttMessage(message.getBytes());
            mqttClient.publish(topic, mqttMessage);

            mqttClient.disconnect();
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    public void receiveMessage(String topic) {
        try (MqttClient mqttClient = new MqttClient(serverUri, clientId)) {

            mqttClient.connect();

            mqttClient.subscribe(topic, (t, msg) -> {
                String payload = new String(msg.getPayload());
                System.out.println("Received message on topic '" + t + "': " + payload);
            });

            // Keep the application running or use a separate mechanism for asynchronous
            // listening
            Thread.sleep(Long.MAX_VALUE);

            mqttClient.disconnect();
        } catch (MqttException | InterruptedException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        String serverUri = "tcp://192.168.11.113:1883"; // Update with your Mosquitto server URI
        String clientId = "1"; // Update with your desired client ID

        MqttService mqttService = new MqttService(serverUri, clientId);

        // Send a message
        mqttService.sendMessage("test_topic", "Hello, MQTT!");

        // Receive messages (this will block the main thread)
        mqttService.receiveMessage("test_topic");
    }
}
