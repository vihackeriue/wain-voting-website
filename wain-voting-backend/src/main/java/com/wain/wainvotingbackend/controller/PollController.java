package com.wain.wainvotingbackend.controller;

import com.wain.wainvotingbackend.dto.request.PollCreateRequest;
import com.wain.wainvotingbackend.dto.request.PollUpdateRequest;
import com.wain.wainvotingbackend.dto.response.ApiResponse;
import com.wain.wainvotingbackend.dto.response.PollDetailResponse;
import com.wain.wainvotingbackend.dto.response.PollListResponse;
import com.wain.wainvotingbackend.service.IPollService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/poll")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PollController {

    IPollService pollService;

    @PostMapping("/create")
    public ApiResponse<PollDetailResponse> create(@RequestBody PollCreateRequest request) {
        return ApiResponse.<PollDetailResponse>builder()
                .data(pollService.save(request))
                .build();

    }
    @PutMapping("/update/{id}")
    public ApiResponse<PollDetailResponse> update(@PathVariable Long id, @RequestBody PollUpdateRequest request){
        return ApiResponse.<PollDetailResponse>builder()
                .data(pollService.update(id, request))
                .build();
    }
    @GetMapping("/list")
    public ApiResponse<List<PollListResponse>> list() {
        return ApiResponse.<List<PollListResponse>>builder()
                .data(pollService.getAllPolls())
                .build();

    }
    @GetMapping("/detail/{id}")
    public ApiResponse<PollDetailResponse> detail(@PathVariable Long id) {

        return ApiResponse.<PollDetailResponse>builder()
                .data(pollService.getDetailPoll(id))
                .build();
    }


}
