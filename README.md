# Instituto Filhas da Terra

Este é um projeto [Next.js](https://nextjs.org) iniciado com [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

O site serve como a presença online para o Instituto Filhas da Terra, uma organização sem fins lucrativos focada em justiça socioambiental nas periferias do Distrito Federal. O projeto inclui uma página inicial, página sobre, projetos, contatos, portal da transparência e um painel de administração para gerenciar o conteúdo do site.

## Começando

Primeiro, instale as dependências:

```bash
npm install
```

Depois, rode o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

Você pode começar a editar a página modificando `src/app/page.tsx`. A página atualiza automaticamente conforme você edita o arquivo.

Este projeto usa [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) para otimizar e carregar automaticamente a [Geist](https://vercel.com/font), uma nova família de fontes para a Vercel.

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```
# URL pública do seu projeto Supabase
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
# Chave anônima pública do seu projeto Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=ey...

# Chave de serviço para ações de admin no lado do servidor (upload/delete). Mantenha em segredo.
SUPABASE_SERVICE_ROLE=ey...

# String de conexão do seu banco de dados (ex: PostgreSQL no Supabase)
DATABASE_URL="postgresql://postgres:[SENHA]@[ID_PROJETO].supabase.co:5432/postgres"
```

O bucket de armazenamento no Supabase esperado é `filhasDaTerra`.

### Painel de Administração

Acesse `/admin` para gerenciar o conteúdo do site. As seções disponíveis são:

-   `/admin/carousel`: Gerencie as imagens do carrossel da página inicial.
-   `/admin/projetos`: Adicione, edite e remova os projetos exibidos na página de projetos.
-   `/admin/avisos`: Crie, edite, ative/desative e remova avisos que aparecem em um pop-up na página inicial.
