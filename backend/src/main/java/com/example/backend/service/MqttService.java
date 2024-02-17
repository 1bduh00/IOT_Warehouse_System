package com.example.backend.service;

public interface MqttService {

    void sendMessage(String message);

    void receiveMessage();
}
