package com.chethanconstruction.media;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProjectMediaRepository extends JpaRepository<ProjectMedia, UUID> {
    List<ProjectMedia> findByProjectIdOrderByDisplayOrderAscCreatedAtDesc(UUID projectId);
    List<ProjectMedia> findByProjectIdAndStageOrderByDisplayOrderAscCreatedAtDesc(UUID projectId, MediaStage stage);
    Optional<ProjectMedia> findByProjectIdAndCoverTrue(UUID projectId);

    @Modifying
    @Query("UPDATE ProjectMedia m SET m.cover = false WHERE m.project.id = :projectId")
    void resetCoverForProject(@Param("projectId") UUID projectId);

    Optional<ProjectMedia> findByStorageKey(String storageKey);

    @Query("SELECT COALESCE(SUM(m.sizeBytes), 0) FROM ProjectMedia m")
    long getTotalStorageUsedBytes();
}
