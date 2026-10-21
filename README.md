# Dekap ERP — North Bag

Aplicação de gestão de clientes, personalizações, orçamentos, materiais, estoque e produção, com identidade visual Dekap.

**Pronto para subir no GitHub e importar no Vercel:** [leia o guia de publicação](GUIA-PUBLICAR-GITHUB-VERCEL.md).

## Estrutura

- `public/` — telas HTML/CSS/JS e recursos visuais.
- `backend/src/` — API Express e modelos MongoDB.
- `index.js` — entrada do backend no Vercel.
- `.env.example` — variáveis necessárias (sem dados reais).

## Testes

```bash
npm ci
npm test
```

Para execução local, configure `.env` na raiz com base no `.env.example` e use `npm start`. Sem banco de dados configurado, apenas os arquivos estáticos ficam disponíveis.

**Antes de cadastrar clientes reais:** revise credenciais, acessos à base de dados, implantação e a limitação de certificados A1/SEFAZ em hospedagem serverless descrita no guia.
