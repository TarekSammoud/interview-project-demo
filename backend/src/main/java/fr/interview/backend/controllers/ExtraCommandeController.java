package fr.interview.backend.controllers;

import fr.interview.backend.entities.ExtraCommande;
import fr.interview.backend.interfaces.IExtraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("extra-commande")
public class ExtraCommandeController {
    @Autowired
    IExtraService extraService ;

    @GetMapping
    List<ExtraCommande> getAllExtras(){
        return extraService.getAllExtras();
    }
}
