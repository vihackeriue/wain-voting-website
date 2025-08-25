package com.wain.wainvotingbackend.dto.request;

import com.wain.wainvotingbackend.enums.StatusPoll;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PollUpdateRequest {

    String description;
    String image;
    Long categoryId;
    StatusPoll status;

}
