# Sistema de Vans – Front-end

HTML/CSS/JS puro (sem build). Abra qualquer .html ou rode `npx serve .`

| Tela | Arquivo |
|---|---|
| Cliente (perfil) | cliente-perfil.html |
| Dados do cliente | cliente-detalhe.html |
| Lista + Novo/Editar/Excluir cliente (modais) | clientes.html |
| Administrativo – Vans | vans.html |
| Novo usuário | usuario-novo.html |
| Listagem de usuários (aba Clientes; aba Vans = vans.html) | usuarios.html |
| Fornecedores (lista + modais) | fornecedores.html |
| Relatórios | relatorios.html |
| Configurações | configuracoes.html |

## Integração com o back
Tudo passa por `js/api.js`. Defina `USE_MOCK = false` e ajuste `API_BASE`.
Endpoints esperados: GET/POST /clientes, GET/PUT/DELETE /clientes/:id, GET /vans (cada van com `usuarios[]`), POST /usuarios.
Campos do cliente: id, registro, nome, cpf, telefone, email, nascimento (YYYY-MM-DD), rua, numero, bairro, cidade, uf, cep, status (Ativo|Inativo), horarioSaida, horarioPonto. Busca em GET /clientes?busca= (nome ou telefone). Paginação hoje no front (5 por página).
Erros: o back deve responder `{ "message": "..." }` com status != 2xx para a mensagem aparecer na tela.

Endpoints extras: GET /usuarios?busca=, DELETE /usuarios/:id, CRUD /fornecedores (GET ?busca=), GET/PUT /configuracoes.
Obs.: Fornecedores, Relatórios e Configurações foram montados sem layout no protótipo (seguem o padrão visual do sistema).
