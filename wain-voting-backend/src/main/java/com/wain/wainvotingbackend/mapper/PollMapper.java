package com.wain.wainvotingbackend.mapper;

import com.wain.wainvotingbackend.dto.request.PollCreateRequest;
import com.wain.wainvotingbackend.dto.request.PollUpdateRequest;
import com.wain.wainvotingbackend.dto.response.PollListResponse;
import com.wain.wainvotingbackend.dto.response.PollDetailResponse;
import com.wain.wainvotingbackend.entity.Poll;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PollMapper {

    @Mapping(target = "creator", ignore = true)
    @Mapping(target = "category", ignore = true)
    Poll toPoll(PollCreateRequest pollCreateRequest);


    @Mapping(target = "category", ignore = true)
    void  updatePoll(@MappingTarget Poll poll, PollUpdateRequest pollUpdateRequest);

    @Mapping(source = "creator.username", target = "creator")
    @Mapping(source = "category.name", target = "category")
    PollDetailResponse toPollDetailResponse(Poll poll);

    @Mapping(source = "creator.username", target = "creator")
    @Mapping(source = "category.name", target = "category")
    PollListResponse toPollListResponse(Poll poll);
}
