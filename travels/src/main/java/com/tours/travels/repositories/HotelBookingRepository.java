// HotelBookingRepository.java
package com.tours.travels.repositories;

import com.tours.travels.models.HotelBooking;
import com.tours.travels.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HotelBookingRepository extends JpaRepository<HotelBooking, Integer> {
    List<HotelBooking> findByUser(User user);
}