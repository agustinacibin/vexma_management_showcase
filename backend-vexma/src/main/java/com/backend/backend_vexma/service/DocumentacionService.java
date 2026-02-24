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

    public List<Documentacion> obtenerDocumentacionToda() {
        return documentacionRepository.findAll();
    }

    public Optional<Documentacion> obtenerDocumentacionPorId(Long id) {
        return documentacionRepository.findById(id);
    }

    @Transactional
    public Documentacion guardarDocumentacion(Documentacion docNuevo) {
        if (docNuevo.getId() != null && documentacionRepository.existsById(docNuevo.getId())) {
            return documentacionRepository.save(docNuevo);
        }

        Optional<Documentacion> docExistente = documentacionRepository.findByVehiculo_Id(docNuevo.getVehiculo().getId());

        if (docExistente.isPresent()) {
            Documentacion docDb = docExistente.get();
            actualizarDatos(docDb, docNuevo);
            return documentacionRepository.save(docDb);
        }

        return documentacionRepository.save(docNuevo);
    }

    private void actualizarDatos(Documentacion destino, Documentacion origen) {
        destino.setFormulario08(origen.getFormulario08());
        destino.setFechaFormulario08(origen.getFechaFormulario08());
        destino.setCedulaVerde(origen.getCedulaVerde());
        destino.setFechaCedulaVerde(origen.getFechaCedulaVerde());
        destino.setTitulo(origen.getTitulo());
        destino.setFechaTitulo(origen.getFechaTitulo());
        destino.setVerificacionPolicial(origen.getVerificacionPolicial());
        destino.setFechaVerificacionPolicial(origen.getFechaVerificacionPolicial());
        destino.setInformeDominioRnpa(origen.getInformeDominioRnpa());
        destino.setFechaInformeDominioRnpa(origen.getFechaInformeDominioRnpa());
        destino.setInformeMultasRnpa(origen.getInformeMultasRnpa());
        destino.setFechaInformeMultasRnpa(origen.getFechaInformeMultasRnpa());
        destino.setEstadoImpositivo(origen.getEstadoImpositivo());
        destino.setFechaEstadoImpositivo(origen.getFechaEstadoImpositivo());
        destino.setManuales(origen.getManuales());
        destino.setFechaManuales(origen.getFechaManuales());
        destino.setDuplicadoLlaves(origen.getDuplicadoLlaves());
        destino.setFechaDuplicadoLlaves(origen.getFechaDuplicadoLlaves());
        destino.setItv(origen.getItv());
        destino.setFechaItv(origen.getFechaItv());
    }

    public void borrarDocumentacion(Long id) {
        documentacionRepository.deleteById(id);
    }
}
