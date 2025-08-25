package com.wain.wainvotingbackend.mapper;

import com.wain.wainvotingbackend.dto.request.CandidateCreateRequest;
import com.wain.wainvotingbackend.dto.response.CandidateResponse;
import com.wain.wainvotingbackend.entity.Candidate;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CandidateMapper {
    Candidate toCandidate(CandidateCreateRequest request);

    CandidateResponse toCandidateResponse(Candidate candidate);
}
