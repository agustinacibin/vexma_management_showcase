package com.backend.backend_vexma.dtos;

import java.time.LocalDate;

import com.backend.backend_vexma.model.Titular;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class VehiculoDTO {

    @NotBlank(message="La patente no puede estar vacía")
    @Pattern(regexp = "^[A-Z0-9]{6,7}$", message = "La patente debe tener 6 o 7 caracteres alfanumericos")
    private String patente;

    @NotBlank(message="La marca no puede estar vacía")
    private String marca;

    @NotBlank(message="El modelo no puede estar vacío")
    private String modelo;

    @NotNull(message="El año no puede estar vacío")
    @Min(value=1000, message="El año debe tener como minimo 4 digitos")
    @Max(value=9999, message="El año del vehiculo no puede superar el año actual")
    private Integer anio;

    @NotBlank(message="El tipo no puede estar vacío")
    private String tipo;

    @NotBlank(message="La version no puede estar vacía")
    private String version;

    @NotNull(message = "Debes indicar si es Nuevo o Usado")
    private Boolean isNuevo;

    private LocalDate fechaIngreso;
    private LocalDate fechaEgreso;

    @NotNull(message="Debe seleccionar obligatoriamente un titular")
    private Titular titular;

    @NotNull(message="El Precio de Compra no puede estar vacío")
    private Double precioCompra;
    @NotNull(message="El Precio de Lista no puede estar vacío")
    private Double precioLista;


    public String getPatente() {
        return patente;
    }
    public void setPatente(String patente) {
        this.patente = patente;
    }

    public String getMarca() {
        return marca;
    }
    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }
    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public Integer getAnio() {
        return anio;
    }
    public void setAnio(Integer anio) {
        this.anio = anio;
    }

    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getVersion() {
        return version;
    }
    public void setVersion(String version) {
        this.version = version;
    }

    public Boolean getIsNuevo() {
        return isNuevo;
    }
    public void setIsNuevo(Boolean isNuevo) {
        this.isNuevo = isNuevo;
    }

    public LocalDate getFechaIngreso() {
        return fechaIngreso;
    }
    public void setFechaIngreso(LocalDate fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public Titular getTitular() {
        return titular;
    }
    public void setTitular(Titular titular) {
        this.titular = titular;
    }

    public Double getPrecioCompra() {
        return precioCompra;
    }
    public void setPrecioCompra(Double precioCompra) {
        this.precioCompra = precioCompra;
    }

    public Double getPrecioLista() {
        return precioLista;
    }
    public void setPrecioLista(Double precioLista) {
        this.precioLista = precioLista;
    }

    public LocalDate getFechaEgreso() {
        return fechaEgreso;
    }

    public void setFechaEgreso(LocalDate fechaEgreso) {
        this.fechaEgreso = fechaEgreso;
    }




    
    
    
}
