# Publicar o Dekap ERP — GitHub + Vercel

Este pacote foi organizado para o frontend e a API Express funcionarem **no mesmo endereço**. A implantação **não é automática**: é necessário criar o repositório na sua conta e configurar o MongoDB Atlas e as variáveis no Vercel.

## 1. Subir o código ao GitHub

1. Extraia este ZIP no computador.
2. Entre em https://github.com/new e crie um repositório **privado** chamado `dekap-erp`. Não marque a opção de criar README nem `.gitignore` (já existem arquivos neste pacote).
3. Instale o Git (se necessário), abra o Terminal/PowerShell na pasta extraída e rode:

```powershell
git init
git add .
git commit -m "Dekap ERP pronto para Vercel"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/dekap-erp.git
git push -u origin main
```

Troque `SEU_USUARIO` pelo usuário do GitHub. O GitHub poderá pedir autorização de login no navegador.

**Importante:** o `.env` real, certificado A1, fotos antigas e a pasta `node_modules` NÃO estão neste ZIP. Jamais adicione arquivos de credenciais ao repositório.

## 2. Configurar o MongoDB Atlas

- Use um cluster e um banco MongoDB Atlas disponíveis.
- Crie um usuário de banco com senha forte e permissões adequadas para o banco usado pelo Dekap.
- Em **Network Access** do Atlas, libere a conexão de rede usada pelo serviço hospedado. Funções Vercel podem usar IPs de saída variáveis; avalie as opções de conectividade e as restrições de rede antes de permitir intervalos amplos.
- Copie a string de conexão **com nome do banco** para a variável `MONGODB_URI`. Senhas com caracteres especiais devem ser codificadas para URI.

## 3. Gerar link público no Vercel

1. Abra https://vercel.com/new e entre na conta.
2. Selecione **Import Git Repository** e autorize o acesso ao seu repositório `dekap-erp` (privado).
3. Configure **Framework Preset = Other** se não houver detecção automática.
4. Deixe **Root Directory = ./ ** (raiz do repositório), sem apontar para `backend` ou `public`.
5. Adicione as variáveis de ambiente nas configurações do projeto, em **Environment Variables**:
   - `MONGODB_URI` = URL privada do MongoDB Atlas, incluindo o banco
   - `JWT_SECRET` = uma chave longa, única e aleatória para autenticação
   - `CONFIG_SECRET` = outra chave longa e aleatória para a configuração fiscal
6. Clique **Deploy**. O Vercel gera um endereço no formato `https://nome-do-projeto.vercel.app`.
7. Abra a URL gerada e teste login, listagem de clientes e criação de um orçamento. A rota `https://SEU-DOMINIO.vercel.app/api/health` ajuda a verificar se a API está acessível (ela não testa o banco por si só; `banco` mostra o estado atual da conexão).

**Não** configure Output Directory manualmente: a pasta `public` contém HTML/CSS/JS servido estaticamente e `index.js` exporta a aplicação Express para as rotas dinâmicas.

## 4. Primeiro acesso

O deploy **não cria usuário administrador** nem faz seed automaticamente. Para um banco novo, é preciso criar o primeiro administrador em ambiente local usando o `backend/src/seed.js`, após definir `SEED_PASSWORD` e conectar ao Atlas. Confira o arquivo de seed antes de executá-lo e use uma senha nova, não um exemplo fixo. Se já existir banco com usuários, use essas credenciais.

Exemplo local:

```powershell
npm ci
# Crie um arquivo .env local (não versionado) com MONGODB_URI, JWT_SECRET, CONFIG_SECRET e SEED_PASSWORD
node backend/src/seed.js
npm start
```

**Atenção:** O `seed.js` é destinado à homologação. Execute somente se entender seus efeitos; evite executá-lo em um banco com usuários/dados reais sem antes revisar o script.

## 5. Limitações importantes da hospedagem serverless

- **Orçamentos, usuários e estoque:** usam MongoDB, como antes, e podem funcionar no Vercel após configurar o Atlas. Precisam de teste no domínio real.
- **Novas logos/imagens de personalização:** passam a ser armazenadas no GridFS do MongoDB e podem ser exibidas a partir do mesmo domínio. Arquivos de upload **antigos**, que só existiam na pasta local `backend/uploads`, não são incluídos nem migrados automaticamente.
- **Certificado digital A1 / integrações SEFAZ:** a implementação original depende de certificado escrito no disco. Para não dar a impressão falsa de que funcionará em serverless, o envio de certificado é desativado com um aviso no Vercel. Para uso fiscal real, será necessário adaptar para armazenamento seguro e persistente ou hospedar esse serviço em um backend convencional.
- **Limites da plataforma:** upload de logos limitado a 4 MB para respeitar limites usuais de requisições de funções. Requisições fiscais/XML grandes podem exigir arquitetura específica.
- **Segurança:** qualquer URL `vercel.app` pública pode ser acessada por terceiros. Mantenha login ativo, repositório privado, senhas fortes, variáveis fora do Git e revise os acessos antes de usar dados reais de clientes.

## 6. Verificações locais

```powershell
npm ci
npm test
npm start
```

O comando `npm start` exige `MONGODB_URI` válido no `.env` local. Para conferir HTML sem banco, a aplicação Express ainda carrega os arquivos estáticos, mas os endpoints `/api` exigem a conexão.

### Arquivos importantes

- `public/`: páginas, identidade visual Dekap, CSS e JS.
- `backend/src/`: API Express, MongoDB, orçamentos, estoque e produção.
- `index.js`: entrada para deploy Express no Vercel.
- `.env.example`: modelo de configuração sem senhas reais.
- `.gitignore`: proteção básica para não enviar credenciais e uploads.
- `package.json`, `package-lock.json`: dependências para `npm ci` no Vercel.
