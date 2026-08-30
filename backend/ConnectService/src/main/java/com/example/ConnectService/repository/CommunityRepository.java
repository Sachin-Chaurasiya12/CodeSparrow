package com.example.ConnectService.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ConnectService.model.Community;

@Repository
public interface CommunityRepository extends JpaRepository<Community, Long> {

}
