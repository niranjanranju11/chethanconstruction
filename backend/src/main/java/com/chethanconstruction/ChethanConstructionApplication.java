package com.chethanconstruction;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class ChethanConstructionApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChethanConstructionApplication.class, args);
    }
}
