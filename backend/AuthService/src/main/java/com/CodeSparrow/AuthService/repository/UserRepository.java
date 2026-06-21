package com.CodeSparrow.AuthService.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.CodeSparrow.AuthService.model.Users;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {

    Optional<Users> findByUsername(String user);
    
    // Find user by email (for login)
    Optional<Users> findByEmail(String email);

    // Check if email already exists (for registration validation)
    boolean existsByEmail(String email);

    // Check if username already exists
    boolean existsByUsername(String username);
}
