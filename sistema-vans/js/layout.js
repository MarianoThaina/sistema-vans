/* Injeta barra superior + menu lateral. Uso: Layout.mount('clientes') */
const Layout = {
  mount(active){
    const ic = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>';
    const items = [['clientes','Clientes','clientes.html'],['fornecedores','Fornecedores','fornecedores.html'],['usuarios','Usuários','vans.html'],['relatorios','Relatórios','relatorios.html'],['config','Configurações','configuracoes.html']];
    document.body.insertAdjacentHTML('afterbegin',
      `<div class="app"><header class="top"><span class="logo">▲</span><span class="sys">Sistema de Cadastro</span>
        <nav><a href="usuario-novo.html">Cadastrar</a><a href="vans.html">Vans</a><a href="clientes.html">Clientes</a></nav></header>
       <aside class="side">${items.map(i=>`<a href="${i[2]}" class="${i[0]===active?'on':''}">${ic}${i[1]}</a>`).join('')}</aside></div>`);
    $('.app').appendChild($('main'));
  }
};
