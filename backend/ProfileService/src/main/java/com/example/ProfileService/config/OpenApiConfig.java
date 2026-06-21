package com.example.ProfileService.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("CodeSparrow Profile Service API")
                        .version("1.0")
                        .description("Authentication microservice for CodeSparrow application")
                        .contact(new Contact()
                                .name("CodeSparrow Team")
                                .email("support@CodeSparrow.com")
                        )
                );
    }
}