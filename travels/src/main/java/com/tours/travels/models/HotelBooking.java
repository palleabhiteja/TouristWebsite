// HotelBooking.java
package com.tours.travels.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "hotel_bookings")
@Data
@NoArgsConstructor
public class HotelBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;
    
    @Column(name = "check_in_date", nullable = false)
    private Date checkInDate;
    
    @Column(name = "check_out_date", nullable = false)
    private Date checkOutDate;
    
    @Column(name = "num_guests", nullable = false)
    private Integer numGuests;
    
    @Column(name = "total_amount", nullable = false)
    private BigDecimal totalAmount;
    
    @Column(name = "special_requests")
    private String specialRequests;
    
    @Column(nullable = false)
    private String status = "PENDING";
    
    @Column(name = "booking_date", updatable = false)
    private Date bookingDate = new Date();
}