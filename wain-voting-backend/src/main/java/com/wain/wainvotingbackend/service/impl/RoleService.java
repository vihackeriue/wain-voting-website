package com.wain.wainvotingbackend.service.impl;

import com.wain.wainvotingbackend.dto.request.RoleRequest;
import com.wain.wainvotingbackend.dto.response.RoleResponse;
import com.wain.wainvotingbackend.entity.Role;
import com.wain.wainvotingbackend.mapper.RoleMapper;
import com.wain.wainvotingbackend.repository.RoleRepository;
import com.wain.wainvotingbackend.service.IRoleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleService implements IRoleService {

    RoleMapper roleMapper;
    RoleRepository roleRepository;

    @Override
    public RoleResponse save(RoleRequest roleRequest) {
        Role role = roleMapper.toRole(roleRequest);

        role = roleRepository.save(role);

        return roleMapper.toRoleResponse(role);
    }

    @Override
    public List<RoleResponse> findAll() {
        var roles = roleRepository.findAll();
        return roles.stream().map(roleMapper::toRoleResponse).toList();
    }

    @Override
    public void delete(Long id) {
        roleRepository.deleteById(id);
    }
}
