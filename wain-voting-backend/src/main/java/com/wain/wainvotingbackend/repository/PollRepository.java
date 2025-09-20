package com.wain.wainvotingbackend.repository;

import com.wain.wainvotingbackend.entity.Poll;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Repository
public interface PollRepository extends JpaRepository<Poll, Long> {


    Page<Poll> findByCategoryId(Long categoryId, Pageable pageable);

    int countByCategoryId(Long categoryId);

    long countByStartTimeAfter(LocalDateTime now); // upcoming
    long countByStartTimeBeforeAndEndTimeAfter(LocalDateTime now1, LocalDateTime now2); // ongoing
    long countByEndTimeBefore(LocalDateTime now); // finished
    List<Poll> findByStartTimeAfterOrderByStartTimeAsc(LocalDateTime now);
}
