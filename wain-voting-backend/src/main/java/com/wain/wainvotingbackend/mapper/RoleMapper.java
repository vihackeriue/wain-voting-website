package com.wain.wainvotingbackend.mapper;

import com.wain.wainvotingbackend.dto.request.RoleRequest;
import com.wain.wainvotingbackend.dto.response.RoleResponse;
import com.wain.wainvotingbackend.entity.Role;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    Role toRole(RoleRequest roleRequest);

    RoleResponse toRoleResponse(Role role);
}
