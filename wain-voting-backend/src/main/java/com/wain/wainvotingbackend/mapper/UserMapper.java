package com.wain.wainvotingbackend.mapper;

import com.wain.wainvotingbackend.dto.request.UserCreateRequest;
import com.wain.wainvotingbackend.dto.response.UserResponse;
import com.wain.wainvotingbackend.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreateRequest userCreateRequest);

    UserResponse toUserResponse(User user);
}
