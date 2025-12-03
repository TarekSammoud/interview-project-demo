package fr.interview.backend.interfaces;

import fr.interview.backend.entities.Produit;

import java.util.List;

public interface IProduitService {

    List<Produit> getAllProduits();
    Produit createProduit(Produit p);
}
