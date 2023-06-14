package com.mercado.app.mercadol.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
//@EnableResourceServer//configuraciones para el cliente
public class ResourceServerConfig /*extends ResourceServerConfigurerAdapter*/ {

    @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
    private String issuerUri;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.cors(Customizer.withDefaults());

        http
                .authorizeHttpRequests(
                        (authorize) -> authorize

                                .requestMatchers(HttpMethod.POST, "/api/v1/cliente/**").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/v1/mercado/products", "/api/v1/mercado/products/page/{page}").permitAll()
                                .requestMatchers(HttpMethod.GET, "/images/**").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/v1/mercado/uploads/img/{nombreFoto:.+}").permitAll()
                                .requestMatchers("/img/**", "/**", "/images/**", "/static/**", "/", "/mercadolibre", "/mercadolibre/page/**", "/carrito/**", "/register").permitAll()
                                /* .antMatchers(HttpMethod.GET, "/api/v1/products").hasAnyRole("USER", "ADMIN")
                                .antMatchers(HttpMethod.GET, "/api/v1//product/{id}").hasRole("ADMIN")
                                .antMatchers(HttpMethod.GET, "/api/v1/product/p/{nombre}").hasRole("ADMIN")
                                .antMatchers(HttpMethod.POST, "/api/v1/product/c").hasRole("ADMIN")
                                .antMatchers(HttpMethod.PUT, "/api/v1/product/u/{id}").hasRole("ADMIN")
                                .antMatchers(HttpMethod.DELETE, "/api/v1/product/d/{id}").hasRole("ADMIN") */
                                .anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.decoder(JwtDecoders.fromIssuerLocation(issuerUri))));
          http//agregar cuando no requiera csrf
                .csrf((csrf) -> csrf
                        .ignoringRequestMatchers("/api/v1/cliente/**")
                );
        return http.build();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtGrantedAuthoritiesConverter.setAuthoritiesClaimName("roless");
        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("");
        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);

        return jwtAuthenticationConverter;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://127.0.0.1:3000", "http://20.228.179.23:9000", "https://lemon-hill-02bded510.2.azurestaticapps.net"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

}
