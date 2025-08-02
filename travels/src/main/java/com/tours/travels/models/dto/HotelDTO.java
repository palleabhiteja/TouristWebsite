package com.tours.travels.models.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class HotelDTO {
    private String name;
    private String description;
    private String location;
    private BigDecimal pricePerNight;
    private String contactInfo;
    private String imageUrl;
    private String amenities;
    private BigDecimal rating;
}