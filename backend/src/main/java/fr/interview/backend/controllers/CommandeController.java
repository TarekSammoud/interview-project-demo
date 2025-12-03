package fr.interview.backend.controllers;

import fr.interview.backend.entities.Commande;
import fr.interview.backend.interfaces.ICommandeService;
import fr.interview.backend.repositories.ICommandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/commande")
public class CommandeController {
    @Autowired
    ICommandeService commandeService;

    @GetMapping
    public List<Commande> getAllCommandes(){
        return commandeService.getAllCommandes();
    }

    @GetMapping("{id}")
    public Optional<Commande> getCommandeById(@PathVariable Long id){
        return commandeService.getCommandeById(id);
    }

    @PostMapping
    public Commande createCommande(@RequestBody Commande commande){
        return commandeService.createCommande(commande);
    }

}
