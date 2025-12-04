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

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime dateCommande;

    @Enumerated(EnumType.STRING)
    private EtatCommande etat;

    @ManyToOne
    private User customer;


    @ManyToMany(cascade = CascadeType.ALL)
    private List<CommandeProduit> commandeProduits;

    @ManyToMany
    private List<ExtraCommande> extras;

    @PrePersist
    public void prePersist() {
        if (dateCommande == null) {
            dateCommande = LocalDateTime.now();
        }
        if (etat == null) {
            etat = EtatCommande.EN_ATTENTE;
        }
    }
}
