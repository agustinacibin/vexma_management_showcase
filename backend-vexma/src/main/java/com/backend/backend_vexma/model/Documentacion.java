package com.backend.backend_vexma.model;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Documentacion")
public class Documentacion {
    // JPA Annotations and definition of atributes and columns

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "formulario08", nullable = false)
    private Boolean formulario08;
    @Column(name = "cedulaVerde", nullable = false)
    private Boolean cedulaVerde;
    @Column(name = "titulo", nullable = false)
    private Boolean titulo;
    @Column(name = "verificacionPolicial", nullable = false)
    private Boolean verificacionPolicial;
    @Column(name = "informeDominioRnpa", nullable = false)
    private Boolean informeDominioRnpa;
    @Column(name = "informeMultasRnpa", nullable = false)
    private Boolean informeMultasRnpa;
    @Column(name = "estadoImpositivo", nullable = false)
    private Boolean estadoImpositivo;
    @Column(name = "manuales", nullable = false)
    private Boolean manuales;
    @Column(name = "duplicadoLlaves", nullable = false)
    private Boolean duplicadoLlaves;
    @Column(name = "itv", nullable = false)
    private Boolean itv;

    @Column(name = "fecha_formulario08")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaFormulario08;
    @Column(name = "fecha_cedula_verde")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaCedulaVerde;
    @Column(name = "fecha_titulo")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaTitulo;
    @Column(name = "fecha_verificacion_policial")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaVerificacionPolicial;
    @Column(name = "fecha_informe_dominio_rnpa")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaInformeDominioRnpa;
    @Column(name = "fecha_informe_multas_rnpa")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaInformeMultasRnpa;
    @Column(name = "fecha_estado_impositivo")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaEstadoImpositivo;
    @Column(name = "fecha_manuales")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaManuales;
    @Column(name = "fecha_duplicado_llaves")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaDuplicadoLlaves;
    @Column(name = "fecha_itv")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaItv;


    // Relaciones
    @OneToOne
    @JoinColumn(name = "id_vehiculo", nullable = false)
    @JsonIgnoreProperties("documentacion")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Vehiculo vehiculo;


    // Constructor
    public Documentacion(){}

    public Documentacion(Vehiculo vehiculo, 
                         Boolean formulario08, LocalDate fechaFormulario08,
                         Boolean cedulaVerde, LocalDate fechaCedulaVerde,
                         Boolean titulo, LocalDate fechaTitulo,
                         Boolean verificacionPolicial, LocalDate fechaVerificacionPolicial,
                         Boolean informeDominioRnpa, LocalDate fechaInformeDominioRnpa,
                         Boolean informeMultasRnpa, LocalDate fechaInformeMultasRnpa,
                         Boolean estadoImpositivo, LocalDate fechaEstadoImpositivo,
                         Boolean manuales, LocalDate fechaManuales,
                         Boolean duplicadoLlaves, LocalDate fechaDuplicadoLlaves,
                         Boolean itv, LocalDate fechaItv) {
        
        this.vehiculo = vehiculo;
        
        this.formulario08 = formulario08;
        this.fechaFormulario08 = fechaFormulario08;
        
        this.cedulaVerde = cedulaVerde;
        this.fechaCedulaVerde = fechaCedulaVerde;
        
        this.titulo = titulo;
        this.fechaTitulo = fechaTitulo;
        
        this.verificacionPolicial = verificacionPolicial;
        this.fechaVerificacionPolicial = fechaVerificacionPolicial;
        
        this.informeDominioRnpa = informeDominioRnpa;
        this.fechaInformeDominioRnpa = fechaInformeDominioRnpa;
        
        this.informeMultasRnpa = informeMultasRnpa;
        this.fechaInformeMultasRnpa = fechaInformeMultasRnpa;
        
        this.estadoImpositivo = estadoImpositivo;
        this.fechaEstadoImpositivo = fechaEstadoImpositivo;
        
        this.manuales = manuales;
        this.fechaManuales = fechaManuales;
        
        this.duplicadoLlaves = duplicadoLlaves;
        this.fechaDuplicadoLlaves = fechaDuplicadoLlaves;
        
        this.itv = itv;
        this.fechaItv = fechaItv;
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

    public Boolean getFormulario08(){
        return this.formulario08;
    }
    public void setFormulario08(Boolean formulario08){
        this.formulario08 = formulario08;
    }

    public Boolean getCedulaVerde(){
        return this.cedulaVerde;
    }
    public void setCedulaVerde(Boolean cedulaVerde){
        this.cedulaVerde = cedulaVerde;
    }

    public Boolean getTitulo(){
        return this.titulo;
    }
    public void setTitulo(Boolean titulo){
        this.titulo = titulo;
    }

    public Boolean getVerificacionPolicial(){
        return this.verificacionPolicial;
    }
    public void setVerificacionPolicial(Boolean verificacionPolicial){
        this.verificacionPolicial = verificacionPolicial;
    }

    public Boolean getInformeDominioRnpa(){
        return this.informeDominioRnpa;
    }
    public void setInformeDominioRnpa(Boolean informeDominioRnpa){
        this.informeDominioRnpa = informeDominioRnpa;
    }

    public Boolean getInformeMultasRnpa(){
        return this.informeMultasRnpa;
    }
    public void setInformeMultasRnpa(Boolean informeMultasRnpa){
        this.informeMultasRnpa = informeMultasRnpa;
    }

    public Boolean getEstadoImpositivo(){
        return this.estadoImpositivo;
    }
    public void setEstadoImpositivo(Boolean estadoImpositivo){
        this.estadoImpositivo = estadoImpositivo;
    }

    public Boolean getManuales(){
        return this.manuales;
    }
    public void setManuales(Boolean manuales){
        this.manuales = manuales;
    }

    public Boolean getDuplicadoLlaves(){
        return this.duplicadoLlaves;
    }
    public void setDuplicadoLlaves(Boolean duplicadoLlaves){
        this.duplicadoLlaves = duplicadoLlaves;
    }

    public Boolean getItv(){
        return this.itv;
    }
    public void setItv(Boolean itv){
        this.itv = itv;
    }

    

    // isCompleta --> en base al estado de determinados documentos, retorna si el estado general de la documentacion es completa o incompleta
    public Boolean isCompleta(){
        return this.formulario08 && 
                this.cedulaVerde && 
                this.titulo && 
                this.verificacionPolicial && 
                this.informeDominioRnpa && 
                this.informeMultasRnpa && 
                this.estadoImpositivo;
    }


    public LocalDate getFechaFormulario08() {
        return fechaFormulario08;
    }

    public void setFechaFormulario08(LocalDate fechaFormulario08) {
        this.fechaFormulario08 = fechaFormulario08;
    }

    public LocalDate getFechaCedulaVerde() {
        return fechaCedulaVerde;
    }

    public void setFechaCedulaVerde(LocalDate fechaCedulaVerde) {
        this.fechaCedulaVerde = fechaCedulaVerde;
    }

    public LocalDate getFechaTitulo() {
        return fechaTitulo;
    }

    public void setFechaTitulo(LocalDate fechaTitulo) {
        this.fechaTitulo = fechaTitulo;
    }

    public LocalDate getFechaVerificacionPolicial() {
        return fechaVerificacionPolicial;
    }

    public void setFechaVerificacionPolicial(LocalDate fechaVerificacionPolicial) {
        this.fechaVerificacionPolicial = fechaVerificacionPolicial;
    }

    public LocalDate getFechaInformeDominioRnpa() {
        return fechaInformeDominioRnpa;
    }

    public void setFechaInformeDominioRnpa(LocalDate fechaInformeDominioRnpa) {
        this.fechaInformeDominioRnpa = fechaInformeDominioRnpa;
    }

    public LocalDate getFechaInformeMultasRnpa() {
        return fechaInformeMultasRnpa;
    }

    public void setFechaInformeMultasRnpa(LocalDate fechaInformeMultasRnpa) {
        this.fechaInformeMultasRnpa = fechaInformeMultasRnpa;
    }

    public LocalDate getFechaEstadoImpositivo() {
        return fechaEstadoImpositivo;
    }

    public void setFechaEstadoImpositivo(LocalDate fechaEstadoImpositivo) {
        this.fechaEstadoImpositivo = fechaEstadoImpositivo;
    }

    public LocalDate getFechaManuales() {
        return fechaManuales;
    }

    public void setFechaManuales(LocalDate fechaManuales) {
        this.fechaManuales = fechaManuales;
    }

    public LocalDate getFechaDuplicadoLlaves() {
        return fechaDuplicadoLlaves;
    }

    public void setFechaDuplicadoLlaves(LocalDate fechaDuplicadoLlaves) {
        this.fechaDuplicadoLlaves = fechaDuplicadoLlaves;
    }

    public LocalDate getFechaItv() {
        return fechaItv;
    }

    public void setFechaItv(LocalDate fechaItv) {
        this.fechaItv = fechaItv;
    }
}
