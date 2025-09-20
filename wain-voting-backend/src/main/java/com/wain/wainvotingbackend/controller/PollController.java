package com.wain.wainvotingbackend.controller;

import com.wain.wainvotingbackend.dto.request.PollCreateRequest;
import com.wain.wainvotingbackend.dto.request.PollUpdateRequest;
import com.wain.wainvotingbackend.dto.response.ApiResponse;
import com.wain.wainvotingbackend.dto.response.PollDetailResponse;
import com.wain.wainvotingbackend.dto.response.PollListResponse;
import com.wain.wainvotingbackend.dto.response.PollStatisticsResponse;
import com.wain.wainvotingbackend.service.IPollService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/polls")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PollController {

    IPollService pollService;

    @PostMapping()
    public ApiResponse<PollDetailResponse> create(@RequestBody PollCreateRequest request) {
        return ApiResponse.<PollDetailResponse>builder()
                .data(pollService.save(request))
                .build();

    }
    @PutMapping("/{id}")
    public ApiResponse<PollDetailResponse> update(@PathVariable Long id, @RequestBody PollUpdateRequest request){
        return ApiResponse.<PollDetailResponse>builder()
                .data(pollService.update(id, request))
                .build();
    }
    @GetMapping()
    public ApiResponse<List<PollListResponse>> list(
            @RequestParam(value = "page", required = false) Integer page,
            @RequestParam(value = "limit", required = false) Integer limit,
            @RequestParam(value = "categoryId", required = false) Long categoryId) {

        if(page != null && limit != null){
            Pageable pageable = PageRequest.of(page-1, limit);

            return ApiResponse.<List<PollListResponse>>builder()
                    .page(page)
                    .totalPages((int) Math.ceil((double) (pollService.totalItem(categoryId))/ limit))
                    .data(pollService.findAll(pageable, categoryId))
                    .build();


        }
        return ApiResponse.<List<PollListResponse>>builder()
                .data(pollService.findAll())
                .build();

    }
    @GetMapping("/upcoming")
    public ApiResponse<List<PollListResponse>> getUpcomingPolls() {
        return ApiResponse.<List<PollListResponse>>builder()
                .data(pollService.getUpcomingPolls())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<PollDetailResponse> detail(@PathVariable Long id) {

        return ApiResponse.<PollDetailResponse>builder()
                .data(pollService.getDetailPoll(id))
                .build();
    }

    @GetMapping("/statistics")
    public ApiResponse<PollStatisticsResponse> getStatistics() {
        return ApiResponse.<PollStatisticsResponse>builder()
                .data(pollService.getStatistics())
                .build();
    }


}
