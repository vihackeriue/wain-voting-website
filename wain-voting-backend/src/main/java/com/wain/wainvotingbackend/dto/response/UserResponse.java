package com.wain.wainvotingbackend.dto.response;

import com.wain.wainvotingbackend.entity.Role;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;


@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {


    String id;
    String email;
    String password;
    String fullName;
    String phone;
    Set<RoleResponse> roles;
}
