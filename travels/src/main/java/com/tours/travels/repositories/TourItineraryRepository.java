package com.tours.travels.repositories;

import com.tours.travels.models.Tour;
import com.tours.travels.models.TourItinerary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TourItineraryRepository extends JpaRepository<TourItinerary, Integer> {
    List<TourItinerary> findByTour(Tour tour);
}