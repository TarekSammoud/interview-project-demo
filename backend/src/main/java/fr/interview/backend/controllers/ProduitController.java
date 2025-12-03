package fr.interview.backend.controllers;

import fr.interview.backend.entities.Produit;
import fr.interview.backend.interfaces.IProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produit")
public class ProduitController {

    @Autowired
    IProduitService produitService;

    @GetMapping
    public List<Produit> getAllProduits(){
        return produitService.getAllProduits();
    }

    @PostMapping
    public Produit createProduit(@RequestBody Produit p){
        return produitService.createProduit(p);
    }

}
