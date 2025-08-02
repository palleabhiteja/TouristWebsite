package com.tours.travels.models.dto;

import lombok.Data;

import java.util.Date;

@Data
public class HotelBookingRequest {
    private Integer hotelId;
    private Date checkInDate;
    private Date checkOutDate;
    private Integer numGuests;
    private String specialRequests;
}