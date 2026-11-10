# Verificação da V3

Data: 10 de novembro de 2026.

## Testes automatizados
`node form.test.cjs`: **11 testes aprovados, 0 falhas**.

- Destino único do orçamento: WhatsApp `5511991162998`.
- Preservação de todos os campos obrigatórios e opcionais.
- Valores padrão quando detalhes opcionais não são preenchidos.
- Codificação correta de acentos, múltiplas linhas e caracteres especiais.
- Bloqueio de nome/cidade vazios ou preenchidos apenas com espaços.
- Bloqueio de quantidade zero ou fracionária.
- Pré-seleção dos seis produtos pelos links do catálogo.
- Ausência de envio automático, chamadas de coleta ou armazenamento no navegador.

Verificações estáticas aprovadas: IDs únicos, todas as âncoras existentes, labels vinculados aos campos, 11 campos originais preservados, seis categorias e sete imagens locais com textos alternativos, links externos protegidos e página de créditos presente.

## Verificação no navegador
Chromium, prévia local do mesmo conteúdo destinado à publicação.

- Desktop: visual inspecionado, hero e catálogo fotográfico carregados; sem rolagem horizontal do documento.
- Frames responsivos de 320, 390, 768 e 1280 pixels. Larguras úteis observadas: 305, 375, 753 e 1265 pixels, respectivamente (15 pixels ocupados pela barra de rolagem do navegador). A largura de rolagem do documento foi igual à largura útil em todos os quatro casos.
- Menu móvel fechado inicialmente, abre ao toque e fecha ao selecionar uma seção. Cabeçalho fechado: 74 pixels nos celulares; 77 pixels no tablet.
- Botão “Ver produtos” navega para o catálogo.
- Link da categoria Regatas navega ao orçamento e seleciona “Regata”.
- Envio de formulário vazio mantém a página e leva o foco ao primeiro campo obrigatório.
- Sete fotografias carregadas e verificadas, com rótulos demonstrativos.
- Ícone flutuante do WhatsApp e contato apontam para o mesmo número autorizado.

## Limites
Não foi enviada mensagem real para o WhatsApp durante a verificação. A montagem integral da mensagem foi testada localmente, sem transmissão. Os testes de largura não substituem ensaio em um aparelho físico. As condições comerciais são tratadas no atendimento.
