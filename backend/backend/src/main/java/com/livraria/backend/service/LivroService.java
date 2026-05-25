package com.livraria.backend.service;

import com.livraria.backend.model.Livro;
import com.livraria.backend.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LivroService {

    @Autowired
    private LivroRepository livroRepository;

    public List<Livro> listarTodos() {
        return livroRepository.findAll();
    }

    public Optional<Livro> buscarPorId(Long id) {
        return livroRepository.findById(id);
    }

    public List<Livro> buscarPorCategoria(String categoria) {
        return livroRepository.findByCategoria(categoria);
    }

    public List<Livro> buscarPorTitulo(String titulo) {
        return livroRepository.findByTituloContainingIgnoreCase(titulo);
    }

    public Livro salvar(Livro livro) {
        return livroRepository.save(livro);
    }

    public Livro atualizar(Long id, Livro livroAtualizado) {
        livroAtualizado.setId(id);
        return livroRepository.save(livroAtualizado);
    }

    public void deletar(Long id) {
        livroRepository.deleteById(id);
    }
}