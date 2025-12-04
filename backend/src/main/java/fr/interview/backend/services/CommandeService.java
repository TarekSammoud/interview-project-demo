package fr.interview.backend.services;

import fr.interview.backend.entities.Commande;
import fr.interview.backend.entities.User;
import fr.interview.backend.interfaces.ICommandeService;
import fr.interview.backend.repositories.ICommandeRepository;
import fr.interview.backend.repositories.UserRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CommandeService implements ICommandeService {
    @Autowired
    ICommandeRepository commandeRepository;
    @Autowired
    EmailService emailService;
    @Autowired
    UserRepository userRepository;

    @Override
    public Optional<Commande> getCommandeById(Long id) {
        return commandeRepository.findById(id);
    }

    @Override
    public List<Commande> getAllCommandes() {
        return commandeRepository.findAll();
    }

    @Override
    @Transactional
    public Commande createCommande(Commande c)  {
        Commande saved = commandeRepository.save(c);
        return saved;
    }
}
