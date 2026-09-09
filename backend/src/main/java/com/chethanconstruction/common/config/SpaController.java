package com.chethanconstruction.common.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Forwards client-side React Router routes to index.html for unified single-container hosting.
 */
@Controller
public class SpaController {

    @GetMapping(value = {
            "/",
            "/about",
            "/services",
            "/services/**",
            "/projects",
            "/projects/**",
            "/contact",
            "/admin",
            "/admin/**"
    })
    public String forwardSpa() {
        return "forward:/index.html";
    }
}
