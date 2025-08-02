package com.tours.travels.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "hotels")
@Data
@NoArgsConstructor
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    private String name;
    private String description;
    private String location;
    
    @Column(name = "price_per_night")
    private BigDecimal pricePerNight;
    
    @Column(name = "contact_info")
    private String contactInfo;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    private String amenities;
    private BigDecimal rating;
}