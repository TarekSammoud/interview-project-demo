package fr.interview.backend.entities;

import fr.interview.backend.entities.enums.TypeExtra;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ExtraCommande implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;

    @Enumerated(EnumType.STRING)
    private TypeExtra type;

    private double prix;

    @ElementCollection
    @CollectionTable(name = "extra_commande_media", joinColumns = @JoinColumn(name = "extra_commande_id"))
    @Column(name = "media")
    private List<String> mediaList;

}

