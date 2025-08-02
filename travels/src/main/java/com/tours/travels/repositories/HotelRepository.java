// hotelrepository.java
package com.tours.travels.repositories;

import com.tours.travels.models.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface HotelRepository extends JpaRepository<Hotel, Integer> {
}