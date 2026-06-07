package com.example.ProfileService.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ProfileService.model.Profile;

@Repository
public interface ProfileRepository extends JpaRepository<Profile,Long>{
    Optional<Profile> findByUserId(Long userId);

    Optional<Profile> findByUsername(String username);

    boolean existsByUsername(String username);
}
