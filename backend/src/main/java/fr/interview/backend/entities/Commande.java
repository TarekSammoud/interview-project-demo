package fr.interview.backend.entities;

import fr.interview.backend.entities.enums.EtatCommande;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Commande implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dateCommande;

    @Enumerated(EnumType.STRING)
    private EtatCommande etat;

    @ManyToMany(cascade = CascadeType.ALL)
    private List<CommandeProduit> commandeProduits;

    @ManyToMany
    private List<ExtraCommande> extras;
}
