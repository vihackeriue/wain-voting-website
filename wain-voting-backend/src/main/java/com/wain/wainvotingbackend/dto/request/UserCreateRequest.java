package com.wain.wainvotingbackend.dto.request;


import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreateRequest {

    String username;
    String email;
    String password;
    String fullName;

}
