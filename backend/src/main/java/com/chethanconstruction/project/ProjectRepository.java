package com.chethanconstruction.project;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProjectRepository extends JpaRepository<Project, UUID>, JpaSpecificationExecutor<Project> {
    Optional<Project> findBySlug(String slug);
    Optional<Project> findBySlugAndPublishedTrue(String slug);
    boolean existsBySlug(String slug);

    List<Project> findTop6ByPublishedTrueAndFeaturedTrueOrderByCreatedAtDesc();

    @Query("SELECT p FROM Project p WHERE p.published = true " +
            "AND (:status IS NULL OR p.status = :status) " +
            "AND (:type IS NULL OR LOWER(p.projectType) = LOWER(:type)) " +
            "AND (:featured IS NULL OR p.featured = :featured) " +
            "AND (:search IS NULL OR LOWER(p.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(p.location) LIKE LOWER(CONCAT('%', :search, '%'))) " +
            "ORDER BY p.createdAt DESC")
    Page<Project> findPublishedProjects(
            @Param("status") ProjectStatus status,
            @Param("type") String type,
            @Param("featured") Boolean featured,
            @Param("search") String search,
            Pageable pageable);

    long countByStatus(ProjectStatus status);
    long countByPublishedTrue();
}
