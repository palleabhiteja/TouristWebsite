package com.tours.travels.models.dto;

import java.util.Date;

public class BookingRequest {
    private Integer tourId;
    private Object travelDate; // Can accept both String and Date
    private Integer numPersons;

    // Getters and Setters
    public Integer getTourId() {
        return tourId;
    }

    public void setTourId(Integer tourId) {
        this.tourId = tourId;
    }

    public Object getTravelDate() {
        return travelDate;
    }

    public void setTravelDate(Object travelDate) {
        this.travelDate = travelDate;
    }

    public Integer getNumPersons() {
        return numPersons;
    }

    public void setNumPersons(Integer numPersons) {
        this.numPersons = numPersons;
    }
}