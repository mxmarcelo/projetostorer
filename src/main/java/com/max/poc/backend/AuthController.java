package com.max.poc.backend;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {

        String matricula = body.get("matricula");
        String senha = body.get("senha");

        // LOGIN FAKE (POC)
        if ("123".equals(matricula) && "123".equals(senha)) {

            return ResponseEntity.ok(
                Map.of(
                    "accessToken", "token-poc-123",
                    "permissoes", Map.of(
                        "podeBaterPontoOnline", true
                    )
                )
            );
        }

        return ResponseEntity
                .status(401)
                .body(Map.of(
                    "message", "Matrícula ou senha inválidas"
                ));
    }
}
@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowedMethods("*");
            }
        };
    }
}