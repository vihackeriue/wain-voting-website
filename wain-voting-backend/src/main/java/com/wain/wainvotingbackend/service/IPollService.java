package com.wain.wainvotingbackend.service;

import com.wain.wainvotingbackend.dto.request.PollCreateRequest;
import com.wain.wainvotingbackend.dto.request.PollUpdateRequest;
import com.wain.wainvotingbackend.dto.response.PollDetailResponse;
import com.wain.wainvotingbackend.dto.response.PollListResponse;
import com.wain.wainvotingbackend.dto.response.PollStatisticsResponse;
import org.springframework.data.domain.Pageable;


import java.util.List;

public interface IPollService {

    PollDetailResponse save(PollCreateRequest request);
    PollDetailResponse update(Long id, PollUpdateRequest request);

    List<PollListResponse> findAll();

    List<PollListResponse> findAll(Pageable pageable, Long categoryId);

    PollDetailResponse getDetailPoll(Long id);

    int totalItem(Long categoryId);

    PollStatisticsResponse getStatistics();
    List<PollListResponse> getUpcomingPolls();
}
