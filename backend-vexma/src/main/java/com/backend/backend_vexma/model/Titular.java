package com.backend.backend_vexma.model;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "titular")
public class Titular {
    //Anotaciones JPA | definicion de columnas y atributos
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dni", nullable = false, precision = 15, unique = true)
    private Long dni;
    @Column(name = "nombre", nullable = false)
    private String nombre;
    @Column(name = "apellido", nullable = false)
    private String apellido;
    @Column(name = "fechaNacimiento", nullable = false)
    private LocalDate fechaNacimiento;


    // Relaciones
    @OneToMany(mappedBy = "titular")
    private List<Vehiculo> vehiculos;

    // Constructor
    public Titular(){}
     
    public Titular(Long dni, String nombre, String apellido, LocalDate fechaNacimiento) {
        this.dni = dni;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
    }  

    // Getters y setters
    public Long getId(){
        return this.id;
    }

    public Long getDni(){
        return this.dni;
    }
    public void setDni(Long dni){
        this.dni = dni;
    }

    public String getNombre(){
        return this.nombre;
    }
    public void setNombre(String nombre){
        this.nombre = nombre;
    }

    public String getApellido(){
        return this.apellido;
    }
    public void setApellido(String apellido){
        this.apellido = apellido;
    }

    public LocalDate getFechaNacimiento(){
        return this.fechaNacimiento;
    }
    public void setFechaNacimiento(LocalDate fechaNacimiento){
        this.fechaNacimiento = fechaNacimiento;
    }



}
