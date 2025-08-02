package com.tours.travels.controllers;

import com.tours.travels.models.Hotel;
import com.tours.travels.models.HotelBooking;
import com.tours.travels.models.User;
import com.tours.travels.models.dto.HotelBookingRequest;
import com.tours.travels.models.dto.HotelDTO;
import com.tours.travels.repositories.HotelBookingRepository;
import com.tours.travels.repositories.HotelRepository;
import com.tours.travels.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/hotels")
public class HotelController {

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HotelBookingRepository hotelBookingRepository;

    @GetMapping
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hotel> getHotelById(@PathVariable Integer id) {
        Optional<Hotel> hotel = hotelRepository.findById(id);
        return hotel.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/hotel-bookings")
    public ResponseEntity<List<HotelBooking>> getUserHotelBookings(Authentication authentication) {
        try {
            String username = authentication.getName();
            User user = userRepository.findByEmail(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            List<HotelBooking> bookings = hotelBookingRepository.findByUser(user);
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Hotel createHotel(@RequestBody HotelDTO hotelDTO) {
        Hotel hotel = new Hotel();
        hotel.setName(hotelDTO.getName());
        hotel.setDescription(hotelDTO.getDescription());
        hotel.setLocation(hotelDTO.getLocation());
        hotel.setPricePerNight(hotelDTO.getPricePerNight());
        hotel.setContactInfo(hotelDTO.getContactInfo());
        hotel.setImageUrl(hotelDTO.getImageUrl());
        hotel.setAmenities(hotelDTO.getAmenities());
        hotel.setRating(hotelDTO.getRating());
        return hotelRepository.save(hotel);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Hotel> updateHotel(@PathVariable Integer id, @RequestBody HotelDTO hotelDTO) {
        return hotelRepository.findById(id)
                .map(existingHotel -> {
                    existingHotel.setName(hotelDTO.getName());
                    existingHotel.setDescription(hotelDTO.getDescription());
                    existingHotel.setLocation(hotelDTO.getLocation());
                    existingHotel.setPricePerNight(hotelDTO.getPricePerNight());
                    existingHotel.setContactInfo(hotelDTO.getContactInfo());
                    existingHotel.setImageUrl(hotelDTO.getImageUrl());
                    existingHotel.setAmenities(hotelDTO.getAmenities());
                    existingHotel.setRating(hotelDTO.getRating());
                    return ResponseEntity.ok(hotelRepository.save(existingHotel));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteHotel(@PathVariable Integer id) {
        return hotelRepository.findById(id)
                .map(hotel -> {
                    hotelRepository.delete(hotel);
                    return ResponseEntity.ok().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/book")
    public ResponseEntity<?> bookHotel(
            @RequestBody HotelBookingRequest bookingRequest,
            Authentication authentication) {
        
        try {
            String username = authentication.getName();
            User user = userRepository.findByEmail(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            Hotel hotel = hotelRepository.findById(bookingRequest.getHotelId())
                    .orElseThrow(() -> new RuntimeException("Hotel not found"));

            // Calculate duration in days
            long diffInMillis = bookingRequest.getCheckOutDate().getTime() - 
                            bookingRequest.getCheckInDate().getTime();
            long nights = TimeUnit.DAYS.convert(diffInMillis, TimeUnit.MILLISECONDS);

            // Calculate total amount
            BigDecimal totalAmount = hotel.getPricePerNight()
                    .multiply(BigDecimal.valueOf(nights))
                    .multiply(BigDecimal.valueOf(bookingRequest.getNumGuests()));

            // Create and save booking
            HotelBooking booking = new HotelBooking();
            booking.setUser(user);
            booking.setHotel(hotel);
            booking.setCheckInDate(bookingRequest.getCheckInDate());
            booking.setCheckOutDate(bookingRequest.getCheckOutDate());
            booking.setNumGuests(bookingRequest.getNumGuests());
            booking.setSpecialRequests(bookingRequest.getSpecialRequests());
            booking.setTotalAmount(totalAmount);
            
            HotelBooking savedBooking = hotelBookingRepository.save(booking);
            
            return ResponseEntity.ok(savedBooking);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Booking failed", "message", e.getMessage()));
        }
    }
}