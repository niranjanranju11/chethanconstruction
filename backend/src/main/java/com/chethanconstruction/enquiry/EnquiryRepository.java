package com.chethanconstruction.enquiry;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface EnquiryRepository extends JpaRepository<Enquiry, UUID> {
    Page<Enquiry> findByStatus(EnquiryStatus status, Pageable pageable);
    long countByStatus(EnquiryStatus status);
}
