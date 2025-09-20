package com.wain.wainvotingbackend.controller;

import com.wain.wainvotingbackend.dto.request.UserCreateRequest;
import com.wain.wainvotingbackend.dto.request.UserUpdateInfRequest;
import com.wain.wainvotingbackend.dto.response.ApiResponse;
import com.wain.wainvotingbackend.dto.response.CategoryResponse;
import com.wain.wainvotingbackend.dto.response.UserResponse;
import com.wain.wainvotingbackend.service.IUserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {

    IUserService userService;


    @PostMapping()
    public ApiResponse<UserResponse> createUser(@RequestBody @Valid UserCreateRequest request) {
        UserResponse user = userService.save(request);

        return ApiResponse.<UserResponse>builder().data(user).build() ;
    }
    @PutMapping("/{username}")
    public ApiResponse<UserResponse> updateUser(@PathVariable String username, @RequestBody @Valid UserUpdateInfRequest user) {

        return ApiResponse.<UserResponse>builder().data(userService.update(username, user)).build();
    }

    @GetMapping()
    public ApiResponse<List<UserResponse>> getAllUsers(@RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "limit", required = false) Integer limit) {
        if(page != null && limit != null){
            Pageable pageable = PageRequest.of(page-1, limit);

            return ApiResponse.<List<UserResponse>>builder()
                    .page(page)
                    .totalPages((int) Math.ceil((double) (userService.totalItem())/ limit))
                    .data(userService.findAll(pageable))
                    .build();
        }
        return ApiResponse.<List<UserResponse>>builder().data(userService.findAll()).build();
    }
    @GetMapping("/my-info")
    public ApiResponse<UserResponse> getMyInfo() {
        return ApiResponse.<UserResponse>builder().data(userService.getMyInfo()).build();
    }


}
