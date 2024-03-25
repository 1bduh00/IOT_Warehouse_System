package com.example.backend.service.impl;

import org.springframework.stereotype.Service;

import com.example.backend.service.SmsService;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

/**
 * SmsServiceImpl
 */
@Service
public class SmsServiceImpl implements SmsService {

    private String ACCOUNT_SID = "AC6de7145b43a97784e742d746689a3c9b";
    private String AUTH_TOKEN = "789e605ae6a3be8a80feb386e6a9cc29";

    public SmsServiceImpl() {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
    }

    @Override
    public String sendSms(String SmsNumber, String mssg) {

        Message message = Message.creator(
                new com.twilio.type.PhoneNumber(SmsNumber),
                new com.twilio.type.PhoneNumber("+12512946433"),
                mssg)
                .create();

        return message.getStatus().toString();
    }

}