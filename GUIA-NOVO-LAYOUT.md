# Dekap ERP — interface mais simples e acessível

## O que mudou

- Layout mais claro e compacto, com as cores da marca Dekap (azul e navy).
- O tema **claro** é o padrão para facilitar a leitura. O **modo escuro** continua disponível na barra lateral.
- Menu dividido em grupos legíveis; **Início** e **Novo orçamento** sempre aparecem em destaque.
- Ajuda rápida no botão **? Como usar** da barra lateral.
- Dashboard com atalhos objetivos para criar e consultar orçamentos.
- Orçamento com três etapas visíveis: **cliente**, **produtos**, **revisão e envio**.
- Campos e botões de tamanho moderado, contraste reforçado, indicação clara de foco e rolagem horizontal evitada em telas pequenas.
- Opções de entrega, pagamento e outras configurações ficam agrupadas em uma seção expansível, sem apagar dados já cadastrados.
- Os detalhes de personalização/corte permanecem dentro do produto, sem comprometer o cálculo de tecido ou custo.
- Login com rótulos visíveis, opção de mostrar senha e animação inicial opcional (desativada por padrão para acesso mais rápido).

## Como operar um orçamento

1. Entre em **Novo orçamento**.
2. Em **Escolher cliente**, selecione o cliente. Clique em `+` para cadastrar um novo.
3. Em **Adicionar produtos**, use a busca ou o botão **Adicionar produto**. Informe a quantidade.
4. Para produtos com medidas especiais, abra **Personalização e detalhes** no item e habilite **Corte sob medida**.
5. Em **Revisar e enviar**, confira subtotal, desconto, frete e valor total. Utilize **Salvar rascunho** se o orçamento ainda não estiver pronto, ou **Salvar e gerar proposta** para gerar o link.

## Ajustes de conforto

- **Modo escuro**: alterna entre a interface clara e a versão escura.
- Em celular ou tablet, use o botão **☰ Menu** para abrir a navegação.
- **? Como usar**: mostra as três ações essenciais sem sair da página.

## Observações técnicas

Alterações visuais concentradas em `frontend/css/ui-simple.css`, `frontend/js/sidebar.js`, `frontend/js/ui-preferences.js`, `frontend/js/ui-quote-guide.js` e nos cabeçalhos das páginas HTML. As funções de cálculo de orçamentos, estoque e produção foram preservadas.

Validações feitas: 18 testes Node.js existentes, inspeção estática dos scripts e CSS e renderização visual isolada em desktop e celular. A navegação completa com API e banco MongoDB reais precisa ser testada no ambiente do cliente.

**Atenção:** o arquivo de configuração `backend/.env` presente no projeto pode conter credenciais. Não envie o ZIP a terceiros sem revisar e remover segredos.

## Ajuste de outubro de 2026

- Proporções mais compactas nas telas, formulários, navegação, cards e orçamento; cores e visual Dekap preservados.
- O antigo controle de ampliação de texto e suas regras CSS foram removidos; o zoom nativo do navegador continua disponível.
