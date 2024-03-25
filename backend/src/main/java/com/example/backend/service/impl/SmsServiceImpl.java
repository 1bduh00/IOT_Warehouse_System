package com.example.backend.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.backend.service.SmsService;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

/**
 * SmsServiceImpl
 */
@Service
public class SmsServiceImpl implements SmsService {

    @Value("${twilio.accountSid}")
    private String ACCOUNT_SID;

    @Value("${twilio.authToken}")
    private String AUTH_TOKEN;

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