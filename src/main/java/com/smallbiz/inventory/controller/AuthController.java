package com.smallbiz.inventory.controller;

import com.smallbiz.inventory.dto.LoginRequest;
import com.smallbiz.inventory.entity.User;
import com.smallbiz.inventory.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Keeping it simple with plaintext matching as requested for this prototype
            if (user.getPassword().equals(request.getPassword())) {
                return ResponseEntity.ok(user);
            }
        }
        return ResponseEntity.status(401).build(); // Unauthorized
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().build(); // Email already exists
        }
        // Force new users to be 'USER' role by default
        request.setRole("USER");
        User savedUser = userRepository.save(request);
        return ResponseEntity.ok(savedUser);
    }
}
