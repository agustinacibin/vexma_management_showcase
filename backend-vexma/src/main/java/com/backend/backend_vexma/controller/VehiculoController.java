package com.backend.backend_vexma.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend_vexma.dtos.VehiculoDTO;
import com.backend.backend_vexma.model.TipoVehiculo;
import com.backend.backend_vexma.model.Vehiculo;
import com.backend.backend_vexma.service.VehiculoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/vehiculos")
public class VehiculoController {
    
    @Autowired
    private VehiculoService vehiculoService;

    @GetMapping
    public List<Vehiculo> obtenerTodos(){
        return vehiculoService.obtenerVehiculosTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehiculo> obtenerPorId(@PathVariable Long id) {
        Optional<Vehiculo> vehiculo = vehiculoService.obtenerVehiculoPorId(id);
        
        if (vehiculo.isPresent()) {
            return ResponseEntity.ok(vehiculo.get());
        } else {
            return ResponseEntity.notFound().build();
        }

        // return vehiculo.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PostMapping
    public ResponseEntity<?> guardar(@Valid @RequestBody VehiculoDTO vehiculoDTO){
       
        try {
            Vehiculo vehiculo = new Vehiculo();
            vehiculo.setPatente(vehiculoDTO.getPatente());
            vehiculo.setMarca(vehiculoDTO.getMarca());
            vehiculo.setModelo(vehiculoDTO.getModelo());
            vehiculo.setAnio(vehiculoDTO.getAnio());
            vehiculo.setVersion(vehiculoDTO.getVersion());
            vehiculo.setTipo(TipoVehiculo.valueOf(vehiculoDTO.getTipo())); 
            vehiculo.setIsNuevo(vehiculoDTO.getIsNuevo());
            vehiculo.setFechaIngreso(vehiculoDTO.getFechaIngreso());
            vehiculo.setFechaEgreso(vehiculoDTO.getFechaEgreso());
            vehiculo.setTitular(vehiculoDTO.getTitular());
            vehiculo.setPrecioCompra(vehiculoDTO.getPrecioCompra());
            vehiculo.setPrecioLista(vehiculoDTO.getPrecioLista());

            Vehiculo guardado = vehiculoService.guardarVehiculo(vehiculo);
            
            return ResponseEntity.ok(guardado);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PatchMapping("/{id}/vender")
    public ResponseEntity<?> venderVehiculo(@PathVariable Long id, @RequestParam(required = false) LocalDate fecha){
        try {
            return ResponseEntity.ok(vehiculoService.marcarComoVendido(id, fecha));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/{id}/reingresar")
    public ResponseEntity<?> reingresarVehiculo(@PathVariable Long id, @RequestParam(required = false) LocalDate fecha){
        try {
            return ResponseEntity.ok(vehiculoService.reingresarVehiculo(id, fecha));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<?> actualizar(@RequestBody Vehiculo vehiculo){
        try {
            return ResponseEntity.ok(vehiculoService.guardarVehiculo(vehiculo));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
        

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> borrar(@PathVariable Long id){
        vehiculoService.borrarVehiculo(id);
        
        return ResponseEntity.noContent().build();

    }
}
