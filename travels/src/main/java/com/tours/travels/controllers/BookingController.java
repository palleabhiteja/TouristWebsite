package com.tours.travels.controllers;

import com.tours.travels.models.Booking;
import com.tours.travels.models.Tour;
import com.tours.travels.models.User;
import com.tours.travels.models.Hotel;
import com.tours.travels.models.dto.BookingRequest;
import com.tours.travels.models.dto.HotelBookingRequest;
import com.tours.travels.repositories.BookingRepository;
import com.tours.travels.repositories.TourRepository;
import com.tours.travels.repositories.UserRepository;
import com.tours.travels.repositories.HotelRepository;
import com.tours.travels.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TourRepository tourRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public ResponseEntity<?> getUserBookings(Authentication authentication) {
        try {
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication required");
            }

            String username = authentication.getName();
            User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

            return ResponseEntity.ok(bookingRepository.findByUser(user));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching bookings");
        }
    }

    @PostMapping
    public ResponseEntity<?> createBooking(
            @RequestBody BookingRequest bookingRequest,
            Authentication authentication) {

        try {
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication required");
            }

            String username = authentication.getName();
            User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

            Tour tour = tourRepository.findById(bookingRequest.getTourId())
                .orElseThrow(() -> new RuntimeException("Tour not found"));

            Date travelDate;
            try {
                if (bookingRequest.getTravelDate() instanceof String) {
                    travelDate = new SimpleDateFormat("yyyy-MM-dd").parse((String) bookingRequest.getTravelDate());
                } else {
                    travelDate = (Date) bookingRequest.getTravelDate();
                }
            } catch (Exception e) {
                return ResponseEntity.badRequest().body("Invalid date format. Use YYYY-MM-DD");
            }

            if (travelDate.before(new Date())) {
                return ResponseEntity.badRequest().body("Travel date must be in the future");
            }

            if (bookingRequest.getNumPersons() <= 0) {
                return ResponseEntity.badRequest().body("Number of persons must be positive");
            }

            Booking booking = new Booking();
            booking.setUser(user);
            booking.setTour(tour);
            booking.setTravelDate(travelDate);
            booking.setNumPersons(bookingRequest.getNumPersons());

            BigDecimal totalAmount = tour.getPrice().multiply(BigDecimal.valueOf(bookingRequest.getNumPersons()));
            booking.setTotalAmount(totalAmount);
            booking.setStatus("CONFIRMED");

            Booking savedBooking = bookingRepository.save(booking);
            return ResponseEntity.ok(savedBooking);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error creating booking: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelBooking(@PathVariable Integer id, Authentication authentication) {
        try {
            String username = authentication.getName();
            User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

            return bookingRepository.findById(id)
                .map(booking -> {
                    if (!booking.getUser().getId().equals(user.getId())) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Not authorized to cancel this booking");
                    }
                    booking.setStatus("CANCELLED");
                    bookingRepository.save(booking);
                    return ResponseEntity.ok().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error cancelling booking: " + e.getMessage());
        }
    }

    @PostMapping("/hotel")
    public ResponseEntity<?> createHotelBooking(
            @RequestBody HotelBookingRequest bookingRequest,
            Authentication authentication) {

        try {
            String username = authentication.getName();
            User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

            Hotel hotel = hotelRepository.findById(bookingRequest.getHotelId())
                .orElseThrow(() -> new RuntimeException("Hotel not found"));

            if (bookingRequest.getCheckInDate().after(bookingRequest.getCheckOutDate())) {
                return ResponseEntity.badRequest().body("Check-in date must be before check-out date");
            }

            return ResponseEntity.ok().body(
                    Map.of(
                        "message", "Hotel booking created",
                        "hotel", hotel.getName(),
                        "checkIn", bookingRequest.getCheckInDate(),
                        "checkOut", bookingRequest.getCheckOutDate(),
                        "guests", bookingRequest.getNumGuests(),
                        "user", user.getEmail()
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error creating hotel booking: " + e.getMessage());
        }
    }

    @GetMapping("/hotel")
    public ResponseEntity<?> getHotelBookings(Authentication authentication) {
        try {
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            String username = authentication.getName();
            User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

            // Placeholder logic for now
            List<Map<String, Object>> hotelBookings = new ArrayList<>();

            return ResponseEntity.ok(hotelBookings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error fetching hotel bookings: " + e.getMessage());
        }
    }
}