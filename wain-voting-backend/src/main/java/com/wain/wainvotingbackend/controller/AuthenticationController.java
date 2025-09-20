package com.wain.wainvotingbackend.controller;

import com.nimbusds.jose.JOSEException;
import com.wain.wainvotingbackend.dto.request.AuthenticationRequest;
import com.wain.wainvotingbackend.dto.request.IntrospectRequest;
import com.wain.wainvotingbackend.dto.request.UpdateWalletRequest;
import com.wain.wainvotingbackend.dto.response.ApiResponse;
import com.wain.wainvotingbackend.dto.response.AuthenticationResponse;
import com.wain.wainvotingbackend.dto.response.IntrospectResponse;
import com.wain.wainvotingbackend.service.IAuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {

    IAuthenticationService authenticationService;

    @PostMapping("/authenticate")
    ApiResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest authenticationRequest) {
        var result = authenticationService.authenticate(authenticationRequest);

        return ApiResponse.<AuthenticationResponse>builder().data(result).build();

    }
    @PostMapping("/introspect")
    ApiResponse<IntrospectResponse> introspect(@RequestBody IntrospectRequest request)
            throws ParseException, JOSEException {
        var result = authenticationService.introspect(request);
        return ApiResponse.<IntrospectResponse>builder().data(result).build();
    }

    @PostMapping("/logout")
    ApiResponse<Void> logout(HttpServletRequest request) throws ParseException, JOSEException {
        String authHeader = request.getHeader("Authorization");
        String message = "Logout fail!";
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            authenticationService.logout(token);
            message = "Logout successful!";
        }
        return ApiResponse.<Void>builder().message(message).build();
    }
    @PostMapping("/refresh")
    ApiResponse<AuthenticationResponse> refresh(HttpServletRequest request) throws ParseException, JOSEException {
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            var result = authenticationService.refreshToken(token);
            return ApiResponse.<AuthenticationResponse>builder().data(result).build();
        }
        return ApiResponse.<AuthenticationResponse>builder()
                .message("refresh fail!").build() ;

    }
    @PutMapping("/update-wallet")
    public ApiResponse<AuthenticationResponse> updateWallet(@AuthenticationPrincipal Jwt jwt, @RequestBody UpdateWalletRequest updateWalletRequest) throws ParseException, JOSEException {
        String token = jwt.getTokenValue();
        var result = authenticationService.updateWalletAddress(token, updateWalletRequest);

        return ApiResponse.<AuthenticationResponse>builder().data(result).build();
    }
}
