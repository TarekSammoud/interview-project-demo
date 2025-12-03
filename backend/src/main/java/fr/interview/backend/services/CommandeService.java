package fr.interview.backend.services;

import fr.interview.backend.entities.Commande;
import fr.interview.backend.interfaces.ICommandeService;
import fr.interview.backend.repositories.ICommandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommandeService implements ICommandeService {
    @Autowired
    ICommandeRepository commandeRepository;

    @Override
    public Optional<Commande> getCommandeById(Long id) {
        return commandeRepository.findById(id);
    }

    @Override
    public List<Commande> getAllCommandes() {
        return commandeRepository.findAll();
    }

    @Override
    public Commande createCommande(Commande c) {
        return commandeRepository.save(c);
    }
}
