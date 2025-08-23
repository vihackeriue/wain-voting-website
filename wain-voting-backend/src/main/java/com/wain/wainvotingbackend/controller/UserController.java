package com.wain.wainvotingbackend.controller;

import com.wain.wainvotingbackend.dto.response.ApiResponse;
import com.wain.wainvotingbackend.entity.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @PostMapping
    public ApiResponse<User> createUser(@RequestBody User user) {
        return null;
    }

}
