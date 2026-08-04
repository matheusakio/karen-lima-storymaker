# Karen Lima StoryMaker

Site de Karen Lima — filmmaker, storymaker e videomaker mobile em Brasília – DF.

React 18 · TypeScript · Vite · Tailwind CSS v4 · Motion.

---

## Rodar

Node 20+.

```bash
cd ~/Documents/karen-lima-storymaker
npm install
npm run dev              # http://localhost:5173
npm run dev -- --host    # testar no celular pela rede
```

| Comando           | O que faz                                     |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Servidor de desenvolvimento                   |
| `npm run media`   | Converte a pasta `media-entrada/` (ver abaixo) |
| `npm run build`   | Typecheck + build em `dist/`                  |
| `npm run preview` | Serve o `dist/` como em produção              |
| `npm run lint`    | ESLint                                        |

### Limpeza pendente

Sobraram arquivos das versões anteriores. Não entram no bundle e estão fora do
typecheck via `exclude` no `tsconfig.app.json`. Para remover:

```bash
./LIMPAR.sh && rm LIMPAR.sh
# depois apague o bloco "exclude" e a chave "//" de tsconfig.app.json
```

---

## Adicionar ou trocar vídeos

Você **não edita código de componente** para publicar trabalho.

```bash
# 1. jogue os originais aqui (aceita .mov HEVC direto do iPhone)
media-entrada/encerramento-de-evento.mov

# 2. rode
npm run media

# 3. cole o bloco impresso em media-saida.txt dentro de
#    `projects` em src/data/projects.ts, ajustando categoria e serviços
```

O script resolve o que é fácil errar na mão:

- **HEVC → H.264.** Safari toca HEVC, Chrome e Firefox não. Arquivo de iPhone
  vem em HEVC e simplesmente não abre para metade dos visitantes.
- **Rotação.** O iPhone grava 3840×2160 com matriz de rotação; ler só a
  dimensão bruta faz vídeo vertical parecer horizontal. O script mede o quadro
  já rotacionado.
- **faststart.** Sem isso o vídeo só começa depois de baixar inteiro.
- **Três versões por peça,** com qualidade calibrada.

O nome do arquivo vira id e título: `encerramento-de-evento.mov` → "Encerramento
de Evento".

---

## Reprodução: por que não trava e por que nada fica parado

Duas exigências opostas. Tocar tudo derruba o aparelho; tocar um só congela a
página e parece defeito.

**Teto de quatro simultâneos.** `src/shared/hooks/use-video-pool.ts` deixa até
quatro vídeos mudos tocando ao mesmo tempo e enfileira o resto. Quatro streams
em 720p são tranquilos para qualquer aparelho atual — o problema era decodificar
doze. Quem sai de cena devolve a vaga na hora.

**Hover fura a fila.** No desktop, passar o mouse sobre um card força a
reprodução imediata, mesmo sem vaga: libera o mais antigo e assume. Assim nada
fica congelado embaixo do cursor.

**Nada baixa antes da hora.** O elemento `<video>` só é montado 400px antes de
entrar na tela, com `preload="none"`. Até lá existe apenas a capa.

**Capa leve e nítida.** WebP em duas larguras via `srcset`. Um card pequeno
baixa ~35 KB em vez dos ~106 KB do JPEG de 1080px, com mais detalhe por byte.
A imagem segura o layout, então não há salto quando o vídeo entra.

**Vídeo completo só no modal.** É montado ao abrir e desmontado ao fechar.

### Orçamento medido

| Momento                   | Peso                                    |
| ------------------------- | --------------------------------------- |
| Primeiro paint            | **280 KB** (108 KB js+css, 171 KB capa) |
| Loop do herói             | 5,0 MB — assíncrono, não bloqueia       |
| Capas da grade            | 415 KB total, 35 KB cada, lazy          |
| Previews                  | 20 MB total, mas **um** toca por vez    |
| Vídeos completos          | só ao abrir o modal                     |

### Autoplay condicional

`use-media-policy.ts` nega autoplay quando há `prefers-reduced-motion`,
`saveData` ou conexão 2g. Nesses casos fica a capa, sem quadro preto e sem erro.

---

## ⚠️ Regra de privacidade

**Nenhuma peça com rosto de cliente identificável em procedimento entra no site.**

Ficaram de fora as séries de antes/depois de harmonização facial. É o material
mais sensível do acervo e exige autorização escrita de cada pessoa. A regra
está anotada no topo de `src/data/projects.ts` — não remova sem falar com a Karen.

Nenhum cliente é nomeado. Os títulos são descrições neutras, não os nomes reais
dos projetos. Quando a Karen enviar nomes e liberações, troque `title` e
preencha `client`.

---

## Direção de arte

Escuro e quente, tipografia sobre a imagem — que é o jeito dela: em quase todo
vídeo há serifada fina branca sobreposta.

```
--night   #141010   fundo
--night-2 #1D1815   bloco alternado
--cream   #F0E6D8   texto claro
--warm    #A08D78   texto de apoio
--gold    #C9A96A   acento (tirado da bandeja de café dela)
```

Cormorant Garamond light para display, Inter para o resto.

**Investimento em faixa horizontal.** O que a mantém longe do cartão de SaaS é
o que ela não tem: nenhuma borda em volta, nenhum canto arredondado, nenhuma
sombra. Colunas separadas só por fios de 1px, primeira e última encostando na
margem — lê como faixa contínua, não como quatro caixas. Acima passa um eixo do
tempo com marcadores proporcionais às horas. No celular as colunas empilham.

**Sem ícone genérico.** A duração é o elemento gráfico: número de horas em
serifada grande. Só três ícones Lucide no site: som do herói, fechar modal.

O mockup aprovado está em `MOCKUP.html` — abra no navegador para comparar.

---

## Estrutura

```
src/
├── App.tsx
├── config/site.ts        # contato e redes
├── data/
│   ├── projects.ts       # catálogo + herói + manifesto + contato
│   ├── services.ts       # cinco capítulos
│   └── packages.ts       # pacotes, exclusivos, produtos
├── features/
│   ├── hero/ manifesto/ portfolio/ services/
│   ├── packages/         # faixa horizontal + exclusivos
│   ├── products/ about/ contact/
└── shared/
    ├── components/media/auto-video.tsx   # o vídeo contínuo
    ├── components/layout/                # nav, créditos, CTA fixo
    ├── hooks/                            # media-policy, video-slot, hover
    └── lib/                              # cn, formatBRL, whatsapp

scripts/media.mjs         # pipeline de conversão
```

| Quero mudar…           | Arquivo                     |
| ---------------------- | --------------------------- |
| WhatsApp, Instagram    | `src/config/site.ts`        |
| Trabalhos              | `src/data/projects.ts`      |
| Preços                 | `src/data/packages.ts`      |
| Serviços               | `src/data/services.ts`      |
| Cores, fontes          | `src/styles/globals.css`    |
| Abertura               | trocar `public/media/hero/` |

---

## Verificado

`npx tsc -b`, `npx vite build` e `npx eslint .` passam sem erro nem warning.
Bundle **108 KB gzip**. Os 64 caminhos de mídia foram checados um a um com
`ffprobe` — todos existem e abrem. O pipeline `npm run media` foi testado ponta
a ponta com um `.mov` HEVC real.

**Não verificado:** não consegui instalar navegador no ambiente, então o site
não foi visto renderizado nem medido no Lighthouse. Rode `npm run dev` e
confira no celular antes de publicar.

---

## Deploy

Netlify configurado em `netlify.toml`. Na Vercel funciona sem config.

`public/media` tem ~180 MB. Netlify e Vercel aguentam, mas se o acervo crescer,
mova os `full` para um CDN de vídeo e troque só o campo `fullVideo` em
`projects.ts`.
