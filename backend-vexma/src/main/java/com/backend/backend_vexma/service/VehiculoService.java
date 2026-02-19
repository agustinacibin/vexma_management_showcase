package com.backend.backend_vexma.service;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend_vexma.model.Titular;
import com.backend.backend_vexma.model.Vehiculo;
import com.backend.backend_vexma.repository.TitularRepository;
import com.backend.backend_vexma.repository.VehiculoRepository;

@Service
public class VehiculoService {

    @Autowired
    private VehiculoRepository vehiculoRepository;

    @Autowired
    private TitularRepository titularRepository;

    public List<Vehiculo> obtenerVehiculosTodos(){
        List<Vehiculo> vehiculos = vehiculoRepository.findAll();

        // Primero muestra vehiculos activos (fechaEgreso = null), y luego los vendidos // ordenamiento por 1) marca, 2) modelo, 3) año, 4) version
        return vehiculos.stream()
                .sorted(Comparator.comparing(Vehiculo::getFechaEgreso, Comparator.nullsFirst(Comparator.naturalOrder()))

                .thenComparing(Vehiculo::getMarca, String::compareToIgnoreCase)
                .thenComparing(Vehiculo::getModelo, String::compareToIgnoreCase)
                .thenComparing(Vehiculo::getAnio)
                .thenComparing(Vehiculo::getVersion, String::compareToIgnoreCase))

                .collect(Collectors.toList());

    }

    public Optional<Vehiculo> obtenerVehiculoPorId(Long id){
        return vehiculoRepository.findById(id);
    }

    public Vehiculo guardarVehiculo(Vehiculo vehiculo){
        
        Integer anioActual = LocalDate.now().getYear();
        // Validar año ingresado menor o igual al actual
        if((vehiculo.getAnio() != null) && (vehiculo.getAnio() > anioActual)){
            throw new IllegalArgumentException("El año " + vehiculo.getAnio()
                                                + " es incorrecto. No puede ser mayor a " + anioActual);
        }

        // Si no se ingreso una fecha de ingreso, se autocompleta con la actual
        if(vehiculo.getFechaIngreso() == null){
            vehiculo.setFechaIngreso(LocalDate.now());
        }

        if(vehiculo.getFechaIngreso().getYear() < vehiculo.getAnio()){
            throw new IllegalArgumentException("El año de ingreso del vehículo no puede ser menor a la del año del vehículo.");
        }

        if(vehiculo.getFechaIngreso().getYear() > anioActual){
            throw new IllegalArgumentException("El año " + vehiculo.getFechaIngreso().getYear()
                                                + " en la fecha de ingreso del vehículo es incorrecto. No puede ser mayor a " + anioActual);
        }

        if(vehiculo.getAnio() > anioActual){
            throw new IllegalArgumentException("El año " + vehiculo.getAnio() + " no puede ser mayor al año actual (" + anioActual + 
                                                "). Modifíque la claúsula.");
        }

        // Asegurar que al crear un nuevo vehiculo, no nazca vendido
        if(vehiculo.getId() == null){
            vehiculo.setFechaEgreso(null);
        }

        // Verificar si el titular tiene id
        if (vehiculo.getTitular() != null && vehiculo.getTitular().getId() != null) {

            Titular titularExistente = titularRepository.findById(vehiculo.getTitular().getId())
                    .orElseThrow(() -> new IllegalArgumentException("El titular seleccionado no existe"));
            
            vehiculo.setTitular(titularExistente);
        }

        
        if (vehiculo.getIsNuevo() == null) {
            throw new IllegalArgumentException("Es obligatorio indicar si el vehículo es Nuevo o Usado.");
        }

        vehiculo.setMarca(formatearTexto(vehiculo.getMarca()));
        vehiculo.setModelo(formatearTexto(vehiculo.getModelo()));
        vehiculo.setVersion(formatearTexto(vehiculo.getVersion()));

        if (vehiculo.getPatente() != null) {
            vehiculo.setPatente(vehiculo.getPatente().toUpperCase().trim());
        }

        return vehiculoRepository.save(vehiculo);
    }

    public void borrarVehiculo(Long id){
        vehiculoRepository.deleteById(id);
    }

    public Vehiculo marcarComoVendido(Long id, LocalDate fecha){

        Vehiculo vehiculo = vehiculoRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Vehiculo no encontrado."));

        LocalDate fechaFinal = (fecha != null) ? fecha : LocalDate.now();

        
        if (fechaFinal.isBefore(vehiculo.getFechaIngreso())){
            throw new IllegalArgumentException("La fecha de venta (" + fechaFinal + ") no puede ser anterior a la fecha de ingreso (" + vehiculo.getFechaIngreso() + ").");
        }

        if (fechaFinal.isAfter(LocalDate.now())){
             throw new IllegalArgumentException("La fecha de venta no puede ser futura.");
        }

        
        vehiculo.setFechaEgreso(fechaFinal);

       
        return vehiculoRepository.save(vehiculo);

    }

    public Vehiculo reingresarVehiculo(Long id, LocalDate fecha){
        Vehiculo vehiculo = vehiculoRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Vehiculo no encontrado."));

        LocalDate fechaFinal = fecha != null ? fecha : LocalDate.now();

        if (vehiculo.getFechaEgreso() == null) {
        throw new IllegalArgumentException("El vehículo no figura como vendido, no se puede reingresar.");
        }

        if(fechaFinal.isBefore(vehiculo.getFechaEgreso())){
            throw new IllegalArgumentException("La fecha de reingreso " + fechaFinal + " no puede ser menor a que la de venta (" + vehiculo.getFechaEgreso() + ") del vehículo.");
        }

        if(fechaFinal.isAfter(LocalDate.now())){
            throw new IllegalArgumentException("La fecha de reingreso no puede ser futura.");
        }
        

        vehiculo.setFechaIngreso(fechaFinal);
        vehiculo.setFechaEgreso(null);

        return vehiculoRepository.save(vehiculo);
        
    }


    // Método auxiliar para formatear texto (Capital Case)
    private String formatearTexto(String texto) {
        if (texto == null || texto.isEmpty()) {
            return texto;
        }

        String[] palabras = texto.toLowerCase().split("\\s+");
        StringBuilder resultado = new StringBuilder();

        for (String palabra : palabras) {
            if (palabra.length() > 0) {
                resultado.append(Character.toUpperCase(palabra.charAt(0)))
                         .append(palabra.substring(1))
                         .append(" ");
            }
        }
        return resultado.toString().trim();
    }

}
