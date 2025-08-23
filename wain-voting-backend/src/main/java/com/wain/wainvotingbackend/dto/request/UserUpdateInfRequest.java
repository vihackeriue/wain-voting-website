package com.wain.wainvotingbackend.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateInfRequest {

    String email;
    String password;
    String fullName;
    String phone;

    List<String> roles;
}
