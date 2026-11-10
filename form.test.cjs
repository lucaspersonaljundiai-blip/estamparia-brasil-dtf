const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const code=fs.readFileSync(__dirname+'/script.js','utf8');
function fixture(values={}){
 const ids=['nome','tipo','peca','quantidade','modalidade','cidade','prazo','estampa','edital','contato','detalhes'];
 const defaults={nome:'Teste técnico',tipo:'Empresa',peca:'Camiseta',quantidade:'1',modalidade:'Comprar roupa já estampada',cidade:'Cidade de teste / SP'};
 const fields=Object.fromEntries(ids.map(id=>[id,{value:values[id]??defaults[id]??'',validity:'',setCustomValidity(s){this.validity=s},addEventListener(){}}]));
 let submit; let prevented=false;
 const form={addEventListener(event,fn){if(event==='submit')submit=fn},reportValidity(){return !fields.nome.validity&&!fields.cidade.validity&&Number(fields.quantidade.value)>=1&&Number.isInteger(Number(fields.quantidade.value))}};
 const products=['Camiseta','Uniforme','Regata','Moletom','Eventos','Equipes e artes marciais'].map(value=>({getAttribute(){return value},addEventListener(event,fn){this.click=fn}}));
 const window={matchMedia(){return {matches:false}},location:{href:''}};
 const document={querySelector(){return null},getElementById(id){return id==='quote'?form:fields[id]},querySelectorAll(){return products}};
 vm.runInNewContext(code,{window,document});
 return {window,fields,products,submit(){submit({preventDefault(){prevented=true}});return {url:window.location.href,prevented}}};
}
let count=0;
function test(name,fn){fn();count++;console.log('PASS '+name)}
test('form opens only the authorized WhatsApp number and preserves required fields',()=>{const f=fixture();const r=f.submit();assert.equal(r.prevented,true);const u=new URL(r.url);assert.equal(u.origin+u.pathname,'https://wa.me/5511991162998');const t=u.searchParams.get('text');for(const value of ['Nome/empresa: Teste técnico','Perfil: Empresa','Peça: Camiseta','Quantidade: 1','Cidade/UF: Cidade de teste / SP'])assert(t.includes(value))});
test('optional field defaults and all original form fields remain',()=>{const f=fixture();const t=new URL(f.submit().url).searchParams.get('text');for(const value of ['Prazo desejado: A combinar','Posição/tamanho da estampa: A definir','Edital: Não se aplica','Contato: Não informado','Detalhes: A definir','Modalidade: Comprar roupa já estampada'])assert(t.includes(value))});
test('accents, multiline text, ampersand and query characters are encoded safely',()=>{const f=fixture({nome:'João & Cia',detalhes:'Linha 1\nArte <teste> ? # + 100% & mais'});const u=new URL(f.submit().url);assert.equal([...u.searchParams.keys()].length,1);assert(u.searchParams.get('text').includes('João & Cia'));assert(u.searchParams.get('text').includes('Linha 1\nArte <teste> ? # + 100% & mais'))});
for(const values of [{nome:''},{nome:'   '},{cidade:''},{cidade:'   '},{quantidade:'0'},{quantidade:'1.5'}])test('invalid input blocks navigation '+JSON.stringify(values),()=>assert.equal(fixture(values).submit().url,''));
test('all six category links preselect corresponding quotation type',()=>{const f=fixture();for(const p of f.products){p.click();assert.equal(f.fields.peca.value,p.getAttribute())}});
test('only navigation, no automatic message send or browser storage',()=>{assert(!/fetch\(|XMLHttpRequest|localStorage|sessionStorage|sendBeacon/.test(code))});
console.log(JSON.stringify({passed:count,failed:0},null,2));
