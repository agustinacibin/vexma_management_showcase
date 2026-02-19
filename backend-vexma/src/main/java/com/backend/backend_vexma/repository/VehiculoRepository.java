package com.backend.backend_vexma.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.backend_vexma.model.Vehiculo;

@Repository
public interface VehiculoRepository extends JpaRepository<Vehiculo, Long>{
    // // Spring Data JPA generará automáticamente la consulta para estos métodos
    // List<Vehiculo> findByMarca(String marca);
    // List<Vehiculo> findByModelo(String modelo);
    // List<Vehiculo> findByPatente(String patente);

    // // También puedes definir métodos personalizados con @Query para consultas más complejas
    // @Query("SELECT v FROM Vehiculo v, Titular t " +
    //    "WHERE v.idTitular = t.id AND " +
    //    "(LOWER(t.nombre) = LOWER(:nombre) OR LOWER(t.apellido) = LOWER(:apellido))")
    // List<Vehiculo> findVehiculosByTitularNombreOrApellido(@Param("nombre") String nombre, @Param("apellido") String apellido);
}
