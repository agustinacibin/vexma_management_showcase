package com.backend.backend_vexma.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend_vexma.model.Titular;
import com.backend.backend_vexma.service.TitularService;

@RestController
@RequestMapping("/api/titulares")
public class TitularController {
    
    @Autowired
    private TitularService titularService;

    @GetMapping
    public List<Titular> obtenerTodos(){
        return titularService.obtenerTitularesTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Titular> obtenerPorId(@PathVariable Long id){
        Optional<Titular> titular = titularService.obtenerTitularPorId(id);

        if(titular.isPresent()){
            return ResponseEntity.ok(titular.get());
        } else{
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping
    public ResponseEntity<?> guardar(@RequestBody Titular titular){
        try {
            return ResponseEntity.ok(titularService.guardarTitular(titular));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> borrar(@PathVariable Long id){
        titularService.borrarTitular(id);

        return ResponseEntity.noContent().build();
    }
    
}
