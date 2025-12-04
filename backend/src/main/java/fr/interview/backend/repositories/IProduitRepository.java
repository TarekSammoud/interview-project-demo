package fr.interview.backend.repositories;

import fr.interview.backend.entities.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IProduitRepository extends JpaRepository<Produit,Long> {
    List<Produit> findProduitsByNomContainingIgnoreCase(String query);
}
