package com.chethanconstruction.media;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.net.URI;
import java.time.Duration;

@Slf4j
@Service
public class StorageService {

    private final String appBaseUrl;
    private final String bucket;
    private final String publicBaseUrl;
    private final boolean mockMode;
    private final S3Presigner s3Presigner;
    private final S3Client s3Client;

    public StorageService(
            @Value("${app.base-url:http://localhost:8080}") String appBaseUrl,
            @Value("${app.r2.endpoint}") String endpoint,
            @Value("${app.r2.access-key-id}") String accessKeyId,
            @Value("${app.r2.secret-access-key}") String secretAccessKey,
            @Value("${app.r2.bucket}") String bucket,
            @Value("${app.r2.region:auto}") String regionName,
            @Value("${app.r2.public-base-url}") String publicBaseUrl,
            @Value("${app.r2.mock-mode:false}") boolean mockMode
    ) {
        this.appBaseUrl = appBaseUrl != null ? appBaseUrl.replaceAll("/$", "") : "http://localhost:8080";
        this.bucket = bucket;
        this.publicBaseUrl = publicBaseUrl != null ? publicBaseUrl.replaceAll("/$", "") : "";

        // Detect if credentials are placeholders
        boolean isPlaceholder = accessKeyId == null || accessKeyId.isBlank()
                || accessKeyId.contains("placeholder") || accessKeyId.contains("change-me");

        this.mockMode = mockMode || isPlaceholder;

        if (!this.mockMode) {
            log.info("Configuring Cloudflare R2 / S3 client for bucket: {} at endpoint: {}", bucket, endpoint);
            AwsBasicCredentials credentials = AwsBasicCredentials.create(accessKeyId, secretAccessKey);
            StaticCredentialsProvider credsProvider = StaticCredentialsProvider.create(credentials);

            this.s3Client = S3Client.builder()
                    .endpointOverride(URI.create(endpoint))
                    .credentialsProvider(credsProvider)
                    .region(Region.of("auto"))
                    .build();

            this.s3Presigner = S3Presigner.builder()
                    .endpointOverride(URI.create(endpoint))
                    .credentialsProvider(credsProvider)
                    .region(Region.of("auto"))
                    .build();
        } else {
            log.info("StorageService initialized in MOCK MODE (offline local simulation enabled)");
            this.s3Client = null;
            this.s3Presigner = null;
        }
    }

    public String generateUploadPresignedUrl(String storageKey, String contentType, long sizeBytes, Duration expiration) {
        if (mockMode || s3Presigner == null) {
            log.info("[MOCK] Generated upload URL for key: {}", storageKey);
            return appBaseUrl + "/api/v1/mock-storage/upload?key=" + storageKey;
        }

        try {
            PutObjectRequest objectRequest = PutObjectRequest.builder()
                    .bucket(bucket)
                    .key(storageKey)
                    .contentType(contentType)
                    .contentLength(sizeBytes)
                    .build();

            PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
                    .signatureDuration(expiration)
                    .putObjectRequest(objectRequest)
                    .build();

            PresignedPutObjectRequest presignedRequest = s3Presigner.presignPutObject(presignRequest);
            return presignedRequest.url().toString();
        } catch (Exception e) {
            log.error("Failed to generate presigned upload URL for key: {}", storageKey, e);
            throw new RuntimeException("Could not generate presigned upload URL: " + e.getMessage(), e);
        }
    }

    public void deleteObject(String storageKey) {
        if (mockMode || s3Client == null) {
            log.info("[MOCK] Deleted storage object with key: {}", storageKey);
            return;
        }

        try {
            DeleteObjectRequest deleteRequest = DeleteObjectRequest.builder()
                    .bucket(bucket)
                    .key(storageKey)
                    .build();
            s3Client.deleteObject(deleteRequest);
            log.info("Successfully deleted object from R2: {}", storageKey);
        } catch (Exception e) {
            log.error("Failed to delete object from R2: {}", storageKey, e);
        }
    }

    public String getPublicUrl(String storageKey) {
        if (storageKey == null || storageKey.isBlank()) return null;
        if (storageKey.startsWith("http://") || storageKey.startsWith("https://")) {
            return storageKey;
        }
        if (mockMode || s3Client == null) {
            return appBaseUrl + "/api/v1/mock-storage/files/" + storageKey;
        }
        return publicBaseUrl + "/" + storageKey;
    }
}
