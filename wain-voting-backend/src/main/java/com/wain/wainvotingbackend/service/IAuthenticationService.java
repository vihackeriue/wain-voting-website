package com.wain.wainvotingbackend.service;

import com.nimbusds.jose.JOSEException;
import com.wain.wainvotingbackend.dto.request.AuthenticationRequest;
import com.wain.wainvotingbackend.dto.request.IntrospectRequest;
import com.wain.wainvotingbackend.dto.request.LogoutRequest;
import com.wain.wainvotingbackend.dto.request.RefreshTokenRequest;
import com.wain.wainvotingbackend.dto.response.AuthenticationResponse;
import com.wain.wainvotingbackend.dto.response.IntrospectResponse;

import java.text.ParseException;

public interface IAuthenticationService {

    IntrospectResponse introspect(IntrospectRequest request) throws ParseException, JOSEException;

    AuthenticationResponse authenticate(AuthenticationRequest request);

    void logout(String token) throws ParseException, JOSEException;

    AuthenticationResponse refreshToken(RefreshTokenRequest request) throws ParseException, JOSEException;

}
