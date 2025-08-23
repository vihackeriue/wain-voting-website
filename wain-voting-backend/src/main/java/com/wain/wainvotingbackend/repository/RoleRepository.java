package com.wain.wainvotingbackend.repository;

import com.wain.wainvotingbackend.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {



    Optional<Role> findAllByName(String name);
}
