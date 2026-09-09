package com.chethanconstruction.company;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CompanyProfileService {

    private final CompanyProfileRepository repository;

    @Transactional
    public CompanyProfile getOrCreateProfile() {
        return repository.findFirstByOrderByCreatedAtAsc()
                .orElseGet(() -> {
                    log.info("Initializing initial company profile with placeholders");
                    CompanyProfile initial = CompanyProfile.builder()
                            .companyName("Chethan Construction")
                            .tagline("Excellence in Architectural Design & Quality Construction")
                            .shortDescription("Premier construction, architectural engineering, and contracting services committed to precision, quality materials, and timely delivery.")
                            .fullDescription("Chethan Construction is a distinguished construction firm delivering modern residential structures, commercial developments, structural renovations, and civil contracting. We transform architectural blueprints into robust, sustainable, and aesthetically distinguished realities.")
                            .phone("+91 98765 43210")
                            .whatsapp("+91 98765 43210")
                            .email("contact@chethanconstruction.com")
                            .address("Bangalore, Karnataka, India")
                            .serviceArea("Bangalore, Mysore, and surrounding Karnataka districts")
                            .googleMapsUrl("https://maps.google.com")
                            .build();
                    return repository.save(initial);
                });
    }

    @Transactional(readOnly = true)
    public CompanyProfileDto getProfileDto() {
        return mapToDto(getOrCreateProfile());
    }

    @Transactional
    public CompanyProfileDto updateProfile(CompanyProfileDto dto) {
        CompanyProfile profile = getOrCreateProfile();
        profile.setCompanyName(dto.getCompanyName());
        profile.setTagline(dto.getTagline());
        profile.setShortDescription(dto.getShortDescription());
        profile.setFullDescription(dto.getFullDescription());
        profile.setPhone(dto.getPhone());
        profile.setWhatsapp(dto.getWhatsapp());
        profile.setEmail(dto.getEmail());
        profile.setAddress(dto.getAddress());
        profile.setServiceArea(dto.getServiceArea());
        profile.setGoogleMapsUrl(dto.getGoogleMapsUrl());
        profile.setLogoMediaId(dto.getLogoMediaId());
        profile.setHeroMediaId(dto.getHeroMediaId());

        CompanyProfile saved = repository.save(profile);
        return mapToDto(saved);
    }

    private CompanyProfileDto mapToDto(CompanyProfile profile) {
        return CompanyProfileDto.builder()
                .id(profile.getId())
                .companyName(profile.getCompanyName())
                .tagline(profile.getTagline())
                .shortDescription(profile.getShortDescription())
                .fullDescription(profile.getFullDescription())
                .phone(profile.getPhone())
                .whatsapp(profile.getWhatsapp())
                .email(profile.getEmail())
                .address(profile.getAddress())
                .serviceArea(profile.getServiceArea())
                .googleMapsUrl(profile.getGoogleMapsUrl())
                .logoMediaId(profile.getLogoMediaId())
                .heroMediaId(profile.getHeroMediaId())
                .updatedAt(profile.getUpdatedAt())
                .build();
    }
}
