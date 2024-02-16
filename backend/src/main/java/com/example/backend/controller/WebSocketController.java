package com.example.backend.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.service.MessageProcessoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class WebSocketController {

    private final MessageProcessoService messageProcessoService;

    @MessageMapping("/private-room")
    public void StartSendingMessage(String message) throws Exception {
        messageProcessoService.StartConnection();
    }
}
