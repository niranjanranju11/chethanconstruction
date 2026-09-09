package com.chethanconstruction;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("dev")
class ChethanConstructionApplicationTests {

    @Test
    void contextLoads() {
        // Verifies Spring context, JPA repositories, and security beans load cleanly
    }
}
