package com.wain.wainvotingbackend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PollStatisticsResponse {
    private long totalPolls;
    private long upcomingPolls;
    private long ongoingPolls;
    private long finishedPolls;
}
