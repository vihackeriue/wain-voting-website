package com.wain.wainvotingbackend.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CandidateCreateRequest {
    String name;
    String description;

    String image;
    String chainId;
//    Long pollId;

}
