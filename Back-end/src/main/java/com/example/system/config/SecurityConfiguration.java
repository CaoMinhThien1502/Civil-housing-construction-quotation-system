package com.example.system.config;

import com.example.system.model.user.Role;
import com.example.system.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfiguration {
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final LogoutHandler logoutHandler;

    public static final String LOGOUT_URL = "/api/v1/auth/logout";
    public static final String LOGIN_URL = "http://localhost:3000/login";
    public static final String[] ENDPOINTS_WHITELIST = {
            "http://localhost:3000/login",
            "/logout",
            "/swagger-ui/**",
            "/swagger-resources/*",
            "/v3/api-docs/**",
            "/api/v1/auth/**",
    };
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {


        http

                .cors(c -> c
                        .configurationSource(request -> {
                            CorsConfiguration config = new CorsConfiguration();
                            config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
                            config.setAllowedMethods(Arrays.asList("GET", "POST", "DELETE", "PUT", "PATCH", "HEAD", "OPTIONS"));
                            config.setAllowedHeaders(Arrays.asList("*"));
                            config.setAllowCredentials(true);
                            return config;
                        }))
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers(ENDPOINTS_WHITELIST).permitAll()
                                .requestMatchers(HttpMethod.POST,"/api/v1/auth/refresh-token").permitAll()
                                //User
                                .requestMatchers(HttpMethod.GET, "/user/**").permitAll()
                                .requestMatchers(HttpMethod.PUT, "/user/profile/update").hasRole(Role.CUSTOMER.name())
                                .requestMatchers(HttpMethod.PUT, "/user/update-role").hasRole(Role.ADMIN.name())
                                //Combo building
                                .requestMatchers(HttpMethod.GET, "/combobuilding/**").permitAll()
                                .requestMatchers(HttpMethod.POST, "/combobuilding/**").hasAnyRole(Role.ADMIN.name(), Role.MANAGER.name())
                                .requestMatchers(HttpMethod.PUT, "/combobuilding/**").hasAnyRole(Role.ADMIN.name(), Role.MANAGER.name())
                                //Building
                                .requestMatchers(HttpMethod.GET, "/building/**").permitAll()
                                .requestMatchers(HttpMethod.POST, "/building/**").hasAnyRole(Role.ADMIN.name(), Role.MANAGER.name(), Role.CUSTOMER.name())
                                .requestMatchers(HttpMethod.PUT, "/building/**").hasAnyRole(Role.ADMIN.name(), Role.MANAGER.name())
                                //Request contract
                                .requestMatchers("/request-contract/**").hasRole(Role.CUSTOMER.name())
                                .anyRequest().authenticated()
                )
/*                .formLogin(form -> form // Cấu hình xác thực dựa trên biểu mẫu (form-based authentication)
                                .loginPage(LOGIN_URL) // Xác định trang đăng nhập của ứng dụng
                ) // URL mặc định sau khi đăng nhập thành công*/
                .sessionManagement(sessionManagement ->
                        sessionManagement
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout -> logout
                        .logoutUrl(LOGOUT_URL) // URL để xử lý quá trình đăng xuất
/*                        .logoutSuccessUrl(LOGIN_URL) // URL mặc định sau khi đăng xuất thành công*/
                        .invalidateHttpSession(true) // Hủy bỏ phiên làm việc của người dùng sau khi đăng xuất
                        .clearAuthentication(true)
                        .deleteCookies("access_token")
                        .deleteCookies("refresh_token")
                        .addLogoutHandler(logoutHandler))// Xóa thông tin xác thực của người dùng sau khi đăng xuất
        ;
        return http.build();
    }

}