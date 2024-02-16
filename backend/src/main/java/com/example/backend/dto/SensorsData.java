package com.example.backend.dto;

import lombok.Data;

@Data
public class SensorsData {

    private String temperature;
    private String humidite;
    private String employees;

    public SensorsData(String t ,String h , String e){
        this.temperature = t;
        this.humidite = h;
        this.employees = e;

    }
}
