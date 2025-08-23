package com.wain.wainvotingbackend.service.impl;

import com.wain.wainvotingbackend.constant.PredefinedRole;
import com.wain.wainvotingbackend.dto.request.UserCreateRequest;
import com.wain.wainvotingbackend.dto.request.UserUpdateInfRequest;
import com.wain.wainvotingbackend.dto.response.UserResponse;
import com.wain.wainvotingbackend.entity.Role;
import com.wain.wainvotingbackend.entity.User;
import com.wain.wainvotingbackend.enums.ErrorCode;
import com.wain.wainvotingbackend.exception.AppException;
import com.wain.wainvotingbackend.mapper.UserMapper;
import com.wain.wainvotingbackend.repository.RoleRepository;
import com.wain.wainvotingbackend.repository.UserRepository;
import com.wain.wainvotingbackend.service.IUserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService implements IUserService {

    UserMapper userMapper;
    PasswordEncoder passwordEncoder;
    UserRepository userRepository;
    RoleRepository roleRepository;


    @Override
    public UserResponse save(UserCreateRequest request) {

        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        HashSet<Role> roles = new HashSet<>();

        roleRepository.findAllByName(PredefinedRole.USER_ROLE).ifPresent(roles::add);

        user.setRoles(roles);

        try {
            user = userRepository.save(user);
        }catch (DataIntegrityViolationException e){
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        return userMapper.toUserResponse(user);
    }

    @Override
    public UserResponse update(String email, UserUpdateInfRequest request) {
        return null;
    }

    @Override
    public List<UserResponse> getAllUsers() {
        return List.of();
    }

    @Override
    public Void delete(String email) {
        return null;
    }

    @Override
    public UserResponse getMyInfo() {
        return null;
    }

    @Override
    public String lockUser(String id) {
        return "";
    }
}
