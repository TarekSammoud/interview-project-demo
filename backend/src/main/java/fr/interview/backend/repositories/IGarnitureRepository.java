package fr.interview.backend.repositories;

import fr.interview.backend.entities.Garniture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IGarnitureRepository  extends JpaRepository<Garniture,Long> {
}
