# Learning Vault

Your learning journey, organized.

Portfólio público de aprendizado de Claudia Azambuja. Certificados, previews e metadados vivem no repositório; não há backend, autenticação ou banco de dados. As tags e estatísticas são calculadas automaticamente a partir dos arquivos JSON.

## Stack

React, TypeScript, Vite, CSS puro e Swiper. GitHub Actions publica o build no GitHub Pages.

## Run locally

```bash
npm install
npm run dev
npm run build
npm run preview
```

O Vite usa a base `/learning-vault/`. Em desenvolvimento, abra o endereço mostrado no terminal (geralmente `http://localhost:5173/learning-vault/`). `npm run build` gera `dist/`.

## Structure

- `src/content/certificates/<slug>/metadata.json`: dados de cada certificado.
- `public/certificates/<slug>/certificate.pdf` e `preview.webp`: arquivos públicos.
- `src/data/profile.json`: texto do perfil.
- `src/content/posts/<slug>/metadata.json`: publicações em destaque com autoria e link original.
- `src/components/`: interface.
- `src/utils/certificateLoader.ts`: descoberta automática por `import.meta.glob`.
- `.github/workflows/deploy.yml`: publicação no Pages.

Os três certificados iniciais são **fictícios** e servem apenas para demonstrar a interface. Substitua-os pelos seus documentos antes de apresentar o portfólio como registro real.

## Adding a certificate

1. Crie `src/content/certificates/<slug>/`.
2. Crie `metadata.json` nessa pasta, seguindo os exemplos existentes. O `id` deve ser único; `date` usa `YYYY-MM` quando disponível.
3. Crie `public/certificates/<slug>/`.
4. Adicione `certificate.pdf`.
5. Adicione `preview.webp`.
6. Faça commit.
7. Envie o commit com push para `main`.

Use no JSON os caminhos relativos `certificates/<slug>/certificate.pdf` e `certificates/<slug>/preview.webp`, sem barra inicial. Nenhum componente React precisa ser alterado. O filtro, as tags, as estatísticas e a ordenação se atualizam no próximo build.

## Featured posts and contacts

Os links de WhatsApp e LinkedIn ficam em `src/data/profile.json`. Para acrescentar uma publicação, crie outra pasta em `src/content/posts/` com um `metadata.json` seguindo o exemplo. Informe a fonte e o endereço original; a seção descobre os novos arquivos automaticamente. Os dados destacados em `metrics` são opcionais.

## Deploy

Crie um repositório chamado `learning-vault` no GitHub e envie o projeto para a branch `main`. Em **Settings → Pages**, escolha **GitHub Actions** como fonte. O workflow executa `npm ci`, `npm run build` e publica `dist/` a cada push. O endereço padrão será `https://<usuario>.github.io/learning-vault/`. A base do Vite e os links dos arquivos públicos já consideram esse subdiretório.
