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
import org.springframework.data.domain.Pageable;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
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

    //    Chỉ cho phép đúng người truy cập mới cho phép vào
    @PreAuthorize("#username == authentication.name or hasRole('ADMIN')")
    @Override
    public UserResponse update(String username, UserUpdateInfRequest request) {

        User user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        userMapper.updateUser(user, request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user = userRepository.save(user);

        return userMapper.toUserResponse(user);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public List<UserResponse> findAll(Pageable pageable) {
        return userRepository.findAll(pageable).getContent().stream().map(userMapper::toUserResponse)
                .toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public List<UserResponse> findAll() {

        return userRepository.findAll().stream().map(userMapper::toUserResponse).toList();
    }

    @Override
    public void delete(String username) {
        userRepository.deleteByUsername(username);
    }

    @Override
    public UserResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return userMapper.toUserResponse(user);
    }

    @Override
    public String lockUser(String id) {
        return "";
    }

    @Override
    public int totalItem() {
        return  (int) userRepository.count();
    }
}
