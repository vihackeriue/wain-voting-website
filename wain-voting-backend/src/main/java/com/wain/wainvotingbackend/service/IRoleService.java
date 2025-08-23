package com.wain.wainvotingbackend.service;


import com.wain.wainvotingbackend.dto.request.RoleRequest;
import com.wain.wainvotingbackend.dto.response.RoleResponse;

import java.util.List;

public interface IRoleService {

    RoleResponse save(RoleRequest roleRequest);

    List<RoleResponse> findAll();

    void delete(Long id);


}
