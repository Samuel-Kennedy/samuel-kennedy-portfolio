# Samuel Kennedy — Portfólio profissional

Portfólio em Angular para apresentar a trajetória, competências, serviços freelance e projetos demonstrativos de Samuel Kennedy.

## Executar localmente

```bash
npm install
npm start
```

Abra `http://localhost:4200/` no navegador.

## Publicar no Netlify

O arquivo `netlify.toml` configura automaticamente o comando de build, a pasta publicada
(`dist/samuel-kennedy-portfolio/browser`), Node.js 22 e o fallback das rotas Angular.

No Netlify, conecte o repositório `Samuel-Kennedy/samuel-kennedy-portfolio` e mantenha
**Base directory** vazio (raiz do repositório). O comando de build deve ser `npm run build`;
se o painel pedir uma pasta de publicação, use `dist/samuel-kennedy-portfolio/browser`.

## Rotas

- `/` — portfólio profissional.
- `/sobre` — apresentação profissional.
- `/experiencia` — trajetória profissional.
- `/projetos` — projetos demonstrativos.
- `/projetos/nexus-business` — dashboard demonstrativo Nexus Business.
- `/contato` — informações de contato.

O Nexus Business é uma demonstração autoral independente. Os dados apresentados no dashboard são fictícios e não representam clientes nem projetos corporativos anteriores.
