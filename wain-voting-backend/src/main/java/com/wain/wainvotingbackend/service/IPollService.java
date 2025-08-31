package com.wain.wainvotingbackend.service;

import com.wain.wainvotingbackend.dto.request.PollCreateRequest;
import com.wain.wainvotingbackend.dto.request.PollUpdateRequest;
import com.wain.wainvotingbackend.dto.response.PollDetailResponse;
import com.wain.wainvotingbackend.dto.response.PollListResponse;

import java.util.List;

public interface IPollService {

    PollDetailResponse save(PollCreateRequest request);
    PollDetailResponse update(Long id, PollUpdateRequest request);

    List<PollListResponse> getAllPolls();

    PollDetailResponse getDetailPoll(Long id);
}
