package com.example.backend.service.impl;

import org.eclipse.paho.client.mqttv3.*;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.example.backend.service.MqttService;

@Service
public class MqttServiceImpl implements MqttService {

    private SimpMessagingTemplate messagingTemplate;

    private String serverUri = "tcp://192.168.11.113:1883";
    private String clientId = "Id";

    // public MqttServiceImpl(String serverUri, String clientId) {
    // this.serverUri = serverUri;
    // this.clientId = clientId;
    // }

    public void sendMessage(String message) {
        try (MqttClient mqttClient = new MqttClient(this.serverUri, this.clientId)) {
            mqttClient.connect();

            MqttMessage mqttMessage = new MqttMessage(message.getBytes());
            mqttClient.publish("private_room", mqttMessage);

            mqttClient.disconnect();
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    @SendTo("/topic/data")
    public void receiveMessage() {
        try (MqttClient mqttClient = new MqttClient(serverUri, clientId)) {

            mqttClient.connect();

            mqttClient.subscribe("sensor_data", (t, msg) -> {
                String payload = new String(msg.getPayload());
                System.out.println("Received message on topic '" + t + "': " + payload);
                // messagingTemplate.convertAndSend("/topic/sensor-data", payload);
            });

            // Keep the application running or use a separate mechanism for asynchronous
            // listening
            Thread.sleep(Long.MAX_VALUE);

            mqttClient.disconnect();
        } catch (MqttException | InterruptedException e) {
            e.printStackTrace();
        }
    }

    // public static void main(String[] args) {

    // MqttServiceImpl mqttService = new MqttServiceImpl();

    // // Send a message
    // mqttService.sendMessage("Hello, MQTT!");

    // // // Receive messages (this will block the main thread)
    // // mqttService.receiveMessage();
    // }
}
