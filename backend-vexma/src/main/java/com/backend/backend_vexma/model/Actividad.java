package com.backend.backend_vexma.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Actividad")
public class Actividad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "isPendiente", nullable = false)
    private Boolean isPendiente = true;
    @Column(name = "descripcion", nullable = false)
    private String descripcion;
    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;
    @Column(name = "gasto", nullable = false)
    private Double gasto;


    // Relaciones
    @ManyToOne
    @JoinColumn(name = "id_vehiculo", nullable = false)
    @JsonIgnoreProperties("actividades")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Vehiculo vehiculo;


    // Constructor
    public Actividad(){}

    public Actividad(Vehiculo vehiculo, Boolean isPendiente, String descripcion, LocalDate fecha, Double gasto){
        this.vehiculo = vehiculo;
        this.isPendiente = isPendiente;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.gasto = gasto;
    }

    // Getters y setters
    public Long getId(){
        return this.id;
    }

    public Vehiculo getVehiculo(){
        return this.vehiculo;
    }
    public void setVehiculo(Vehiculo vehiculo){
        this.vehiculo = vehiculo;
    }

    public Boolean getIsPendiente(){
        return this.isPendiente;
    }
    public void setIsPendiente(Boolean isPendiente){
        this.isPendiente = isPendiente;
    }

    public String getDescripcion(){
        return this.descripcion;
    }
    public void setDescripcion(String descripcion){
        this.descripcion = descripcion;
    }

    public LocalDate getFecha(){
        return this.fecha;
    }
    public void setFecha(LocalDate fecha){
        this.fecha = fecha;
    }

    public Double getGasto(){
        return gasto;
    }
    public void setGasto(Double gasto){
        this.gasto = gasto;
    }
}