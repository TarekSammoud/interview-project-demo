package fr.interview.backend.services;

import fr.interview.backend.interfaces.ICommandeService;
import fr.interview.backend.repositories.ICommandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommandeService implements ICommandeService {
    @Autowired
    ICommandeRepository commandeRepository;
}
