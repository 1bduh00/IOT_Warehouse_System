package com.example.backend.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.service.MqttService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class WsController {

    private MqttService mqttService;

    @MessageMapping("/private-room")
    public void StartRecievingMssg(String mssg) {
        mqttService.receiveMessage();
    }
}
