/* Camada de API. Devs de back: ajustem API_BASE e os endpoints; as telas só usam as funções abaixo.
   USE_MOCK=true faz o front rodar sem back (dados fictícios, alterações só em memória). Troque para false ao integrar. */
const API_BASE = '/api';
const USE_MOCK = true;

const mock = {
  clientes: [
   {id:1,registro:'000001',nome:'Mario Joaquino',cpf:'123.456.789-00',telefone:'(11) 99999-1111',email:'mario@email.com',nascimento:'1997-04-16',rua:'Rua das Flores',numero:'123',bairro:'Centro',cidade:'São Paulo',uf:'SP',cep:'01234-567',status:'Ativo',horarioSaida:'16:47',horarioPonto:'18:02'},
   {id:2,registro:'000002',nome:'Juliana Freitas',telefone:'(21) 98888-2222',email:'juliana@email.com',cidade:'Rio de Janeiro',uf:'RJ',status:'Ativo'},
   {id:3,registro:'000003',nome:'Ricardo Alves',telefone:'(31) 97777-3333',email:'ricardo@email.com',cidade:'Belo Horizonte',uf:'MG',status:'Ativo'},
   {id:4,registro:'000004',nome:'Ana Carolina',telefone:'(41) 96666-4444',email:'ana@email.com',cidade:'Curitiba',uf:'PR',status:'Inativo'},
   {id:5,registro:'000005',nome:'Lucas Mendes',telefone:'(71) 95555-5555',email:'lucas@email.com',cidade:'Salvador',uf:'BA',status:'Ativo'}
  ].concat(Array.from({length:7},(_,i)=>({id:6+i,registro:String(6+i).padStart(6,'0'),nome:'Cliente '+(6+i),telefone:'(11) 90000-00'+(10+i),email:'cliente'+(6+i)+'@email.com',cidade:'São Paulo',uf:'SP',status:'Ativo'}))),
  usuarios: ['José Santos','Maria Oliveira','Lucas Pereira','Ana Costa','Bruno Martins','Juliana Rocha','Pedro Henrique','Camila Silva','Gabriel Sousa','Fernanda Alves','Rafael Souza','Larissa Teixeira'].map((n,i)=>({id:i+1,registro:String(i+1).padStart(5,'0'),nome:n.split(' ')[0],sobrenome:n.split(' ').slice(1).join(' '),nascimento:'199'+(i%10)+'-0'+(1+i%9)+'-1'+(i%9)})),
  fornecedores: ['Alfa Transportes','Beta Peças','Gama Combustíveis','Delta Seguros','Ômega Pneus','Sigma Oficina','Lambda Limpeza'].map((n,i)=>({id:i+1,nome:n,cnpj:'12.345.678/0001-0'+(i+1),telefone:'(11) 4444-'+(1111*(i%9+1)),email:'contato@'+n.split(' ')[0].toLowerCase()+'.com',rua:'Av. Brasil',numero:String(100+i),bairro:'Centro',cidade:'São Paulo',cep:'01234-567',status:i===2?'Inativo':'Ativo'})),
  config: {empresa:'',cnpj:'',telefone:'',email:''},
  vans: [1,2,3,4].map(n=>({id:n,nome:'VAN '+n,usuarios:['José Santos','Maria Oliveira','Lucas Pereira','Ana Costa'].map((x,i)=>({id:n*10+i,nome:x}))}))
};

async function req(method, path, body){
  const r = await fetch(API_BASE+path,{method,headers:{'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});
  if(!r.ok) throw new Error((await r.json().catch(()=>({}))).message || 'Erro '+r.status);
  return r.status===204?null:r.json();
}
const Api = {
  // GET /clientes?busca=  (busca por nome ou telefone; back devolve array já ordenado)
  listarClientes: (busca='') => USE_MOCK ? Promise.resolve(mock.clientes.filter(c=>!busca||(c.nome+' '+c.telefone).toLowerCase().includes(busca.toLowerCase()))) : req('GET','/clientes?busca='+encodeURIComponent(busca)),
  // GET /clientes/:id
  obterCliente: id => USE_MOCK ? Promise.resolve(mock.clientes.find(c=>c.id==id)||mock.clientes[0]) : req('GET','/clientes/'+id),
  // POST /clientes  (back gera id, registro e status)
  criarCliente: d => USE_MOCK ? Promise.resolve((d.id=Math.max(...mock.clientes.map(c=>c.id))+1,d.registro=String(d.id).padStart(6,'0'),d.status='Ativo',mock.clientes.push(d),d)) : req('POST','/clientes',d),
  // PUT /clientes/:id
  atualizarCliente: (id,d) => USE_MOCK ? Promise.resolve(Object.assign(mock.clientes.find(c=>c.id==id),d)) : req('PUT','/clientes/'+id,d),
  // DELETE /clientes/:id
  excluirCliente: id => USE_MOCK ? Promise.resolve(void(mock.clientes=mock.clientes.filter(c=>c.id!=id))) : req('DELETE','/clientes/'+id),
  // GET /vans (cada van com usuarios[])
  listarVans: () => USE_MOCK ? Promise.resolve(mock.vans) : req('GET','/vans'),
  // POST /usuarios
  criarUsuario: d => USE_MOCK ? Promise.resolve((d.id=Date.now(),d.registro=String(mock.usuarios.length+1).padStart(5,'0'),mock.usuarios.push(d),d)) : req('POST','/usuarios',d),
  // GET /usuarios?busca=  (nome, sobrenome ou registro)
  listarUsuarios: (busca='') => USE_MOCK ? Promise.resolve(mock.usuarios.filter(u=>!busca||(u.nome+' '+u.sobrenome+' '+u.registro).toLowerCase().includes(busca.toLowerCase()))) : req('GET','/usuarios?busca='+encodeURIComponent(busca)),
  // DELETE /usuarios/:id
  excluirUsuario: id => USE_MOCK ? Promise.resolve(void(mock.usuarios=mock.usuarios.filter(u=>u.id!=id))) : req('DELETE','/usuarios/'+id),
  // Fornecedores: GET /fornecedores?busca= | POST /fornecedores | PUT /fornecedores/:id | DELETE /fornecedores/:id
  listarFornecedores: (busca='') => USE_MOCK ? Promise.resolve(mock.fornecedores.filter(f=>!busca||(f.nome+' '+f.cnpj).toLowerCase().includes(busca.toLowerCase()))) : req('GET','/fornecedores?busca='+encodeURIComponent(busca)),
  criarFornecedor: d => USE_MOCK ? Promise.resolve((d.id=Math.max(0,...mock.fornecedores.map(f=>f.id))+1,mock.fornecedores.push(d),d)) : req('POST','/fornecedores',d),
  atualizarFornecedor: (id,d) => USE_MOCK ? Promise.resolve(Object.assign(mock.fornecedores.find(f=>f.id==id),d)) : req('PUT','/fornecedores/'+id,d),
  excluirFornecedor: id => USE_MOCK ? Promise.resolve(void(mock.fornecedores=mock.fornecedores.filter(f=>f.id!=id))) : req('DELETE','/fornecedores/'+id),
  // Configurações: GET /configuracoes | PUT /configuracoes  -> {empresa,cnpj,telefone,email}
  obterConfig: () => USE_MOCK ? Promise.resolve(mock.config) : req('GET','/configuracoes'),
  salvarConfig: d => USE_MOCK ? Promise.resolve(Object.assign(mock.config,d)) : req('PUT','/configuracoes',d)
};
const $ = (s,r=document)=>r.querySelector(s);
const esc = s => String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const formData = f => Object.fromEntries(new FormData(f));
const fillForm = (f,d) => Object.entries(d||{}).forEach(([k,v])=>{ if(f.elements[k]) f.elements[k].value=v??''; });
const qs = k => new URLSearchParams(location.search).get(k);
