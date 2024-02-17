package com.example.backend.service;

public interface MqttService {

    void sendMessage(String topic, String message);

    void receiveMessage(String topic);
}
