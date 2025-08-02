package com.tours.travels.controllers;

import com.tours.travels.models.Contact;
import com.tours.travels.repositories.ContactRepository;
import com.tours.travels.models.dto.ContactDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @PostMapping
    public ResponseEntity<Contact> createContact(@RequestBody ContactDTO contactDTO) {
        Contact contact = new Contact();
        contact.setName(contactDTO.getName());
        contact.setMobile(contactDTO.getMobile());
        contact.setEmail(contactDTO.getEmail());
        contact.setMessage(contactDTO.getMessage());

        Contact savedContact = contactRepository.save(contact);
        return ResponseEntity.ok(savedContact);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Contact>> getAllContacts() {
        List<Contact> contacts = contactRepository.findAllByOrderByCreatedAtDesc();
        return ResponseEntity.ok(contacts);
    }
}
