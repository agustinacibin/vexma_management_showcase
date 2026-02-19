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

import com.backend.backend_vexma.model.Actividad;
import com.backend.backend_vexma.service.ActividadService;

@RestController
@RequestMapping("/api/actividades")
public class ActividadController {

    @Autowired
    private ActividadService actividadService;

    @GetMapping
    public List<Actividad> obtenerTodos(){
        return actividadService.obtenerActividadesTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Actividad> obtenerPorId(@PathVariable Long id){
        Optional<Actividad> actividad = actividadService.obtenerActividadPorId(id);

        if(actividad.isPresent()){
            return ResponseEntity.ok(actividad.get());
        } else {
            return ResponseEntity.notFound().build();
        }

        //  return actividadService.obtenerActividadPorId(id)
        //     .map(ResponseEntity::ok) // Si está presente, devuelve 200 OK con el objeto
        //     .orElseGet(() -> ResponseEntity.notFound().build()); // Si no, devuelve 404
    }

    @PostMapping
    public ResponseEntity<?> guardar(@RequestBody Actividad actividad){
        try {
            return ResponseEntity.ok(actividadService.guardarActividad(actividad));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> borrar(@PathVariable Long id){
        actividadService.borrarActividad(id);

        return ResponseEntity.noContent().build();
    }
}
