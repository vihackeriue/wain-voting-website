package com.wain.wainvotingbackend.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;



@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateInfRequest {

    String username;
    String email;
    String password;
    String fullName;
    String phone;
}
