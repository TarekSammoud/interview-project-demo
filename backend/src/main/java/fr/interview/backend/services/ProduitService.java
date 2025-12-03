package fr.interview.backend.services;

import fr.interview.backend.entities.Produit;
import fr.interview.backend.interfaces.IProduitService;
import fr.interview.backend.repositories.IProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProduitService implements IProduitService {
    @Autowired
    IProduitRepository produitRepository;

    @Override
    public List<Produit> getAllProduits() {
        return produitRepository.findAll();
    }

    @Override
    public Produit createProduit(Produit p) {
        return produitRepository.save(p);
    }
}
