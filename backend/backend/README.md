# 📚 Livraria Digital

Sistema de e-commerce de livros desenvolvido como Projeto Integrador da disciplina de Tecnologia Web.

## 🛠️ Tecnologias Utilizadas

- **Back-End:** Java 17 + Spring Boot 3.5.14
- **Banco de Dados:** MySQL 9.6
- **Front-End:** HTML5, CSS3 e JavaScript puro
- **Documentação da API:** Swagger (SpringDoc OpenAPI 2.3.0)

## 📦 Dependências do Back-End (pom.xml)

| Dependência | Função |
|---|---|
| Spring Boot Starter Web | Criação das APIs REST |
| Spring Boot Starter Data JPA | Comunicação com o banco de dados |
| MySQL Connector J | Driver de conexão com o MySQL |
| Lombok | Redução de código boilerplate |
| Spring Boot DevTools | Reinicialização automática em desenvolvimento |
| SpringDoc OpenAPI UI | Documentação automática dos endpoints |
| Spring Boot Starter Test | Testes unitários e de integração |

## ⚙️ Como Rodar o Projeto

### Pré-requisitos
- Java 17 instalado
- MySQL instalado e rodando
- VS Code com Extension Pack for Java

### Banco de Dados
1. Abra o MySQL Workbench
2. Execute o comando abaixo para criar o banco:

    CREATE DATABASE livraria_digital;

### Back-End
1. Abra a pasta backend no VS Code
2. Configure suas credenciais em src/main/resources/application.properties
3. No terminal execute:

    .\mvnw.cmd spring-boot:run

4. O servidor irá rodar em http://localhost:8080

### Front-End
1. Abra a pasta frontend no VS Code
2. Clique com botão direito no index.html
3. Selecione Open with Live Server
4. O sistema abrirá em http://127.0.0.1:5500

## 🗄️ Diagrama do Banco de Dados

![MER Livraria Digital](mer_livraria_final.svg)

## 🔗 Rotas da API

Base URL: http://localhost:8080/api/livros

| Método | Rota | Descrição |
|---|---|---|
| GET | /api/livros | Lista todos os livros |
| GET | /api/livros/{id} | Busca livro por ID |
| GET | /api/livros/buscar?titulo= | Busca livros por título |
| GET | /api/livros/categoria/{categoria} | Filtra livros por categoria |
| POST | /api/livros | Cadastra novo livro |
| PUT | /api/livros/{id} | Atualiza livro existente |
| DELETE | /api/livros/{id} | Remove livro |

## 📖 Documentação Interativa

Com o backend rodando, acesse:

http://localhost:8080/swagger-ui/index.html

## 👥 Equipe

Projeto desenvolvido para a disciplina de Tecnologia Web — Sistemas de Informação (5º Período).