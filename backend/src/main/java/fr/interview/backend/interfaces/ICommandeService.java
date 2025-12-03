package fr.interview.backend.interfaces;

import fr.interview.backend.entities.Commande;

import java.util.List;
import java.util.Optional;

public interface ICommandeService {

    Optional<Commande> getCommandeById(Long id);
    List<Commande> getAllCommandes();
    Commande createCommande(Commande c);

}
