package com.backend.backend_vexma.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.backend_vexma.model.Actividad;

@Repository
public interface ActividadRepository extends JpaRepository<Actividad, Long>{
    
}
