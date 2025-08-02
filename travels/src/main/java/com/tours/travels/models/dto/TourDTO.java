package com.tours.travels.models.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class TourDTO {
    private String title;
    private String description;
    private String location;
    private String duration;
    private BigDecimal price;
    private String contactInfo;
    private String imageUrl;
}