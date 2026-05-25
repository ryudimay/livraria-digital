package com.livraria.backend.repository;

import com.livraria.backend.model.Livro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LivroRepository extends JpaRepository<Livro, Long> {

    List<Livro> findByCategoria(String categoria);

    List<Livro> findByTituloContainingIgnoreCase(String titulo);
}