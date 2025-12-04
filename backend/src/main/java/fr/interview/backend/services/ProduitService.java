package fr.interview.backend.services;

import fr.interview.backend.entities.Produit;
import fr.interview.backend.interfaces.IProduitService;
import fr.interview.backend.repositories.IProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ProduitService implements IProduitService {
    @Autowired
    IProduitRepository produitRepository;

    @Autowired
    FileUploadService fileUploadService;


    @Override
    public List<Produit> getAllProduits() {
        return produitRepository.findAll();
    }

    @Override
    public Optional<Produit> getProduitById(Long id) {
        return produitRepository.findById(id);
    }

    @Override
    public Produit createProduit(Produit p, MultipartFile f) throws IOException {

        String mediaUrl = fileUploadService.saveFile(f);

        p.setMedia(mediaUrl);
        return produitRepository.save(p);
    }

    @Override
    public List<Produit> getProduitByQuery(String query) {
        return produitRepository.findProduitsByNomContainingIgnoreCase(query);
    }
}
