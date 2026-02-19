package com.backend.backend_vexma.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend_vexma.model.Documentacion;
import com.backend.backend_vexma.service.DocumentacionService;

@RestController
@RequestMapping("/api/documentaciones")
public class DocumentacionController {
    
    @Autowired
    private DocumentacionService documentacionService;

    @GetMapping
    public List<Documentacion> obtenerTodos(){
        return documentacionService.obtenerDocumentacionToda();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Documentacion> obtenerPorId(@PathVariable Long id){
        Optional<Documentacion> documentacion = documentacionService.obtenerDocumentacionPorId(id);

        return documentacion.map(ResponseEntity::ok) // documentacionService.obtenerDocumentacionPorId(id).map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> guardar(@RequestBody Documentacion documentacion){
        try{
            return ResponseEntity.ok(documentacionService.guardarDocumentacion(documentacion));
        } catch(IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<?> actualizar(@RequestBody Documentacion documentacion){
        try {
            return ResponseEntity.ok(documentacionService.guardarDocumentacion(documentacion));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> borrar(@PathVariable Long id){
        documentacionService.borrarDocumentacion(id);

        return ResponseEntity.noContent().build();
    }
}
