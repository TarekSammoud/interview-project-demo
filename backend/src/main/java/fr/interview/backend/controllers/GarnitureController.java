package fr.interview.backend.controllers;

import fr.interview.backend.entities.Garniture;
import fr.interview.backend.entities.Produit;
import fr.interview.backend.interfaces.IGarnitureService;
import fr.interview.backend.interfaces.IProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/garniture")
public class GarnitureController {
    @Autowired
    IGarnitureService garnitureService;

    @GetMapping
    public List<Garniture> getAllGarnitures(){
        return garnitureService.getAllGarnitures();
    }
}
