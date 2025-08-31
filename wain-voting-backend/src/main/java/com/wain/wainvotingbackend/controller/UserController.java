package com.wain.wainvotingbackend.controller;

import com.wain.wainvotingbackend.dto.request.UserCreateRequest;
import com.wain.wainvotingbackend.dto.request.UserUpdateInfRequest;
import com.wain.wainvotingbackend.dto.response.ApiResponse;
import com.wain.wainvotingbackend.dto.response.UserResponse;
import com.wain.wainvotingbackend.service.IUserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {

    IUserService userService;


    @PostMapping("/create")
    public ApiResponse<UserResponse> createUser(@RequestBody @Valid UserCreateRequest request) {
        UserResponse user = userService.save(request);

        return ApiResponse.<UserResponse>builder().data(user).build() ;
    }
    @PutMapping("/update/{username}")
    public ApiResponse<UserResponse> updateUser(@PathVariable String username, @RequestBody @Valid UserUpdateInfRequest user) {

        return ApiResponse.<UserResponse>builder().data(userService.update(username, user)).build();
    }

    @GetMapping("/list")
    public ApiResponse<List<UserResponse>> getAllUsers() {
        return ApiResponse.<List<UserResponse>>builder().data(userService.getAllUsers()).build();
    }
    @GetMapping("/my-info")
    public ApiResponse<UserResponse> getMyInfo() {
        return ApiResponse.<UserResponse>builder().data(userService.getMyInfo()).build();
    }

}
