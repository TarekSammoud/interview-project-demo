package fr.interview.backend.interfaces;

import fr.interview.backend.entities.Produit;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface IProduitService {

    List<Produit> getAllProduits();
    Optional<Produit> getProduitById(Long id);
    Produit createProduit(Produit p, MultipartFile f) throws IOException;
}
