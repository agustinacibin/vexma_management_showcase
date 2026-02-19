package com.backend.backend_vexma.service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend_vexma.model.Titular;
import com.backend.backend_vexma.repository.TitularRepository;

@Service
public class TitularService {
    
    @Autowired
    private TitularRepository titularRepository;

    public List<Titular> obtenerTitularesTodos(){
        List<Titular> titulares = titularRepository.findAll();

        return titulares.stream()
                        .sorted(Comparator.comparing(Titular::getApellido, String::compareToIgnoreCase)
                                .thenComparing(Titular::getNombre, String::compareToIgnoreCase))
                        .collect(Collectors.toList());
    }

    public Optional<Titular> obtenerTitularPorId(Long id){
        return titularRepository.findById(id);
    }

    public Titular guardarTitular(Titular titular){
        if( (titular.getDni() == null) ||
            (titular.getNombre() == null) || (titular.getNombre().isEmpty()) ||
            (titular.getApellido() == null) || (titular.getApellido().isEmpty()) ||
            (titular.getFechaNacimiento() == null)){
            
            throw new IllegalArgumentException("Debe completar todos los campos obligatorios.");
        }

        titular.setNombre(formatearTexto(titular.getNombre()));
        titular.setApellido(formatearTexto(titular.getApellido()));
        
        return titularRepository.save(titular);
    }

    public void borrarTitular(Long id){
        titularRepository.deleteById(id);
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
