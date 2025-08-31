package com.wain.wainvotingbackend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryDetailResponse {
    Long id;
    String name;
    String description;
    String image;
    List<PollListResponse> polls;
}
