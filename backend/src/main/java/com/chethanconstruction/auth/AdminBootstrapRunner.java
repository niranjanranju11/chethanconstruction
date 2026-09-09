package com.chethanconstruction.auth;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class AdminBootstrapRunner implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.initial-email:admin@chethanconstruction.com}")
    private String initialEmail;

    @Value("${app.admin.initial-password:AdminPassword123!}")
    private String initialPassword;

    @Override
    public void run(String... args) {
        if (userRepository.countByRole(Role.ADMIN) == 0) {
            log.info("No admin user found. Bootstrapping default administrator: {}", initialEmail);
            User admin = User.builder()
                    .email(initialEmail.toLowerCase().trim())
                    .passwordHash(passwordEncoder.encode(initialPassword))
                    .role(Role.ADMIN)
                    .enabled(true)
                    .build();
            userRepository.save(admin);
            log.info("Default administrator created successfully with email: {}", initialEmail);
        } else {
            log.info("Administrator account already present. Skipping admin bootstrap.");
        }
    }
}
