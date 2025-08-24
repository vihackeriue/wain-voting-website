package com.wain.wainvotingbackend.configuration;

import com.wain.wainvotingbackend.constant.PredefinedRole;
import com.wain.wainvotingbackend.entity.Role;
import com.wain.wainvotingbackend.entity.User;
import com.wain.wainvotingbackend.repository.RoleRepository;
import com.wain.wainvotingbackend.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApplicationInitConfig {
    PasswordEncoder passwordEncoder;

    @NonFinal
    static final String ADMIN_USERNAME = "admin";
    @NonFinal
    static final String ADMIN_EMAIL = "admin@gmail.com";
    @NonFinal
    static final String ADMIN_PASSWORD = "admin";

    @Bean
    @ConditionalOnProperty(
            prefix = "spring",
            value = "datasource.driver-class-name",
            havingValue = "com.mysql.cj.jdbc.Driver")
    ApplicationRunner applicationRunner(UserRepository userRepository, RoleRepository roleRepository) {
        return args -> {
          if(userRepository.findByEmail(ADMIN_EMAIL).isEmpty()) {

              roleRepository.save(
                      Role.builder()
                              .name(PredefinedRole.USER_ROLE)
                              .description("this is Role User")
                              .build()
              );
              Role adninRole = roleRepository.save(
                      Role.builder()
                              .name(PredefinedRole.ADMIN_ROLE)
                              .description("this is Role Admin")
                              .build()
              );

              var roles = new HashSet<Role>();
              roles.add(adninRole);

              User user = User.builder()
                      .email(ADMIN_EMAIL)
                      .username(ADMIN_USERNAME)
                      .fullName("admin")
                      .roles(roles)
                      .password(passwordEncoder.encode(ADMIN_PASSWORD))
                      .build();
              userRepository.save(user);
              log.warn("admin user has been created");

          }
            log.info("Application initialization completed .....");
        };
    }
}
