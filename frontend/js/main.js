const API = 'http://localhost:8080/api/livros';

function mostrarSecao(id) {
    document.querySelectorAll('.secao').forEach(s => s.classList.remove('ativa'));
    document.getElementById(id).classList.add('ativa');
    if (id === 'admin') carregarAdmin();
    if (id === 'catalogo') carregarLivros();
}

async function carregarLivros() {
    const lista = document.getElementById('listaLivros');
    lista.innerHTML = '<p class="carregando">Carregando livros...</p>';
    try {
        const res = await fetch(API);
        const livros = await res.json();
        if (livros.length === 0) {
            lista.innerHTML = '<p class="sem-livros">Nenhum livro cadastrado ainda.</p>';
            return;
        }
        lista.innerHTML = livros.map(livro => cartaoLivro(livro)).join('');
    } catch (err) {
        lista.innerHTML = '<p class="sem-livros">Erro ao carregar livros. Backend está rodando?</p>';
    }
}

function cartaoLivro(livro) {
    const imagem = livro.imagemUrl
        ? `<img src="${livro.imagemUrl}" alt="${livro.titulo}">`
        : `<div class="sem-imagem">📚</div>`;
    return `
        <div class="card-livro" onclick="abrirModal(${livro.id})">
            ${imagem}
            <div class="card-info">
                <h3>${livro.titulo}</h3>
                <p class="autor">${livro.autor}</p>
                <span class="categoria">${livro.categoria}</span>
                <p class="preco">R$ ${livro.preco.toFixed(2)}</p>
                <p class="estoque">Estoque: ${livro.estoque}</p>
            </div>
        </div>`;
}

async function abrirModal(id) {
    try {
        const res = await fetch(`${API}/${id}`);
        const livro = await res.json();
        const imagem = livro.imagemUrl
            ? `<img src="${livro.imagemUrl}" style="width:100%;border-radius:8px;margin-bottom:15px;">`
            : `<div style="text-align:center;font-size:5rem;margin-bottom:15px;">📚</div>`;
        document.getElementById('modalCorpo').innerHTML = `
            ${imagem}
            <h2>${livro.titulo}</h2>
            <p style="color:#666;margin:5px 0">por ${livro.autor}</p>
            <span class="categoria">${livro.categoria}</span>
            <p style="margin-top:15px">${livro.descricao || 'Sem descrição.'}</p>
            <p style="font-size:1.5rem;font-weight:bold;margin-top:15px;color:#1a1a2e">R$ ${livro.preco.toFixed(2)}</p>
            <p style="color:#888">Estoque disponível: ${livro.estoque}</p>`;
        document.getElementById('modal').classList.add('aberto');
    } catch (err) {
        alert('Erro ao carregar detalhes do livro.');
    }
}

function fecharModal() {
    document.getElementById('modal').classList.remove('aberto');
}

async function buscarLivros() {
    const titulo = document.getElementById('campoBusca').value.trim();
    if (!titulo) { carregarLivros(); return; }
    const lista = document.getElementById('listaLivros');
    lista.innerHTML = '<p class="carregando">Buscando...</p>';
    try {
        const res = await fetch(`${API}/buscar?titulo=${encodeURIComponent(titulo)}`);
        const livros = await res.json();
        if (livros.length === 0) {
            lista.innerHTML = '<p class="sem-livros">Nenhum livro encontrado.</p>';
            return;
        }
        lista.innerHTML = livros.map(livro => cartaoLivro(livro)).join('');
    } catch (err) {
        lista.innerHTML = '<p class="sem-livros">Erro ao buscar livros.</p>';
    }
}

async function filtrarCategoria() {
    const categoria = document.getElementById('filtroCategoria').value;
    if (!categoria) { carregarLivros(); return; }
    const lista = document.getElementById('listaLivros');
    lista.innerHTML = '<p class="carregando">Filtrando...</p>';
    try {
        const res = await fetch(`${API}/categoria/${encodeURIComponent(categoria)}`);
        const livros = await res.json();
        if (livros.length === 0) {
            lista.innerHTML = '<p class="sem-livros">Nenhum livro nessa categoria.</p>';
            return;
        }
        lista.innerHTML = livros.map(livro => cartaoLivro(livro)).join('');
    } catch (err) {
        lista.innerHTML = '<p class="sem-livros">Erro ao filtrar livros.</p>';
    }
}

async function carregarAdmin() {
    const lista = document.getElementById('listaAdmin');
    try {
        const res = await fetch(API);
        const livros = await res.json();
        if (livros.length === 0) {
            lista.innerHTML = '<p class="carregando">Nenhum livro cadastrado.</p>';
            return;
        }
        lista.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Categoria</th>
                        <th>Preço</th>
                        <th>Estoque</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    ${livros.map(l => `
                        <tr>
                            <td>${l.id}</td>
                            <td>${l.titulo}</td>
                            <td>${l.autor}</td>
                            <td>${l.categoria}</td>
                            <td>R$ ${l.preco.toFixed(2)}</td>
                            <td>${l.estoque}</td>
                            <td>
                                <button class="btn-editar" onclick="editarLivro(${l.id})">Editar</button>
                                <button class="btn-deletar" onclick="deletarLivro(${l.id})">Deletar</button>
                            </td>
                        </tr>`).join('')}
                </tbody>
            </table>`;
    } catch (err) {
        lista.innerHTML = '<p class="carregando">Erro ao carregar.</p>';
    }
}

async function salvarLivro() {
    const id = document.getElementById('livroId').value;
    const livro = {
        titulo: document.getElementById('titulo').value,
        autor: document.getElementById('autor').value,
        categoria: document.getElementById('categoria').value,
        preco: parseFloat(document.getElementById('preco').value),
        estoque: parseInt(document.getElementById('estoque').value),
        descricao: document.getElementById('descricao').value,
        imagemUrl: document.getElementById('imagemUrl').value
    };
    if (!livro.titulo || !livro.autor || !livro.preco || !livro.estoque) {
        alert('Preencha todos os campos obrigatórios!');
        return;
    }
    try {
        const url = id ? `${API}/${id}` : API;
        const method = id ? 'PUT' : 'POST';
        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(livro)
        });
        if (res.ok) {
            alert(id ? 'Livro atualizado!' : 'Livro cadastrado!');
            limparForm();
            carregarAdmin();
        }
    } catch (err) {
        alert('Erro ao salvar livro.');
    }
}

async function editarLivro(id) {
    try {
        const res = await fetch(`${API}/${id}`);
        const livro = await res.json();
        document.getElementById('livroId').value = livro.id;
        document.getElementById('titulo').value = livro.titulo;
        document.getElementById('autor').value = livro.autor;
        document.getElementById('categoria').value = livro.categoria;
        document.getElementById('preco').value = livro.preco;
        document.getElementById('estoque').value = livro.estoque;
        document.getElementById('descricao').value = livro.descricao || '';
        document.getElementById('imagemUrl').value = livro.imagemUrl || '';
        document.getElementById('tituloForm').textContent = 'Editar Livro';
        window.scrollTo(0, 0);
    } catch (err) {
        alert('Erro ao carregar livro para edição.');
    }
}

async function deletarLivro(id) {
    if (!confirm('Tem certeza que deseja deletar este livro?')) return;
    try {
        const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
        if (res.ok) {
            alert('Livro deletado!');
            carregarAdmin();
        }
    } catch (err) {
        alert('Erro ao deletar livro.');
    }
}

function limparForm() {
    document.getElementById('livroId').value = '';
    document.getElementById('titulo').value = '';
    document.getElementById('autor').value = '';
    document.getElementById('preco').value = '';
    document.getElementById('estoque').value = '';
    document.getElementById('descricao').value = '';
    document.getElementById('imagemUrl').value = '';
    document.getElementById('tituloForm').textContent = 'Adicionar Novo Livro';
}

window.onload = carregarLivros;