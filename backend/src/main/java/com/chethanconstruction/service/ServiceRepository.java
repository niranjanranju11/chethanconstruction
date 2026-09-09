package com.chethanconstruction.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ServiceRepository extends JpaRepository<ConstructionService, UUID> {
    List<ConstructionService> findByPublishedTrueOrderByDisplayOrderAscCreatedAtDesc();
    List<ConstructionService> findAllByOrderByDisplayOrderAscCreatedAtDesc();
    Optional<ConstructionService> findBySlug(String slug);
    boolean existsBySlug(String slug);
}
