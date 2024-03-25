package com.example.backend.config;

import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.integration.channel.DirectChannel;
import org.springframework.integration.core.MessageProducer;
import org.springframework.integration.mqtt.core.DefaultMqttPahoClientFactory;
import org.springframework.integration.mqtt.core.MqttPahoClientFactory;
import org.springframework.integration.mqtt.inbound.MqttPahoMessageDrivenChannelAdapter;
import org.springframework.integration.mqtt.outbound.MqttPahoMessageHandler;
import org.springframework.integration.mqtt.support.DefaultPahoMessageConverter;
import org.springframework.integration.mqtt.support.MqttHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHandler;
import org.springframework.messaging.MessagingException;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import com.example.backend.service.SmsService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AllArgsConstructor;

@Configuration
@AllArgsConstructor
public class MqttConfig {

    private SimpMessagingTemplate messagingTemplate;
    private SmsService smsService;

    @Bean
    public MqttPahoClientFactory mqttClientFactory() {
        DefaultMqttPahoClientFactory factory = new DefaultMqttPahoClientFactory();
        MqttConnectOptions options = new MqttConnectOptions();

        options.setServerURIs(new String[] { "tcp://172.210.194.63:1883" });
        options.setCleanSession(true);

        factory.setConnectionOptions(options);

        return factory;
    }

    @Bean
    public MessageChannel mqttInputChannel() {
        return new DirectChannel();
    }

    @Bean
    public MessageProducer inbound() {
        MqttPahoMessageDrivenChannelAdapter adapter = new MqttPahoMessageDrivenChannelAdapter("serverIn",
                mqttClientFactory(), "#");

        adapter.setCompletionTimeout(5000);
        adapter.setConverter(new DefaultPahoMessageConverter());
        adapter.setQos(2);
        adapter.setOutputChannel(mqttInputChannel());
        return adapter;
    }

    @Bean
    @ServiceActivator(inputChannel = "mqttInputChannel")
    public MessageHandler handler() {
        return new MessageHandler() {
            @SuppressWarnings("null")
            @Override
            public void handleMessage(Message<?> message) throws MessagingException {
                String topic = message.getHeaders().get(MqttHeaders.RECEIVED_TOPIC).toString();
                if (topic.equals("sensor_data")) {
                    // Create an ObjectMapper instance
                    ObjectMapper objectMapper = new ObjectMapper();
                    String payload = (String) message.getPayload();
                    try {
                        JsonNode jsonNode = objectMapper.readTree(payload);

                        if (jsonNode.get("temperature").asInt() >= 20) {
                            System.out.println(
                                    smsService.sendSms("+212632458847",
                                            "Urgent : The temperature exceeded 30°C , with a value of :"
                                                    + jsonNode.get("temperature").asLong()));
                        }
                        if (jsonNode.get("humidity").asInt() >= 65) {
                            System.out.println(
                                    smsService.sendSms("+212632458847",
                                            "Urgent : The humidity exceeded 65% , with a value of :"
                                                    + jsonNode.get("humidity").asLong()));
                        }
                    } catch (Exception e) {
                        // View exception msg
                        System.out.println(e.getMessage());
                    }
                    messagingTemplate.convertAndSend("/topic/data", payload);
                } else if (topic.equals("room_open")) {
                    String payload = (String) message.getPayload();
                    System.out.println(payload);
                    messagingTemplate.convertAndSend("/topic/room_open", payload);
                }
            }
        };
    }

    @Bean
    public MessageChannel mqttOutboundChannel() {
        return new DirectChannel();
    }

    @Bean
    @ServiceActivator(inputChannel = "mqttOutboundChannel")
    public MessageHandler mqttOutbound() {
        // clientId is generated using a random number
        MqttPahoMessageHandler messageHandler = new MqttPahoMessageHandler("serverOut", mqttClientFactory());
        messageHandler.setAsync(true);
        messageHandler.setDefaultTopic("#");
        messageHandler.setDefaultRetained(false);
        return messageHandler;
    }

}