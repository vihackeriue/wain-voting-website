package com.wain.wainvotingbackend.dto.response;

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
public class PollDetailResponse {
    Long id;

    String title;
    String description;
    LocalDateTime startTime;
    LocalDateTime endTime;
    String image;
    String chainId;
    StatusPoll status;
    String creator;
    String category;
    List<CandidateResponse> candidates;
}
