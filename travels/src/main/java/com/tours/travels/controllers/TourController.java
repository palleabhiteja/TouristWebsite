package com.tours.travels.controllers;

import com.tours.travels.models.Tour;
import com.tours.travels.models.TourItinerary;
import com.tours.travels.models.dto.TourDTO;
import com.tours.travels.models.dto.TourItineraryDTO;
import com.tours.travels.repositories.TourRepository;
import com.tours.travels.repositories.TourItineraryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tours")
public class TourController {

    @Autowired
    private TourRepository tourRepository;

    @Autowired
    private TourItineraryRepository tourItineraryRepository;

    @GetMapping
    public List<Tour> getAllTours() {
        return tourRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tour> getTourById(@PathVariable Integer id) {
        Optional<Tour> tour = tourRepository.findById(id);
        return tour.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Tour createTour(@RequestBody TourDTO tourDTO) {
        Tour tour = new Tour();
        tour.setTitle(tourDTO.getTitle());
        tour.setDescription(tourDTO.getDescription());
        tour.setLocation(tourDTO.getLocation());
        tour.setDuration(tourDTO.getDuration());
        tour.setPrice(tourDTO.getPrice());
        tour.setContactInfo(tourDTO.getContactInfo());
        tour.setImageUrl(tourDTO.getImageUrl());
        return tourRepository.save(tour);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Tour> updateTour(@PathVariable Integer id, @RequestBody TourDTO tourDTO) {
        return tourRepository.findById(id)
                .map(existingTour -> {
                    existingTour.setTitle(tourDTO.getTitle());
                    existingTour.setDescription(tourDTO.getDescription());
                    existingTour.setLocation(tourDTO.getLocation());
                    existingTour.setDuration(tourDTO.getDuration());
                    existingTour.setPrice(tourDTO.getPrice());
                    existingTour.setContactInfo(tourDTO.getContactInfo());
                    existingTour.setImageUrl(tourDTO.getImageUrl());
                    return ResponseEntity.ok(tourRepository.save(existingTour));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteTour(@PathVariable Integer id) {
        return tourRepository.findById(id)
                .map(tour -> {
                    tourRepository.delete(tour);
                    return ResponseEntity.ok().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // New endpoints for itinerary management

    @GetMapping("/{id}/itinerary")
    public ResponseEntity<List<TourItinerary>> getTourItinerary(@PathVariable Integer id) {
        Tour tour = tourRepository.findById(id).orElseThrow();
        return ResponseEntity.ok(tourItineraryRepository.findByTour(tour));
    }

    @PostMapping("/{id}/itinerary")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TourItinerary> addItineraryItem(
            @PathVariable Integer id,
            @RequestBody TourItineraryDTO itineraryDTO) {

        Tour tour = tourRepository.findById(id).orElseThrow();

        TourItinerary itinerary = new TourItinerary();
        itinerary.setTour(tour);
        itinerary.setDayNumber(itineraryDTO.getDayNumber());
        itinerary.setTitle(itineraryDTO.getTitle());
        itinerary.setDescription(itineraryDTO.getDescription());

        return ResponseEntity.ok(tourItineraryRepository.save(itinerary));
    }

    @DeleteMapping("/itinerary/{itineraryId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteItineraryItem(@PathVariable Integer itineraryId) {
        tourItineraryRepository.deleteById(itineraryId);
        return ResponseEntity.ok().build();
    }
}
