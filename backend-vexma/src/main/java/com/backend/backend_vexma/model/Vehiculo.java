package com.backend.backend_vexma.model;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;


@Entity
@Table(name = "Vehiculo")
public class Vehiculo { 
    // Anotaciones JPA | definicion de columnas y atributos

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "patente", length = 7, nullable = false, unique = true)
    private String patente;
    @Column(name = "marca", nullable = false)
    private String marca;
    @Column(name = "modelo", nullable = false)
    private String modelo;
    @Column(name = "anio", precision = 4, nullable = false)
    private Integer anio;
    @Column(name = "version", nullable = false)
    private String version;
    @Enumerated(EnumType.STRING)
    private TipoVehiculo tipo;
    @Column(name = "isNuevo", nullable = false)
    private Boolean isNuevo;
    @Column(name = "precioCompra", nullable = false, scale = 3)
    private Double precioCompra;
    @Column(name = "precioLista", nullable = false, scale = 3)
    private Double precioLista;
    @Column(name = "fechaIngreso", nullable = false)
    private LocalDate fechaIngreso;
    @Column(name = "fechaEgreso", nullable = true)
    private LocalDate fechaEgreso;



    // Relaciones
    @ManyToOne
    @JoinColumn(name = "id_titular", nullable = false)
    @JsonIgnoreProperties("vehiculos")
    private Titular titular;

    @OneToMany(mappedBy = "vehiculo", cascade = CascadeType.ALL)
    private List<Actividad> actividades;

    @OneToOne(mappedBy = "vehiculo", cascade = CascadeType.ALL)
    private Documentacion documentacion;


    // Constructor
    public Vehiculo(){}

    public Vehiculo(String patente, String marca, String modelo, Integer anio, String version, TipoVehiculo tipo, Titular titular, Boolean isNuevo, Double precioCompra, Double precioLista, LocalDate fechaIngreso, LocalDate fechaEgreso){
        this.patente = patente;
        this.marca = marca;
        this.modelo = modelo;
        this.anio = anio;
        this.version = version;
        this.tipo = tipo;
        this.titular = titular;
        this.isNuevo = isNuevo;
        this.precioCompra = precioCompra;
        this.precioLista = precioLista;
        this.fechaIngreso = fechaIngreso;
        this.fechaEgreso = fechaEgreso;
    }

    public Vehiculo(String patente, String marca, String modelo, Integer anio, String version, TipoVehiculo tipo, Titular titular, Boolean isNuevo, Double precioCompra, Double precioLista, LocalDate fechaIngreso){
        this.patente = patente;
        this.marca = marca;
        this.modelo = modelo;
        this.anio = anio;
        this.version = version;
        this.tipo = tipo;
        this.titular = titular;
        this.isNuevo = isNuevo;
        this.precioCompra = precioCompra;
        this.precioLista = precioLista;
        this.fechaIngreso = fechaIngreso;
        this.fechaEgreso = null;
    }


    // Getters y setters
    public Long getId(){
        return this.id;
    }

    public String getPatente(){
        return this.patente;
    }
    public void setPatente(String patente){
        this.patente = patente;
    }

    public String getMarca(){
        return this.marca;
    }
    public void setMarca(String marca){
        this.marca = marca;
    }

    public String getModelo(){
        return this.modelo;
    }
    public void setModelo(String modelo){
        this.modelo = modelo;
    }

    public Integer getAnio(){
        return this.anio;
    }
    public void setAnio(Integer anio){
        this.anio = anio;
    }

    public String getVersion(){
        return this.version;
    }
    public void setVersion(String version){
        this.version = version;
    }

    public TipoVehiculo getTipo(){
        return this.tipo;
    }
    public void setTipo(TipoVehiculo tipo){
        this.tipo = tipo;
    }

    public Boolean getIsNuevo(){
        return isNuevo;
    }
    public void setIsNuevo(Boolean isNuevo){
        this.isNuevo = isNuevo;
    }

    public Double getPrecioCompra(){
        return this.precioCompra;
    }
    public void setPrecioCompra(Double precioCompra){
        this.precioCompra = precioCompra;
    }

    public Double getPrecioLista(){
        return this.precioLista;
    }
    public void setPrecioLista(Double precioLista){
        this.precioLista = precioLista;
    }

    public LocalDate getFechaIngreso(){
        return this.fechaIngreso;
    }
    public void setFechaIngreso(LocalDate fechaIngreso){
        this.fechaIngreso = fechaIngreso;
    }    

    public LocalDate getFechaEgreso(){
        return this.fechaEgreso;
    }
    public void setFechaEgreso(LocalDate fechaEgreso){
        this.fechaEgreso = fechaEgreso;
    }

    public Titular getTitular(){
        return this.titular;
    }
    public void setTitular(Titular titular){
        this.titular = titular;
    }

    public List<Actividad> getActividades() {
        return actividades;
    }
    public void setActividades(List<Actividad> actividades) {
        this.actividades = actividades;
    }

    public Documentacion getDocumentacion(){
        return this.documentacion;
    }
    public void setDocumentacion(Documentacion documentacion){
        this.documentacion = documentacion;
    }

    // Metodos
    public Double getGastoTotal(){
        if (actividades == null || actividades.isEmpty()){
            return 0.0;
        } else{
            return actividades.stream()
                    .filter(actividad -> actividad.getGasto() != null).filter(actividad -> Boolean.FALSE.equals(actividad.getIsPendiente()))
                    .mapToDouble(actividad -> actividad.getGasto()).sum();
        }
    }

}
