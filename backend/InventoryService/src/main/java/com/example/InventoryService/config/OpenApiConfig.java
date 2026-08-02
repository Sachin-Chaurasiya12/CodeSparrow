package com.example.InventoryService.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class OpenApiConfig {
    
    @Bean
    public OpenAPI customeOpenAPI(){
        return new OpenAPI()
            .info(new Info()
            .title("CodeSparrow Inventory Service")
            .description("This is the service for Inventory")
            .version("v1.0")
            .contact(new Contact()
                        .name("CodeSparrow Team")
                        .email("support@codesparrow.com")
                    )
        );
    }
}
