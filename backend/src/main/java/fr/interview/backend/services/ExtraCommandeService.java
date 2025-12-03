package fr.interview.backend.services;

import fr.interview.backend.entities.ExtraCommande;
import fr.interview.backend.interfaces.IExtraService;
import fr.interview.backend.repositories.IExtraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExtraCommandeService implements IExtraService {
    @Autowired
    IExtraRepository extraRepository;

    @Override
    public List<ExtraCommande> getAllExtras() {
        return extraRepository.findAll();
    }
}
