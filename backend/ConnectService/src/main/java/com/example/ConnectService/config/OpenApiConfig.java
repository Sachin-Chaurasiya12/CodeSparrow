package com.example.ConnectService.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class OpenApiConfig {
    
    @Bean
    public OpenAPI config(){
        return new OpenAPI()
            .info(new Info()
                .title("Connect Service")
                .description("This service consist the apis of connect feature in codecabinate")
        );
    }
}
