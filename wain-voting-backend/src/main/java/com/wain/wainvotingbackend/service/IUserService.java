package com.wain.wainvotingbackend.service;

import com.wain.wainvotingbackend.dto.request.UserCreateRequest;
import com.wain.wainvotingbackend.dto.request.UserUpdateInfRequest;
import com.wain.wainvotingbackend.dto.response.UserResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IUserService {

    UserResponse save(UserCreateRequest request);

    UserResponse update(String username, UserUpdateInfRequest request);

    List<UserResponse> findAll();
    List<UserResponse> findAll(Pageable pageable);


    void delete(String email);

    UserResponse getMyInfo();

    String lockUser(String id);
    int totalItem();

}
