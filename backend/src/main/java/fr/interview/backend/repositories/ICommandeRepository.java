package fr.interview.backend.repositories;

import fr.interview.backend.entities.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ICommandeRepository extends JpaRepository<Commande,Long> {
    @Query("""
    SELECT DISTINCT c FROM Commande c
    LEFT JOIN FETCH c.customer cust
    LEFT JOIN FETCH c.commandeProduits cp
    LEFT JOIN FETCH cp.produit p
    LEFT JOIN FETCH cp.garnitures g
    LEFT JOIN FETCH c.extras
    WHERE c.id = :id
    """)
    Optional<Commande> findByIdFullyLoaded(@Param("id") Long id);
}
