package com.wain.wainvotingbackend.repository;

import com.wain.wainvotingbackend.entity.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CadidateRepository extends JpaRepository<Candidate, Long> {
}
