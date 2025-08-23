package com.wain.wainvotingbackend.service;

import com.wain.wainvotingbackend.dto.request.UserCreateRequest;
import com.wain.wainvotingbackend.dto.request.UserUpdateInfRequest;
import com.wain.wainvotingbackend.dto.response.UserResponse;

import java.util.List;

public interface IUserService {

    UserResponse save(UserCreateRequest request);

    UserResponse update(String email, UserUpdateInfRequest request);

    List<UserResponse> getAllUsers();

    Void delete(String email);

    UserResponse getMyInfo();

    String lockUser(String id);

}
