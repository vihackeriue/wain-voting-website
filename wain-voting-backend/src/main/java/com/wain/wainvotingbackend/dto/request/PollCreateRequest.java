package com.wain.wainvotingbackend.dto.request;

import com.wain.wainvotingbackend.enums.StatusPoll;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PollCreateRequest {

    String title;
    String description;
    LocalDateTime startTime;
    LocalDateTime endTime;
    String image;
    String chainId;
    Long categoryId;
    StatusPoll status;
    List<CandidateCreateRequest> candidates;

}
