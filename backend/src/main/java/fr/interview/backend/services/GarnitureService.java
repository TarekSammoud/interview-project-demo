package fr.interview.backend.services;

import fr.interview.backend.entities.Garniture;
import fr.interview.backend.interfaces.IGarnitureService;
import fr.interview.backend.repositories.IGarnitureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GarnitureService implements IGarnitureService {
    @Autowired
    IGarnitureRepository garnitureRepository;

    @Override
    public List<Garniture> getAllGarnitures() {
        return garnitureRepository.findAll();
    }
}
