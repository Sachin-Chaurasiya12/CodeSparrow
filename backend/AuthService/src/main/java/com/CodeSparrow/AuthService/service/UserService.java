package com.CodeSparrow.AuthService.service;

import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.CodeSparrow.AuthService.Exception.UserAlreadyExistException;
import com.CodeSparrow.AuthService.model.Role;
import com.CodeSparrow.AuthService.model.Users;
import com.CodeSparrow.AuthService.model.DTO.RegisterDTO;
import com.CodeSparrow.AuthService.model.DTO.RequestDTO;
import com.CodeSparrow.AuthService.model.DTO.ResponseDTO;
import com.CodeSparrow.AuthService.repository.UserRepository;
import com.CodeSparrow.AuthService.service.interfaces.IUserService;

@Service
public class UserService implements IUserService{

    @Autowired
    private UserRepository repo;
    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;


    @Override
    public ResponseDTO Register(RegisterDTO register) {
        Boolean username = repo.existsByUsername(register.getUsername());
        Boolean email = repo.existsByEmail(register.getEmail());

        if(username || email){
            throw new UserAlreadyExistException("User Already Exist");
        }

        String pass = register.getPassword();

        Users user = new Users();
            user.setName(register.getName());
            user.setUsername(register.getUsername());
            user.setEmail(register.getEmail());
            user.setPassword(encoder.encode(pass));
            user.setRole(Role.User);
            user.setCreatedAt(LocalDate.now());

            repo.save(user);
        
        ResponseDTO dto = new ResponseDTO();
        dto.setMessage("User Created Successfully");
        dto.setEmail(user.getEmail());

        return dto;

    }
    @Override
public ResponseDTO login(RequestDTO request) {

    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.getEmail(),
            request.getPassword()
        )
    );

    Users user = repo.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));

    String accessToken = jwtService.generateToken(request.getEmail(),user.getRole().name(),user.getId());
    String refreshToken = jwtService.generateRefreshToken(request.getEmail());

    user.setRefreshToken(refreshToken);
    repo.save(user);

    ResponseDTO response = new ResponseDTO();
    response.setMessage("Login successful");
    response.setId(user.getId());
    response.setRole(user.getRole());
    response.setEmail(request.getEmail());
    response.setAccessToken(accessToken);
    response.setRefreshToken(refreshToken); // 🔥 FIXED

    return response;
}
 
}
