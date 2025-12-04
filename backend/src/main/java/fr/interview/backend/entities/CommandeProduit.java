package fr.interview.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CommandeProduit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "commande_id")
    private Commande commande;

    @ManyToOne
    @JoinColumn(name = "produit_id")
    private Produit produit;

    @ManyToMany
    @JoinTable(
            name = "commande_produit_garniture",
            joinColumns = @JoinColumn(name = "commande_produit_id"),
            inverseJoinColumns = @JoinColumn(name = "garniture_id")
    )
    private List<Garniture> garnitures ;
}

