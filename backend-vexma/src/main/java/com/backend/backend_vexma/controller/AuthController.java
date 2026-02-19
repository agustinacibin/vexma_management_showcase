package com.backend.backend_vexma.controller;

import com.backend.backend_vexma.model.Usuario;
import com.backend.backend_vexma.repository.UsuarioRepository;
import com.backend.backend_vexma.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (passwordEncoder.matches(password, usuario.getPassword())) {
            String token = jwtUtil.generateToken(username);
            return ResponseEntity.ok(Map.of("token", token));
        } else {
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }
    }
    
    // Opcional: Endpoint para crear el primer usuario (ejecutar una vez o usar un DataInitializer)
    @PostMapping("/register")
    public Usuario register(@RequestBody Map<String, String> request) {
        Usuario u = new Usuario();
        u.setUsername(request.get("username"));
        u.setPassword(passwordEncoder.encode(request.get("password")));
        return usuarioRepository.save(u);
    }
}