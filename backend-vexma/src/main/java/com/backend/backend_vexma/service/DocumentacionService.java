package com.backend.backend_vexma.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.backend_vexma.model.Documentacion;
import com.backend.backend_vexma.repository.DocumentacionRepository;

@Service
public class DocumentacionService {
    
    private final DocumentacionRepository documentacionRepository;

    public DocumentacionService(DocumentacionRepository documentacionRepository) {
        this.documentacionRepository = documentacionRepository;
    }

    public List<Documentacion> obtenerDocumentacionToda(){
        return documentacionRepository.findAll();
    }

    public Optional<Documentacion> obtenerDocumentacionPorId(Long id){
        return documentacionRepository.findById(id);
    }

    @Transactional
    public Documentacion guardarDocumentacion(Documentacion docNuevo){
        
        Optional<Documentacion> docExistente = documentacionRepository.findByVehiculo_Id(docNuevo.getVehiculo().getId());

        if (docExistente.isPresent()){
            Documentacion docDb = docExistente.get();
            
            docDb.setFormulario08(docNuevo.getFormulario08());
            docDb.setFechaFormulario08(docNuevo.getFechaFormulario08());
            
            docDb.setCedulaVerde(docNuevo.getCedulaVerde());
            docDb.setFechaCedulaVerde(docNuevo.getFechaCedulaVerde());
            
            docDb.setTitulo(docNuevo.getTitulo());
            docDb.setFechaTitulo(docNuevo.getFechaTitulo());
            
            docDb.setVerificacionPolicial(docNuevo.getVerificacionPolicial());
            docDb.setFechaVerificacionPolicial(docNuevo.getFechaVerificacionPolicial());
            
            docDb.setInformeDominioRnpa(docNuevo.getInformeDominioRnpa());
            docDb.setFechaInformeDominioRnpa(docNuevo.getFechaInformeDominioRnpa());
            
            docDb.setInformeMultasRnpa(docNuevo.getInformeMultasRnpa());
            docDb.setFechaInformeMultasRnpa(docNuevo.getFechaInformeMultasRnpa());
            
            docDb.setEstadoImpositivo(docNuevo.getEstadoImpositivo());
            docDb.setFechaEstadoImpositivo(docNuevo.getFechaEstadoImpositivo());
            
            docDb.setManuales(docNuevo.getManuales());
            docDb.setFechaManuales(docNuevo.getFechaManuales());
            
            docDb.setDuplicadoLlaves(docNuevo.getDuplicadoLlaves());
            docDb.setFechaDuplicadoLlaves(docNuevo.getFechaDuplicadoLlaves());
            
            docDb.setItv(docNuevo.getItv());
            docDb.setFechaItv(docNuevo.getFechaItv());

            return documentacionRepository.save(docDb);
        } else {
            return documentacionRepository.save(docNuevo);
        }
    }

    public void borrarDocumentacion(Long id){
        documentacionRepository.deleteById(id);
    }
}