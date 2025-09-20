package com.wain.wainvotingbackend.service.impl;

import com.wain.wainvotingbackend.dto.request.PollCreateRequest;
import com.wain.wainvotingbackend.dto.request.PollUpdateRequest;
import com.wain.wainvotingbackend.dto.response.PollListResponse;
import com.wain.wainvotingbackend.dto.response.PollDetailResponse;
import com.wain.wainvotingbackend.dto.response.PollStatisticsResponse;
import com.wain.wainvotingbackend.entity.Candidate;
import com.wain.wainvotingbackend.entity.Category;
import com.wain.wainvotingbackend.entity.Poll;
import com.wain.wainvotingbackend.entity.User;
import com.wain.wainvotingbackend.enums.ErrorCode;
import com.wain.wainvotingbackend.exception.AppException;
import com.wain.wainvotingbackend.mapper.CandidateMapper;
import com.wain.wainvotingbackend.mapper.PollMapper;
import com.wain.wainvotingbackend.repository.CadidateRepository;
import com.wain.wainvotingbackend.repository.CategoryRepository;
import com.wain.wainvotingbackend.repository.PollRepository;
import com.wain.wainvotingbackend.repository.UserRepository;
import com.wain.wainvotingbackend.service.IPollService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PollService implements IPollService {

    PollRepository pollRepository;
    PollMapper pollMapper;
    UserRepository userRepository;
    CadidateRepository cadidateRepository;
    CategoryRepository categoryRepository;
    CandidateMapper candidateMapper;


    @Override
    public PollDetailResponse save(PollCreateRequest request) {
        Poll poll = pollMapper.toPoll(request);

        // gán các thông tin chưa được mapper
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(()-> new AppException(ErrorCode.DATA_NOT_FOUND));
        List<Candidate> candidates = request.getCandidates()
                .stream()
                .map(candidateMapper:: toCandidate)
                .toList();

        for (Candidate c : candidates) {
            c.setPoll(poll);
        }

        poll.setCreator(getUserCreate());
        poll.setCategory(category);
        poll.setCandidates(candidates);

        poll = pollRepository.save(poll);
        return pollMapper.toPollDetailResponse(poll);
    }

    @Override
    public PollDetailResponse update(Long id,PollUpdateRequest request) {
        Poll poll = pollRepository.findById(id).orElseThrow(()->new AppException(ErrorCode.DATA_NOT_FOUND));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(()->new AppException(ErrorCode.DATA_NOT_FOUND));

        poll.setCategory(category);
        pollMapper.updatePoll(poll, request);

        return pollMapper.toPollDetailResponse(pollRepository.save(poll));
    }

    @Override
    public List<PollListResponse> findAll() {
        return pollRepository.findAll().stream().map(pollMapper::toPollListResponse).toList();
    }

    @Override
    public List<PollListResponse> findAll(Pageable pageable, Long categoryId) {

        if (categoryId != null) {
            return pollRepository.findByCategoryId(categoryId, pageable).getContent()
                    .stream().map(pollMapper::toPollListResponse).toList();
        }
        return pollRepository.findAll(pageable).getContent().stream()
                .map(pollMapper::toPollListResponse)
                .toList();
    }

    @Override
    public PollDetailResponse getDetailPoll(Long id) {
        Poll poll = pollRepository.findById(id).orElseThrow(()-> new AppException(ErrorCode.DATA_NOT_FOUND));
        return pollMapper.toPollDetailResponse(poll);
    }

    @Override
    public int totalItem(Long categoryId) {
        if (categoryId != null) {
            return pollRepository.countByCategoryId(categoryId);
        }
        return (int) pollRepository.count();
    }

    @Override
    public PollStatisticsResponse getStatistics() {
        LocalDateTime now = LocalDateTime.now();

        long total = pollRepository.count();
        long upcoming = pollRepository.countByStartTimeAfter(now);
        long ongoing = pollRepository.countByStartTimeBeforeAndEndTimeAfter(now, now);
        long finished = pollRepository.countByEndTimeBefore(now);

        return PollStatisticsResponse.builder()
                .totalPolls(total)
                .upcomingPolls(upcoming)
                .ongoingPolls(ongoing)
                .finishedPolls(finished)
                .build();
    }
    @Override
    public List<PollListResponse> getUpcomingPolls() {
        LocalDateTime now = LocalDateTime.now();
        return pollRepository.findByStartTimeAfterOrderByStartTimeAsc(now)
                .stream()
                .map(pollMapper::toPollListResponse)
                .toList();
    }

    private User getUserCreate(){
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();
        return userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }
}
