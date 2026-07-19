package com.example.ProfileService.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Configuration
public class cloudconfig {
    
    @Value("${cloudinary.cloud_name}")
    private String cloudname;
    @Value("${cloudinary.api_key}")
    private String apikey;
    @Value("${cloudinary.api_secret}")
    private String apisecret;

    @Bean
    public Cloudinary cloudinary(){
        return new Cloudinary(ObjectUtils.asMap(
            "cloud_name",cloudname,
            "api_key",apikey,
            "api_secret",apisecret
        ));
    }
}
