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

    private String ACCOUNT_SID = "ACb47e0e62aef82cada008cb3831a09898";
    private String AUTH_TOKEN = "5d8758be95d170ca6daaf75f28a725c5";

    public SmsServiceImpl() {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
    }

    @Override
    public String sendSms(String SmsNumber, String mssg) {

        Message message = Message.creator(
                new com.twilio.type.PhoneNumber(SmsNumber),
                new com.twilio.type.PhoneNumber("+16265514340"),
                mssg)
                .create();

        return message.getStatus().toString();
    }

}