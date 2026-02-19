package com.backend.backend_vexma.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.backend_vexma.model.Titular;

@Repository
public interface TitularRepository extends JpaRepository<Titular, Long>{
    // Aquí podríamos agregar métodos personalizados luego, como:
    // Optional<Titular> findByDni(int dni);
}
