package com.backend.backend_vexma.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend_vexma.model.Actividad;
import com.backend.backend_vexma.repository.ActividadRepository;

@Service
public class ActividadService {
    
    @Autowired
    private ActividadRepository actividadRepository;

    public List<Actividad> obtenerActividadesTodas(){
        return actividadRepository.findAll();
    }

    public Optional<Actividad> obtenerActividadPorId(Long id){
        return actividadRepository.findById(id);
    }

    public Actividad guardarActividad(Actividad actividad){
        if( (actividad.getVehiculo() == null) ||
            (actividad.getDescripcion() == null) || actividad.getDescripcion().isEmpty() ||
            (actividad.getFecha() == null) ||
            (actividad.getGasto() == null)) {
            
            throw new IllegalArgumentException("Debe completar todos los campos obligatorios.");
        }

        if(actividad.getFecha() == null){
            actividad.setFecha(LocalDate.now());
        }

        return actividadRepository.save(actividad);
    }

    public void borrarActividad(Long id){
        actividadRepository.deleteById(id);
    }

}
