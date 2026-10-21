# Dekap ERP | Corte sob medida no orçamento

## Para o vendedor

1. Em **Itens > Produtos/Materiais**, confirme que o produto tem uma **ficha de composição** com o tecido em **metro** ou **m²** e o custo médio do tecido cadastrado. Outros componentes da ficha continuam sendo considerados normalmente.
2. Entre em **Novo Orçamento**, escolha o cliente e adicione o produto.
3. Abra **Personalização e detalhes** no item e habilite **Corte sob medida**. Selecione o tecido da ficha técnica.
4. Informe largura e altura finais do produto, profundidade da sanfona, margem de costura, largura do rolo, quantidade de painéis por peça e perda extra. Se necessário, informe largura e altura **manuais de corte**, substituindo o cálculo padrão.
5. Habilite **Incluir alças do mesmo tecido** quando aplicável; informe quantidade, largura e comprimento de corte das alças. Desmarcado = orçamento sem alças desse tecido.
6. Mantenha **Proteger margem no preço** se quiser usar o maior valor entre a tabela e o preço necessário para atingir a margem mínima cadastrada no produto, inclusive após os descontos por item e geral. Desmarque somente quando o preço deve seguir a tabela, observando os alertas de margem.
7. Confira consumo estimado, comprimento do rolo, aproveitamento, sobra/perda, custo e alertas de estoque. Salve o rascunho ou gere a proposta.

## Como a estimativa funciona

- **Painéis**: considera, por padrão, dois painéis retangulares para cada peça. A largura calculada de corte de cada painel é `largura do produto + sanfona + 2 × margem de costura`; a altura é `altura do produto + 2 × margem de costura`. É uma hipótese inicial de modelagem e pode ser alterada pelo cliente.
- **Ajuste manual**: quando preenchidas, as dimensões manuais de corte substituem as dimensões calculadas. As medidas comerciais continuam na proposta.
- **Faixas inteiras**: calcula quantos painéis inteiros cabem lado a lado na largura do rolo, testando também a peça girada em 90°. Conta faixas completas para o **lote total**, não para cada unidade isolada.
- **Alças**: calcula faixas separadas para alças feitas do mesmo tecido, sem estimar encaixe de retalhos entre alças e painéis. Se as alças forem feitas de outro material, mantenha o consumo desse componente na ficha de composição e não habilite a opção de alças do mesmo tecido.
- **Perda extra**: aplicada sobre o comprimento planejado, além da sobra geométrica das faixas. Para o tecido escolhido, substitui a quantidade fixa daquele componente na ficha técnica; **não adiciona novamente a perda fixa da ficha**, evitando dupla contagem.
- **Custo / estoque / produção**: a mesma quantidade estimada é aplicada ao custo do orçamento, ao alerta de estoque e às necessidades da OP. A baixa do estoque continua ocorrendo ao iniciar a produção, não na aprovação comercial.
- **Unidades**: em **metro**, consome o comprimento do rolo; em **m²**, consome o comprimento multiplicado pela largura do rolo em metros. Não existe conversão automática para tecido controlado por rolo fechado ou unidade.
- **Retalhos**: a sobra é informativa, sem registrar retalhos reutilizáveis e sem prometer economia com reaproveitamento. Uma futura regra de encaixe e reaproveitamento depende da validação da produção.

### Exemplo de teste (valores ilustrativos)

Um lote de 100 peças de 30 × 40 cm, com 2 painéis, 1 cm de costura em cada lado, **sem sanfona, sem alças e sem perda extra**, rolo de 150 cm, resulta em painéis de 32 × 42 cm. Cabem 4 painéis por faixa, em 50 faixas de 42 cm, consumindo **21 metros lineares**. O preço depende do custo do tecido e da margem cadastrada; 21 m não representa preço de venda.

## Limites e validação antes do uso comercial

**As fórmulas são uma primeira aproximação, não uma ficha de corte homologada.** A fabricação real pode usar fundo separado, sanfona lateral, tecido dobrado, forro, bainha, orientação de estampa, encolhimento, largura útil menor que a nominal, costuras específicas e alças de outros materiais. Confirme as regras com a North Bag e atualize os parâmetros antes de enviar preços definitivos.

A implementação mantém os orçamentos antigos sem corte funcionando como antes. Para testes locais: `cd backend` e `node --test tests/*.test.js` (18 testes simulados). Integrações com o MongoDB da empresa, aprovação do cliente por link e baixa física em produção precisam de validação no ambiente real.

**Segurança:** o ZIP fornecido de volta preserva as configurações do ambiente que estavam no ZIP recebido (incluindo `backend/.env`); não o envie a terceiros nem publique essa configuração em um repositório público.
