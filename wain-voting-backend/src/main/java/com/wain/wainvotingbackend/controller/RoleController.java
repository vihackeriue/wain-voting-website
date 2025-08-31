package com.wain.wainvotingbackend.controller;

import com.wain.wainvotingbackend.dto.request.RoleRequest;
import com.wain.wainvotingbackend.dto.response.ApiResponse;
import com.wain.wainvotingbackend.dto.response.RoleResponse;
import com.wain.wainvotingbackend.service.IRoleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/role")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleController {
    IRoleService roleService;

    @PostMapping("/create")
    public ApiResponse<RoleResponse> create(@RequestBody RoleRequest request) {
        return ApiResponse.<RoleResponse>builder().data(roleService.save(request)).build();
    }
    @GetMapping("/list")
    public ApiResponse<List<RoleResponse>> list() {
        return ApiResponse.<List<RoleResponse>>builder().data(roleService.findAll()).build();
    }
    @DeleteMapping("/delete/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        roleService.delete(id);
        String message = "Role deleted successfully";
        return ApiResponse.<Void>builder().message(message).build();
    }
}
