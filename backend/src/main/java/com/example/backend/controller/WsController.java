package com.example.backend.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WsController {

    @MessageMapping("")
    public void StartRecievingMssg(String mssg) {

    }
}
