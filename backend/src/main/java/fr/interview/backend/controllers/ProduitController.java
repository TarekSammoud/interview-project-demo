package fr.interview.backend.controllers;

import fr.interview.backend.entities.Produit;
import fr.interview.backend.interfaces.IProduitService;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/produit")
public class ProduitController {

    @Autowired
    IProduitService produitService;

    @GetMapping
    public List<Produit> getAllProduits(){
        return produitService.getAllProduits();
    }

    @GetMapping("id")
    public Optional<Produit> getProduitById(@PathVariable Long id){
        return produitService.getProduitById(id);
    }


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Produit createProduit(
            @RequestPart("data") @Parameter(description = "Produit data") Produit produit,
            @RequestPart("file") @Parameter(description = "Image file") MultipartFile file
    ) throws IOException {
        return produitService.createProduit(produit, file);
    }

}
