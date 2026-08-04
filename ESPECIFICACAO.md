# Karen Lima — Especificação de execução

Direção escolhida: **01 CORTE SECO** — a timeline de montagem como identidade.

Documento de referência antes do código. Sete entregas, na ordem pedida.

---

## 1. Mapa da página

Rota única (`/`), navegação por âncoras com scroll suave. Projetos abrem em
modal com URL própria (`/?projeto=v012`) para permitir compartilhamento e
voltar com o botão do navegador.

| #  | Timecode | Seção                  | Função comercial                          |
| -- | -------- | ---------------------- | ----------------------------------------- |
| 00 | `00:00`  | Abertura cinematográfica | Impacto. Prova de qualidade em 3 segundos |
| 01 | `01:24`  | Introdução editorial   | Explica o que ela faz, sem jargão          |
| 02 | `03:10`  | Portfólio vivo         | Prova social por volume e variedade        |
| 03 | `05:45`  | Projeto em destaque    | Prova de profundidade: um case inteiro     |
| 04 | `08:20`  | Serviços               | Traduz o trabalho em cinco produtos        |
| 05 | `11:30`  | Pacotes de cobertura   | **Conversão principal**                    |
| 06 | `14:05`  | Serviços exclusivos    | Ticket alternativo (fashion film, mensal)  |
| 07 | `15:40`  | Produtos e mentorias   | Receita não-serviço. Placeholder por ora   |
| 08 | `17:15`  | Sobre Karen            | Confiança pessoal                          |
| 09 | `19:00`  | Bastidores             | Legitima "videomaker mobile" como escolha  |
| 10 | `20:30`  | Depoimentos            | Prova social qualitativa                   |
| 11 | `21:45`  | Instagram              | Continuidade de relacionamento             |
| 12 | `23:00`  | Contato                | **Conversão secundária**, com pré-seleção  |
| —  | `FIM`    | Rodapé-créditos        | Encerramento                               |

Os timecodes são reais no sentido de que a régua lateral os exibe conforme a
posição de scroll. São uma metáfora consistente, não números aleatórios.

---

## 2. Paleta com hexadecimais

```
--paper        #FBF8F2   branco quebrado    fundo principal
--cream        #F2EBDD   creme              blocos alternados
--sand         #E3D6BE   bege editorial     réguas, separadores, metadados
--coffee       #4A3728   café               texto secundário, bordas
--ink          #17120F   preto quente       títulos, blocos invertidos
--gold         #A98442   dourado fosco      numeração, fio de destaque
--rec          #C4362F   vermelho REC       APENAS: gravação, timecode ativo, "mais contratado"
```

Derivadas necessárias:

```
--paper-hi     #FFFDF9   realce sobre papel (hover de linha)
--sand-deep    #CBB894   estados pressionados
--coffee-soft  #6B5240   texto de apoio, 60% de leitura
--ink-soft     #2A211B   blocos invertidos que não são o rodapé
```

**Regras rígidas**

- `--ink` como fundo só em blocos que contenham vídeo, no case em destaque e no
  rodapé-créditos. Nunca na página inteira.
- `--rec` tem três usos permitidos no site inteiro: ponto de gravação no hero,
  timecode da seção ativa, marca "mais contratado". Qualquer quarto uso é erro.
- Nenhum cinza neutro. Todo neutro puxa para o quente.
- Contraste mínimo: texto de corpo `--coffee` sobre `--paper` = 8.9:1. Títulos
  `--ink` sobre `--paper` = 15.8:1. Ambos passam AAA.
- `--gold` nunca em texto pequeno sobre `--paper` (2.9:1, reprova). Só em
  numeração ≥ 32px, fios e ícones não-informativos.

---

## 3. Fontes e onde cada uma entra

| Fonte              | Onde                                                                 | Pesos      |
| ------------------ | -------------------------------------------------------------------- | ---------- |
| **Fraunces**       | Títulos de seção, nome dos projetos, valores dos pacotes, manchetes   | 300, 400   |
| **Inter Tight**    | Navegação, corpo de texto, botões, rótulos, formulário                | 400, 500   |
| **JetBrains Mono** | Timecode, duração, ano, cliente/local nos metadados, número de capítulo | 400        |
| **Caveat**         | Anotações de marcador na régua. Máximo 3 no site inteiro, ≤ 13px      | 400        |

**Fraunces** é variável e tem eixos `SOFT` e `WONK`. Uso `WONK=1` acima de 48px
(o desenho ganha a inclinação de revista de moda) e `WONK=0` abaixo disso, para
não sujar textos médios. `opsz` acompanha o tamanho.

**JetBrains Mono** é o que entrega a linguagem de edição. Sem ela, a direção
vira "editorial genérico". Ela carrega o peso conceitual que em outros sites
seria feito por ícones — e por isso o site quase não usa Lucide.

Ícones Lucide permitidos: `Volume2`/`VolumeX` (som do hero), `ArrowUpRight`
(links externos), `X` (fechar modal). Mais nada.

Carregamento: `display=swap`, subset latin + latin-ext, preconnect para
`fonts.gstatic.com`. Fraunces e JetBrains Mono via variable font para evitar
múltiplos arquivos.

---

## 4. Lógica de movimento e transições

Princípio: **este site corta, não dissolve.** A metáfora é montagem.

| Elemento              | Movimento                                                    | Duração |
| --------------------- | ------------------------------------------------------------ | ------- |
| Troca de vídeo (serviços) | Corte seco — troca de `src` sem fade                     | 0 ms    |
| Entrada de título     | `clip-path: inset(100% 0 0 0)` → `inset(0)`, revela de baixo  | 700 ms  |
| Entrada de bloco      | opacidade 0→1 + `translateY(20px)`                           | 800 ms  |
| Timecode              | conta de `00:00` até o valor da seção ao entrar na viewport   | 600 ms  |
| Ponto REC             | opacidade 1 → 0.35 → 1, apenas com vídeo tocando              | 1000 ms loop |
| Régua de pacotes      | marcador com *snap* magnético                                | 350 ms  |
| Painel do pacote      | corte seco no conteúdo, régua preenche em dourado             | 350 ms  |
| Modal de projeto      | escala 0.98 → 1 + opacidade                                  | 400 ms  |
| Cursor `PLAY`         | segue o mouse com atraso de 0.15                             | contínuo |

Curva padrão: `cubic-bezier(0.22, 1, 0.36, 1)` — desacelera forte no fim, dá
sensação de peso controlado.

**`prefers-reduced-motion: reduce`**: todas as durações caem para 0.01ms,
o parallax é removido, o cursor PLAY some, o REC para de pulsar, os vídeos de
preview não iniciam sozinhos e o hero exibe apenas o poster. O site continua
100% funcional e legível.

**Economia de dados**: se `navigator.connection.saveData === true` ou
`effectiveType` for `2g`/`slow-2g`, nenhum vídeo dá autoplay. Hero mostra poster
com um botão "reproduzir" explícito.

---

## 5. Wireframe textual — desktop (≥1024px)

```
╔══════════════════════════════════════════════════════════════════════════╗
║ KAREN LIMA              trabalhos · serviços · pacotes · sobre   WHATSAPP ║ fixo
╠═══╦══════════════════════════════════════════════════════════════════════╣
║   ║                                                                       ║
║ 0 ║        [ VÍDEO 100dvh · object-cover · overlay 12% ink ]              ║
║ 0 ║                                                                       ║
║ : ║   KAREN LIMA                                    ← Fraunces 300, 88px  ║
║ 0 ║   FILMMAKER · STORYMAKER · FASHION FILM         ← Mono 12px, track .28 ║
║ 0 ║                                                                       ║
║   ║   Vídeos cinematográficos para marcas, eventos                        ║
║   ║   e histórias inesquecíveis.                    ← Fraunces 300, 26px  ║
║   ║                                                                       ║
║ ● ║   ver trabalhos   ·   solicitar orçamento                             ║
║REC║                                              ◀ som    ● REC 00:12:04  ║
╠═══╬══════════════════════════════════════════════════════════════════════╣
║ 0 ║  ┌──────────────┐                                                     ║
║ 1 ║  │              │      Mais do que registrar, Karen transforma        ║
║ : ║  │ FOTO         │      movimentos, atmosferas e detalhes em           ║
║ 2 ║  │ BASTIDOR 4:5 │      histórias feitas para permanecer.              ║
║ 4 ║  │              │                                     ← Fraunces 42px ║
║   ║  └──────────────┘                                                     ║
║   ║  ↑ Brasília, 2025            ┌────────┐                               ║
║   ║                              │ VÍDEO  │   CAPTAÇÃO — DIREÇÃO          ║
║   ║   deslocado, colunas          │  9:16  │   EDIÇÃO — ENTREGA           ║
║   ║   de larguras diferentes      │        │   ← Mono 11px, empilhado     ║
║   ║                              └────────┘   BRASÍLIA — DF               ║
╠═══╬══════════════════════════════════════════════════════════════════════╣
║ 0 ║  TRABALHOS                                                            ║
║ 3 ║  tudo │ fashion │ marcas e clínicas │ eventos │ story │ lifestyle      ║
║ : ║  ─────                                          ← filtro sublinhado   ║
║ 1 ║                                                                       ║
║ 0 ║  ┌─────────┐  ┌──────────────────────┐                                ║
║   ║  │         │  │                      │  ┌─────────┐                   ║
║   ║  │  9:16   │  │       16:9           │  │   1:1   │                   ║
║   ║  │         │  │                      │  └─────────┘                   ║
║   ║  │         │  └──────────────────────┘  ┌─────────┐                   ║
║   ║  └─────────┘  HELLEN AZEVEDO·2025·00:38 │   1:1   │                   ║
║   ║  ARABIAN GLOW                            └─────────┘                   ║
║   ║  ·2025·BSB·00:42                                                      ║
║   ║          ┌──────────┐         ┌─────────┐                             ║
║   ║          │   4:5    │         │  9:16   │  ← margens negativas,        ║
║   ║          └──────────┘         └─────────┘     nunca alinhado em grid  ║
║   ║                                                                        ║
║   ║  cursor sobre vídeo = disco preto com "PLAY" em mono branco           ║
╠═══╬══════════════════════════════════════════════════════════════════════╣
║ 0 ║ ███████████ BLOCO --ink ███████████████████████████████████████████   ║
║ 5 ║ CASE                                                                  ║
║ : ║ Hellen Azevedo Clínica                        ← Fraunces 300, 64px    ║
║ 4 ║ CLIENTE Hellen Azevedo · CATEGORIA Clínicas · LOCAL Brasília — DF     ║
║ 5 ║ ────────────────────────────────────────────                          ║
║   ║ ┌──────────────────┐  OBJETIVO   texto curto                          ║
║   ║ │                  │  CONCEITO   texto curto                          ║
║   ║ │   VÍDEO GRANDE   │  CAPTAÇÃO   texto curto                          ║
║   ║ │                  │  EDIÇÃO     texto curto                          ║
║   ║ └──────────────────┘  ENTREGA    texto curto                          ║
║   ║ [frame] [frame] [frame]   ← tira de 3 frames, alturas desiguais       ║
╠═══╬══════════════════════════════════════════════════════════════════════╣
║ 0 ║  SERVIÇOS                                    ┌────────────────────┐   ║
║ 8 ║                                              │                    │   ║
║ : ║  01 — STORYMAKER              ←ativo         │   VÍDEO TROCA COM  │   ║
║ 2 ║     Cobertura em tempo real de eventos,      │   O ITEM EM FOCO   │   ║
║ 0 ║     experiências e bastidores.               │                    │   ║
║   ║  02 — VIDEOMAKER MOBILE                      │   (corte seco,     │   ║
║   ║  03 — FASHION FILM                           │    sem fade)       │   ║
║   ║  04 — CONTEÚDO PARA MARCAS                   │                    │   ║
║   ║  05 — COBERTURA DE EVENTOS                   └────────────────────┘   ║
║   ║  ↑ número em dourado 32px, nome em Fraunces 36px, sem card, sem ícone ║
╠═══╬══════════════════════════════════════════════════════════════════════╣
║ 1 ║  PACOTES DE COBERTURA                                                 ║
║ 1 ║                                                                       ║
║ : ║  ├──────────────●──────────────┼──────────────┼──────────────┤        ║
║ 3 ║  2 HORAS       4 HORAS        8 HORAS       12 HORAS                  ║
║ 0 ║  R$ 550        R$ 1.000       R$ 1.900      R$ 2.800                  ║
║   ║                 ● mais contratado  ← ponto REC discreto               ║
║   ║  ═══════════════ preenchimento dourado até o marcador ═══════         ║
║   ║                                                                       ║
║   ║  SELECT                          Captação completa                    ║
║   ║  4 horas         ← Mono          Reels editados                       ║
║   ║                                  Bastidores exclusivos                ║
║   ║  R$ 1.000        ← Fraunces      Conteúdo otimizado para redes        ║
║   ║                     300, 96px                                         ║
║   ║  Ideal para eventos, ativações de marca e produções completas.        ║
║   ║                                                                       ║
║   ║  [ ESCOLHER ESTE PACOTE ]  → WhatsApp com mensagem pronta             ║
╠═══╬══════════════════════════════════════════════════════════════════════╣
║ 1 ║  SERVIÇOS EXCLUSIVOS                                                  ║
║ 4 ║  ───────────────────────────────────────────────────────────          ║
║   ║  FASHION FILM              a partir de    R$ 600     [vídeo 9:16]     ║
║   ║  COBERTURA DE EVENTOS      a partir de    R$ 700     [vídeo 9:16]     ║
║   ║  PACOTES MENSAIS           personalizado             [vídeo 9:16]     ║
║   ║  ↑ linhas, não cards. Vídeo aparece ao focar a linha.                 ║
╠═══╬══════════════════════════════════════════════════════════════════════╣
║ 1 ║  PRODUTOS E MENTORIAS       ← cartelas de abertura sobre vídeo        ║
║ 5 ║  [PLACEHOLDER — marcado no código]                                    ║
╠═══╬══════════════════════════════════════════════════════════════════════╣
║ 1 ║  SOBRE                                                                ║
║ 7 ║  ┌────────────────┐   Karen Lima é filmmaker, storymaker e            ║
║   ║  │ FOTO/VÍDEO     │   videomaker mobile em Brasília. …                ║
║   ║  │ ELA TRABALHANDO│                                                   ║
║   ║  │ sangrada, sem  │   DIREÇÃO ─── CAPTAÇÃO ─── EDIÇÃO                 ║
║   ║  │ card, sem borda│   BRASÍLIA — DF          ← créditos em mono       ║
║   ║  └────────────────┘                                                   ║
╠═══╬══════════════════════════════════════════════════════════════════════╣
║ 1 ║  BASTIDORES   tira horizontal com scroll lateral, clipes de 3-6s      ║
║ 9 ║  [▸][▸][▸][▸][▸][▸]  ← alturas alternadas, sem legenda                ║
╠═══╬══════════════════════════════════════════════════════════════════════╣
║ 2 ║  "Karen não apenas registrou o evento. Ela conseguiu traduzir         ║
║ 0 ║   exatamente a experiência que queríamos transmitir."                 ║
║   ║                                        ← Fraunces italic 44px         ║
║   ║   entre dois vídeos, sem card, sem estrela, sem aspas decorativas     ║
╠═══╬══════════════════════════════════════════════════════════════════════╣
║ 2 ║  NO INSTAGRAM   [capa][capa][capa][capa][capa][capa]                  ║
║ 1 ║                 [ acompanhar @karen.filmmer ]                          ║
╠═══╬══════════════════════════════════════════════════════════════════════╣
║ 2 ║ ███████████ BLOCO --ink ███████████████████████████████████████████   ║
║ 3 ║                                                                       ║
║ : ║   Sua próxima história começa aqui.        ← Fraunces 300, 72px       ║
║ 0 ║                                                                       ║
║ 0 ║   sobre o que vamos conversar?                                        ║
║   ║   storymaker · fashion film · evento · marca · mensal · outro         ║
║   ║   ──────────                       ← chip selecionado sublinhado      ║
║   ║                                                                       ║
║   ║   [ FALAR PELO WHATSAPP ]   ver instagram                             ║
║   ║   BRASÍLIA — DF                                                       ║
╠═══╩══════════════════════════════════════════════════════════════════════╣
║              ─────────── créditos finais ───────────                      ║
║   DIREÇÃO, CAPTAÇÃO E EDIÇÃO      KAREN LIMA                              ║
║   LOCAÇÃO                         BRASÍLIA — DF                           ║
║   CONTATO                         WHATSAPP · INSTAGRAM                    ║
║                                                    © 2026                 ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

## 6. Wireframe textual — celular (< 768px)

A régua vertical vira **barra de progresso no topo** com o timecode da seção.

```
┌───────────────────────────────┐
│▓▓▓▓▓░░░░░░░░░  03:10   MENU   │ ← barra + timecode + menu textual
├───────────────────────────────┤
│                               │
│                               │
│   [ VÍDEO VERTICAL 100dvh ]   │
│   object-cover, foco no       │
│   terço superior para não     │
│   cortar rosto                │
│                               │
│                               │
│   KAREN LIMA                  │ ← 44px
│   FILMMAKER · STORYMAKER      │ ← mono 10px
│   FASHION FILM                │
│                               │
│   Vídeos cinematográficos     │
│   para marcas, eventos e      │
│   histórias inesquecíveis.    │
│                               │
│   [ ver trabalhos          ]  │ ← largura total, 52px alto
│   [ solicitar orçamento    ]  │
│                    ◀ som  ●REC│
├───────────────────────────────┤
│  ┌─────────────────────────┐  │
│  │   FOTO BASTIDOR 4:5     │  │  intro editorial:
│  └─────────────────────────┘  │  empilha, mantém
│  ↑ Brasília, 2025             │  o deslocamento
│                               │  com margem
│    Mais do que registrar,     │  assimétrica
│    Karen transforma           │
│    movimentos, atmosferas     │
│    e detalhes em histórias    │
│    feitas para permanecer.    │
│                               │
│         ┌───────────┐         │
│         │VÍDEO 9:16 │         │
│         └───────────┘         │
│  CAPTAÇÃO — DIREÇÃO           │
│  EDIÇÃO — ENTREGA             │
│  BRASÍLIA — DF                │
├───────────────────────────────┤
│  TRABALHOS                    │
│  ‹ tudo │ fashion │ marcas ›  │ ← scroll horizontal com snap
│  ───                          │
│  ┌─────────────────────────┐  │
│  │                         │  │  coluna única sangrada
│  │      VÍDEO 9:16         │  │  toca ao entrar na
│  │                         │  │  viewport, um por vez
│  │                         │  │  (IntersectionObserver
│  └─────────────────────────┘  │   + fila global)
│  ARABIAN GLOW                 │
│  MENTORIA · 2025 · BSB · 0:42 │
│  ┌─────────────────────────┐  │
│  │      VÍDEO 16:9         │  │ ← horizontal mantém
│  └─────────────────────────┘  │   proporção, não corta
│  HELLEN AZEVEDO · 2025 · 0:38 │
├───────────────────────────────┤
│  CASE — bloco --ink           │
│  vídeo full-width, depois     │
│  os 5 tópicos empilhados      │
├───────────────────────────────┤
│  SERVIÇOS                     │
│  ┌─────────────────────────┐  │ ← no mobile o vídeo
│  │  VÍDEO DO ITEM ATIVO    │  │   vem ANTES da lista
│  └─────────────────────────┘  │
│  01 — STORYMAKER          ▸   │ ← acordeão: tocar abre
│     Cobertura em tempo real…  │   e troca o vídeo acima
│  02 — VIDEOMAKER MOBILE   ▸   │
│  03 — FASHION FILM        ▸   │
│  04 — CONTEÚDO P/ MARCAS  ▸   │
│  05 — COBERTURA DE EVENTOS▸   │
├───────────────────────────────┤
│  PACOTES                      │
│                               │
│  ‹ 2h │ 4h● │ 8h │ 12h ›      │ ← chips com snap, não régua
│  ══════════                   │   (arrastar régua fina é
│                               │    ruim no toque)
│  SELECT                       │
│  4 horas                      │
│                               │
│  R$ 1.000                     │ ← 64px
│                               │
│  Ideal para eventos,          │
│  ativações de marca e         │
│  produções completas.         │
│                               │
│  — Captação completa          │
│  — Reels editados             │
│  — Bastidores exclusivos      │
│  — Conteúdo para redes        │
│                               │
│  [ ESCOLHER ESTE PACOTE    ]  │
├───────────────────────────────┤
│  EXCLUSIVOS — linhas          │
│  PRODUTOS — cartela por tela  │
│  SOBRE — foto sangrada        │
│  BASTIDORES — tira horizontal │
│  DEPOIMENTO — citação grande  │
│  INSTAGRAM — 2 colunas        │
├───────────────────────────────┤
│  Sua próxima história         │
│  começa aqui.                 │
│  ‹ storymaker │ fashion ›     │ ← chips com snap
│  [ FALAR PELO WHATSAPP     ]  │
├───────────────────────────────┤
│  créditos finais empilhados   │
└───────────────────────────────┘
│ [ WHATSAPP — pacote select ]  │ ← barra fixa, aparece
└───────────────────────────────┘   após o hero, com o
                                    pacote selecionado
```

**Decisões específicas de mobile**

- Hero usa `object-position: 50% 30%` para manter rosto acima do texto.
- Texto do hero sempre no terço inferior, com gradiente local de 30% de altura —
  não um overlay na tela inteira.
- `100dvh`, não `100vh`, para não brigar com a barra do Safari.
- Um único vídeo toca por vez. Fila global: ao entrar em viewport, o vídeo pede
  o "slot"; o anterior pausa e volta ao poster.
- Vídeos fora da viewport são pausados e têm `preload="none"`.
- Alvo de toque mínimo 48px. Chips de pacote com 52px.
- Régua arrastável vira chips com `scroll-snap` — arrastar um marcador fino é
  hostil no toque.

---

## 7. Como os pacotes funcionam sem cards convencionais

**O problema com quatro cards**: eles pedem comparação lado a lado, mas os
pacotes da Karen não diferem em *features* — diferem em **tempo**. Signature e
Exclusive fazem a mesma coisa por 2h e por 12h. Card lado a lado esconde isso.

**A solução: a duração é a interface.**

### Desktop — régua de tempo

```
├──────────────●──────────────┼──────────────┼──────────────┤
2h            4h             8h            12h
R$550       R$1.000        R$1.900       R$2.800
             ● mais contratado
═══════════════ preenchida em --gold até o marcador
```

- Uma linha horizontal representa a duração da cobertura.
- Quatro marcadores fixos. O ativo é um disco de `--ink` com anel de `--gold`.
- Clicar, arrastar ou usar `←` `→` move o marcador com *snap* magnético.
- A porção à esquerda do marcador preenche em `--gold`, comunicando "quanto
  tempo você está comprando".
- Abaixo, o painel do pacote troca por **corte seco** — sem fade, coerente com
  a metáfora de montagem.
- O valor entra em Fraunces 96px. É o maior número da página inteira.
- "Mais contratado" é um ponto `--rec` de 6px sobre a marca de 4h, com rótulo em
  mono 10px. Sem selo, sem faixa, sem card destacado.

### Celular — capítulos com snap

A régua arrastável é substituída por **chips com `scroll-snap`**: `2h · 4h · 8h ·
12h`, 52px de altura, deslizáveis com o polegar. O chip ativo ganha sublinhado
em `--gold` e a barra fina abaixo preenche proporcionalmente. O conteúdo do
pacote ocupa a tela inteira abaixo.

Motivo da troca: arrastar um marcador de 8px numa linha fina é uma das piores
interações possíveis no toque. Os chips preservam a metáfora de duração sem a
frustração.

### Acessibilidade da régua

- `role="radiogroup"` com quatro `role="radio"`.
- Navegável por `Tab` para entrar e `←` `→` para mudar.
- `aria-label` de cada opção: "Pacote Select, 4 horas, mil reais".
- Foco visível com contorno de 2px em `--ink`, offset 4px.
- O painel tem `aria-live="polite"` para anunciar a troca.

### Botão de conversão

Cada pacote tem `ESCOLHER ESTE PACOTE`, que abre o WhatsApp com:

```
Olá, Karen! Conheci seu trabalho pelo site e gostaria de saber
mais sobre o pacote Select.
```

O nome do pacote é interpolado a partir do estado selecionado. A barra fixa do
mobile espelha o pacote ativo: `WHATSAPP — PACOTE SELECT`.

---

## Estrutura de dados dos vídeos

Arquivo central, conforme pedido:

```ts
export interface Project {
  id: string;              // 'v012'
  title: string;
  client: string | null;
  category: Category;      // fashion | marcas | eventos | story | lifestyle | mobile
  year: number;
  location: string;        // 'Brasília — DF'
  services: string[];      // ['Captação', 'Edição']
  poster: string;          // '/media/poster/v012.jpg'
  previewVideo: string;    // '/media/preview/v012.mp4'  (8s, mudo, ~500KB)
  fullVideo: string;       // '/media/mp4/v012.mp4'
  aspectRatio: '9:16' | '4:5' | '1:1' | '16:9';
  featured: boolean;
  durationLabel: string;   // '00:42'
}
```

Nenhuma URL do Google Drive. Todos os caminhos apontam para `/public/media/`,
preenchidos pelo pipeline de conversão.

### Carregamento

- Hero: `preload="auto"` — é a primeira impressão, vale o custo.
- Preview de card: `preload="none"`, só carrega ao entrar na viewport (desktop:
  ao hover).
- Vídeo completo: só carrega ao abrir o modal.
- Todo `<video>` tem `poster`, `muted`, `playsInline`, `loop`.
- Nenhum vídeo completo é carregado no primeiro paint.

---

## SEO local

- `<title>`: Karen Lima — Filmmaker e Videomaker em Brasília | Fashion Film e Eventos
- JSON-LD `LocalBusiness` + `ProfessionalService`, `areaServed: Brasília — DF`,
  `priceRange: R$$`.
- `og:image` gerado a partir de um frame real do portfólio.
- Headings em ordem: um `<h1>` no hero, `<h2>` por seção, `<h3>` por projeto.
- `alt` descritivo em toda imagem; vídeos decorativos com `aria-hidden`.
