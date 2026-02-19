package com.backend.backend_vexma.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.backend_vexma.model.Documentacion;
import com.backend.backend_vexma.model.Vehiculo;

@Repository
public interface DocumentacionRepository extends JpaRepository<Documentacion, Long>{

    Optional<Documentacion> findByVehiculo(Vehiculo vehiculo);
    Optional<Documentacion> findByVehiculo_Id(Long idVehiculo);
    
}
