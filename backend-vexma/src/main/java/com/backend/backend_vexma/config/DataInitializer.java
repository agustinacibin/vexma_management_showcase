package com.backend.backend_vexma.config;

import com.backend.backend_vexma.model.Usuario;
import com.backend.backend_vexma.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${ADMIN_USER}") 
    private String adminUser;

    @Value("${ADMIN_PASSWORD}")
    private String adminPassword;

    @Override
    public void run(String... args) throws Exception {
        // DATOS REALES QUE QUIERES USAR (Cámbialos aquí por los tuyos)
        String MY_USER = adminUser; 
        String MY_PASS = adminPassword; // Pon aquí tu contraseña real

        // Buscamos si ya existe
        Optional<Usuario> usuarioExistente = usuarioRepository.findByUsername(MY_USER);

        if (usuarioExistente.isPresent()) {
            // SI EXISTE: Le actualizamos la contraseña (FORCE UPDATE)
            Usuario u = usuarioExistente.get();
            u.setPassword(passwordEncoder.encode(MY_PASS));
            usuarioRepository.save(u);
            System.out.println(">>> USUARIO EXISTENTE ACTUALIZADO: " + MY_USER);
        } else {
            // SI NO EXISTE: Lo creamos de cero
            Usuario nuevo = new Usuario();
            nuevo.setUsername(MY_USER);
            nuevo.setPassword(passwordEncoder.encode(MY_PASS));
            usuarioRepository.save(nuevo);
            System.out.println(">>> USUARIO NUEVO CREADO: " + MY_USER);
        }
        
        System.out.println("---------------------------------------");
        System.out.println(" Login activo para: " + MY_USER);
        System.out.println("---------------------------------------");
    }
}