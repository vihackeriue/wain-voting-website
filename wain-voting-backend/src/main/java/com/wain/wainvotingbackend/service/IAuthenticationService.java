package com.wain.wainvotingbackend.service;

import com.nimbusds.jose.JOSEException;
import com.wain.wainvotingbackend.dto.request.*;
import com.wain.wainvotingbackend.dto.response.AuthenticationResponse;
import com.wain.wainvotingbackend.dto.response.IntrospectResponse;

import java.text.ParseException;

public interface IAuthenticationService {

    IntrospectResponse introspect(IntrospectRequest request) throws ParseException, JOSEException;

    AuthenticationResponse authenticate(AuthenticationRequest request);

    void logout(String token) throws ParseException, JOSEException;

    AuthenticationResponse refreshToken(String oldtoken) throws ParseException, JOSEException;

    AuthenticationResponse updateWalletAddress(String oldToken, UpdateWalletRequest request) throws ParseException, JOSEException;
}
