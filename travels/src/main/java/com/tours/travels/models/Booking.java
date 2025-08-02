package com.tours.travels.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor

public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "tour_id", nullable = false)
    private Tour tour;
    
    @Column(nullable = false)
    private Date travelDate;
    
    @Column(nullable = false)
    private Integer numPersons;
    
    @Column(nullable = false)
    private BigDecimal totalAmount;
    
    @Column(nullable = false)
    private String status = "PENDING";
    
    @Column(updatable = false)
    private Date bookingDate = new Date();

    // @ManyToOne
    // @JoinColumn(name = "package_id", nullable = false)
    // private TourPackage tourPackage;
}