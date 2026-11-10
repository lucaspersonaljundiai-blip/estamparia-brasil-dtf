# Estamparia Brasil DTF · V3

Site estático publicado no GitHub Pages, sem backend, pagamentos, rastreamento ou armazenamento de dados do formulário.

## Conteúdo
- `index.html`: página principal, catálogo de seis categorias, serviços, atendimento corporativo, portfólio preparado e orçamento.
- `styles.css` e `script.js`: apresentação responsiva, menu móvel, seleção de produto e mensagem de orçamento.
- `photo-*.avif`: sete fotografias demonstrativas hospedadas localmente (aproximadamente 185 KB no total).
- `creditos.html`: fotógrafos, fontes originais e licença comercial gratuita Pexels.
- `favicon.svg` e `robots.txt`: preservados do projeto anterior.
- `QA-V3.md` e `form.test.cjs`: evidências e testes reproduzíveis.

## Publicação
O projeto mantém o GitHub Pages já existente, a partir da branch `main` e da raiz do repositório. A V3 foi preparada em branch própria, preservando o histórico anterior.

## Formulário e privacidade
O formulário mantém os 11 campos da versão anterior. O botão abre uma mensagem preenchida para `https://wa.me/5511991162998`; o visitante revisa e confirma o envio no aplicativo. Não há envio automático, banco de dados, coleta de arquivos ou pagamento no site.

## Imagens e conteúdo comercial
As imagens são demonstrativas e não representam clientes, instalações ou trabalhos da empresa. Não há depoimentos, certificações ou métricas inventadas. Endereço físico e horários não foram acrescentados sem confirmação. Modelos, materiais, condições, valores e prazos são confirmados no atendimento.

## Atualizar o portfólio
A seção `#trabalhos` está reservada para fotos reais autorizadas. Ao recebê-las, substitua o estado informativo por imagens com descrição da peça e autorização de uso. Não reutilize fotos do catálogo como prova de trabalhos realizados.

## Verificação
Execute `node form.test.cjs`. Consulte `QA-V3.md` para o escopo da verificação visual e funcional.
