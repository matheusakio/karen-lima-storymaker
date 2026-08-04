# Karen Lima — Três direções de arte

Documento de decisão. Nenhum código foi escrito ainda.

---

## Antes: o que o material dela revelou

Extraí frames dos vídeos e abri as fotos da pasta `images/`. O que está lá muda
algumas suposições que eu tinha feito.

**O que ela realmente filma** (observado, não suposto):

| Frente                    | Evidência no material                                                   |
| ------------------------- | ----------------------------------------------------------------------- |
| Clínica & estética        | Antes/depois de procedimento facial, atendimento em consultório          |
| Eventos corporativos      | Congresso de Direito Administrativo (OAB-DF), painéis no Ibmec, plateias |
| Eventos sociais / conexão | "Coffee break & Conexões", abraços, mesa posta ao ar livre               |
| Wellness                  | Aula de pilates/yoga em espaço de madeira e luz natural                  |
| Beleza / getting ready    | Retrato de robe de cetim, taça, luz de cortina                           |

**A assinatura visual dela já existe, e é tipográfica.** Em quase todo vídeo há
texto **serifado fino, branco, sobreposto**, quebrado em linhas curtas, quase
sempre centralizado — legendas explicativas nos vídeos de clínica ("devolvendo
sustentação para o terço médio da face") e frases poéticas nos de evento
("Sempre haverá um outro amor, outro trabalho, outra cidade…").

Isso é decisivo: **o site não deve inventar uma tipografia; deve amplificar a
que ela já usa.** As três direções abaixo partem daí.

**Paleta que o material já entrega:** tons de pele, madeira clara, verde folha,
bege de parede, cetim off-white, dourado de luz baixa. A paleta quente que você
pediu não é uma imposição — é literalmente a cor do trabalho dela.

### Problemas técnicos reais do acervo

| Fato                                  | Consequência                                                          |
| ------------------------------------- | --------------------------------------------------------------------- |
| 123 arquivos, **2,0 GB**              | Impossível servir como está                                           |
| **69 arquivos `.mov` em HEVC**        | Safari toca; **Chrome e Firefox não**. Precisa transcodificar para H.264 |
| **22 arquivos `.heic`**               | **Nenhum navegador** abre de forma confiável. Precisa converter        |
| Vídeos de 40 a 80 s, 40–76 MB cada    | Longos demais para preview; precisam de recorte                        |
| Nomes tipo `IMG_2345`, `copy_00D4…`   | Não carregam título, cliente nem data utilizável                       |
| 93 dos 123 arquivos são de um cliente | A pasta "Hellen Azevedo" domina o acervo; curadoria é obrigatória      |

Tenho `ffmpeg` disponível aqui e posso rodar a conversão completa (HEVC→H.264,
HEIC→WebP, recorte de previews, geração de posters). Mas a **curadoria dos 8 a
12 melhores** precisa de você ou da Karen — eu consigo ver os frames, não sei
quais projetos ela quer expor nem quais clientes autorizaram uso de imagem.

---

# DIREÇÃO 01 — **CORTE SECO**

> A timeline de montagem como identidade visual.

## 1. Conceito

O site se comporta como a linha do tempo de um editor: blocos justapostos,
metadados visíveis, marcadores, timecode. Mas executado em papel quente, não em
interface escura de software. A referência é o **caderno de decupagem** de uma
diretora — a parte humana da edição, não a técnica.

O gesto central: cada seção é um **clipe** na timeline. A navegação é uma régua.
O vermelho de REC aparece só onde tem função — indicador de vídeo tocando,
duração de pacote, marcador de capítulo. Nunca decorativo.

Por que esta: é a única das três que resolve simultaneamente os sete pontos que
você pediu — editorial de moda, cinema, beleza, **interface de edição**, vertical
mobile, sofisticação feminina e clareza comercial. A "interface de edição" é o
que impede o site de virar mais um portfólio bonito e genérico.

## 2. Paleta

| Papel                | Hex       | Uso                                              |
| -------------------- | --------- | ------------------------------------------------ |
| Branco quebrado      | `#FBF8F2` | Fundo principal                                  |
| Creme                | `#F2EBDD` | Blocos alternados, faixas de seção               |
| Bege editorial       | `#E3D6BE` | Réguas, separadores, fundo de metadado           |
| Café                 | `#4A3728` | Texto secundário, bordas                         |
| Preto quente         | `#17120F` | Títulos, blocos invertidos                       |
| Dourado fosco        | `#A98442` | Numeração de capítulo, fio de destaque           |
| **REC**              | `#C4362F` | Somente: ponto de gravação, timecode ativo, "mais contratado" |

Regra: preto quente só em blocos que contenham vídeo ou no rodapé-créditos.
Nunca como fundo de página inteira.

## 3. Tipografia

- **Fraunces** — títulos. Serifada variável com eixo ótico e *wonk*; nos tamanhos
  grandes ganha um desenho quase de revista de moda dos anos 70. Peso 300–400.
- **Inter Tight** — informação, navegação, botões. Sans neutra e estreita, some
  a favor do conteúdo.
- **JetBrains Mono** — timecode, duração, ano, metadados de projeto. É o que
  entrega a "linguagem de edição" sem precisar de nenhum ícone.
- **Caveat** — apenas anotações de marcador na timeline, tamanho ≤ 13px, no
  máximo três ocorrências no site inteiro.

## 4. Composição da home

Coluna de conteúdo deslocada à esquerda; uma **régua de timeline vertical fina**
acompanha o scroll na borda esquerda em desktop, marcando as seções com
timecode (`00:00`, `01:24`, `03:10`…). O olho lê em zigue-zague: bloco de vídeo
largo → bloco de texto estreito → par de verticais → faixa invertida.

## 5. Vídeos

Grade **assimétrica de módulos**, nunca uniforme: um 9:16 alto ocupando duas
linhas ao lado de dois 1:1 empilhados, um 16:9 quebrando a coluna inteira, um
4:5 deslocado com margem negativa.

Cada vídeo tem uma **faixa de metadado em mono** logo abaixo:
`FASHION FILM · 2025 · BRASÍLIA · 00:42`

Desktop: preview toca no hover, cursor vira um disco com `PLAY` em mono.
Mobile: toca ao entrar na viewport, um de cada vez, com ponto REC pulsando.

## 6. Serviços

Cinco **capítulos numerados** (`01` a `05`) em lista vertical. Ao passar o cursor
ou tocar, o vídeo do painel à direita troca com corte seco — sem fade, como um
corte de montagem. O número em dourado fosco cresce sutilmente. Sem card, sem
ícone.

## 7. Pacotes

**Régua de duração interativa.** Uma linha horizontal marcada em 2h / 4h / 8h /
12h. O visitante arrasta ou toca um marcador; o painel abaixo troca o conteúdo
do pacote com transição de corte. O valor aparece em Fraunces grande. A duração
selecionada preenche a régua em dourado. "Mais contratado" é um ponto REC
discreto sobre a marca de 4h.

Isso resolve a proibição de "quatro cards iguais" e ainda comunica o produto
real dela: **tempo de cobertura**.

## 8. Produtos e mentorias

Faixa de **cartelas de abertura de filme**: cada produto entra como um letreiro
sobre vídeo — nome em Fraunces grande, subtítulo em mono com formato e público,
valor no canto. Placeholder marcado como `PRODUTO EXEMPLO` no código quando
vazio.

## 9. Celular

A régua de timeline vira uma **barra de progresso fina no topo**, com o timecode
da seção atual. Vídeos verticais em coluna única, largura total sangrada.
Pacotes viram capítulos deslizáveis com snap horizontal, um por tela. Botão de
WhatsApp fixo no rodapé, discreto, com a duração selecionada visível.

## 10. Animações

- Transições de seção por **corte**, não por fade — coerente com a metáfora.
- Texto entra por *clip-path* revelando de baixo para cima, como legenda queimada.
- Timecode conta ao entrar na seção.
- Ponto REC pulsa a 1 Hz apenas quando há vídeo tocando.
- Marcadores da régua fazem *snap* magnético.
- Tudo desativado sob `prefers-reduced-motion`.

## 11. Como o visitante deve se sentir

Como se tivesse entrado na **sala de montagem** dela, não na vitrine. A sensação
é de acesso e de método: "essa pessoa sabe exatamente onde cortar". Confiança
técnica somada a bom gosto. Sai sabendo quanto custa e quanto tempo dura.

## 12. Wireframe textual — desktop

```
┌──────────────────────────────────────────────────────────────────────┐
│ KAREN LIMA          trabalhos  serviços  pacotes  sobre   ● WHATSAPP  │
├──┬───────────────────────────────────────────────────────────────────┤
│00│                                                                    │
│：│              [ VÍDEO VERTICAL FULL-BLEED · 100dvh ]                │
│00│                                                                    │
│  │   KAREN LIMA                                                       │
│  │   Filmmaker · Storymaker · Fashion Film                            │
│  │   Vídeos cinematográficos para marcas, eventos                     │
│  │   e histórias inesquecíveis.                                       │
│  │                                                                    │
│  │   [ ver trabalhos ]  [ orçamento ]              ◁ som   ● REC 00:12│
├──┼───────────────────────────────────────────────────────────────────┤
│01│  ┌─────────────┐                                                   │
│：│  │ foto        │   Mais do que registrar, Karen transforma          │
│24│  │ bastidor    │   movimentos, atmosferas e detalhes em             │
│  │  │ (4:5)       │   histórias feitas para permanecer.                │
│  │  └─────────────┘                                                   │
│  │        ┌──────┐   captação · direção · edição · entrega             │
│  │        │vídeo │                              BRASÍLIA — DF          │
│  │        │ 9:16 │                                                     │
│  │        └──────┘                                                     │
├──┼───────────────────────────────────────────────────────────────────┤
│02│  TRABALHOS      fashion │ marcas │ eventos │ story │ lifestyle      │
│：│                                                                     │
│10│  ┌────────┐ ┌──────────────────┐ ┌────────┐                        │
│  │  │        │ │                  │ │  1:1   │                        │
│  │  │  9:16  │ │      16:9        │ └────────┘                        │
│  │  │        │ │                  │ ┌────────┐                        │
│  │  │        │ └──────────────────┘ │  1:1   │                        │
│  │  └────────┘ CLIENTE·2025·00:38   └────────┘                        │
│  │        ┌──────────┐        ┌────────┐                              │
│  │        │   4:5    │        │  9:16  │   ← assimétrico, sem grid fixo│
├──┼───────────────────────────────────────────────────────────────────┤
│03│  ██ BLOCO PRETO QUENTE — CASE EM DESTAQUE ██                       │
│：│  nome do projeto · cliente · local                                  │
│45│  [vídeo grande]   objetivo / conceito / captação / edição / entrega │
│  │  [frame] [frame] [frame]        ← composição de revista            │
├──┼───────────────────────────────────────────────────────────────────┤
│04│  SERVIÇOS                             ┌──────────────┐             │
│：│  01 — Storymaker                      │              │             │
│20│  02 — Videomaker Mobile               │  vídeo troca │             │
│  │  03 — Fashion Film                    │  com o item  │             │
│  │  04 — Conteúdo para Marcas            │  em foco     │             │
│  │  05 — Cobertura de Eventos            └──────────────┘             │
├──┼───────────────────────────────────────────────────────────────────┤
│05│  PACOTES                                                           │
│：│  ├────────●────────────────────┼──────────────┼──────────────┤     │
│30│  2h      4h ● mais contratado  8h            12h                   │
│  │                                                                     │
│  │  SELECT · 4 horas          Captação completa                       │
│  │  R$ 1.000                  Reels editados                          │
│  │                            Bastidores exclusivos                    │
│  │  [ escolher este pacote ]  Conteúdo para redes                     │
├──┼───────────────────────────────────────────────────────────────────┤
│06│  EXCLUSIVOS   fashion film · a partir de R$600   [vídeo ao lado]   │
│07│  PRODUTOS     cartelas sobre vídeo                                  │
│08│  SOBRE        foto trabalhando + créditos (direção/captação/edição) │
│09│  BASTIDORES   tira horizontal de clipes curtos                      │
│10│  DEPOIMENTO   frase editorial grande entre dois vídeos              │
│11│  INSTAGRAM    4–6 capas selecionadas + [acompanhar @karen.filmmer]  │
├──┴───────────────────────────────────────────────────────────────────┤
│  Sua próxima história começa aqui.                                    │
│  [storymaker][fashion][evento][marca][mensal][outro] → WhatsApp       │
│  ─────────────── créditos finais ───────────────                      │
│  KAREN LIMA · Filmmaker · Storymaker · Fashion Film · Brasília — DF    │
└──────────────────────────────────────────────────────────────────────┘
```

---

# DIREÇÃO 02 — **PAPEL & PRATA**

> Uma revista impressa em que as fotos se mexem.

## 1. Conceito

O site é uma **edição impressa**. Tem número de página, olho de matéria, fio de
coluna, legenda de foto com crédito, marginália manuscrita. O vídeo aparece como
uma fotografia de revista que, inesperadamente, tem movimento — o contraste
entre o papel estático e a imagem viva é o efeito.

Referência de princípio (não de forma): a lógica de colagem e materialidade do
Johnny Harris, traduzida para moda e beleza.

Risco honesto: é a direção mais autoral das três e a que mais depende de imagem
excelente. Com material irregular, "papel" vira "bagunça".

## 2. Paleta

| Papel               | Hex       | Uso                                    |
| ------------------- | --------- | -------------------------------------- |
| Papel envelhecido   | `#F0E7D5` | Fundo principal, textura sutil de fibra |
| Bege impresso       | `#DFD0B4` | Segundo plano, recortes                |
| Tinta café          | `#3E2E22` | Corpo de texto                         |
| Preto tipográfico   | `#1B1512` | Manchetes                              |
| Dourado fosco       | `#B08D57` | Fio de seção, número de página         |
| Prata               | `#9A9A93` | Grampo, clipe, sombra de recorte       |
| **REC**             | `#B8332C` | Carimbo, marca de revisão              |

## 3. Tipografia

- **Playfair Display** — manchetes, com itálico usado de verdade.
- **Newsreader** — corpo de texto longo, desenho de jornal.
- **Archivo** — legendas, créditos, números de página, caixa alta estreita.
- **Caveat** — marginália real: setas, "aqui", círculos. Uso generoso, é parte
  do conceito.

## 4. Composição da home

Colunas de largura desigual, como diagramação de revista. Elementos "colados"
com leve rotação (−2° a +2°), sombra curta de papel sobre papel. Número de
página no canto inferior de cada seção. Fio dourado separando matérias.

## 5. Vídeos

Cada vídeo mora dentro de uma **moldura de foto impressa** com margem branca
generosa e legenda abaixo em Archivo:
`↑ Hellen Azevedo Clínica, Brasília, 2025. Captação e edição: Karen Lima.`

Alguns vídeos aparecem "recortados com tesoura" (máscara irregular). No hover, a
imagem ganha movimento e a legenda datilografa.

## 6. Serviços

Um **sumário de revista**: lista com pontilhado levando ao número da página, e
cada serviço abre uma "matéria" com foto e texto. Ao focar, uma seta manuscrita
aponta para o exemplo visual.

## 7. Pacotes

**Tabela editorial impressa** — como a página de preços de um catálogo antigo.
Linhas com fio, números grandes em Playfair, colunas alinhadas. O "mais
contratado" recebe um **carimbo** vermelho levemente torto. Ao selecionar, a
linha se expande mostrando o detalhamento.

## 8. Produtos e mentorias

Formato de **anúncio de revista**: página inteira, manchete grande, imagem
sangrada, cupom de resposta no rodapé com o botão de interesse.

## 9. Celular

Vira uma revista de bolso: coluna única, margens generosas, número de página
persistente. As rotações caem para ±1° (em tela pequena, papel torto vira
defeito). Marginália manuscrita reduz para no máximo uma por tela.

## 10. Animações

- Entrada de página: leve *page turn* (rotação em Y de 3°, 500 ms).
- Texto de legenda datilografa ao entrar em viewport.
- Recortes deslizam como papel sendo posicionado.
- Fio dourado se desenha da esquerda para a direita.
- Parallax mínimo entre camadas de papel.

## 11. Como o visitante deve se sentir

Como quem folheia uma revista bonita numa mesa de café e percebe, com um
segundo de atraso, que as fotos estão se movendo. Encantamento e artesania. A
Karen vira **autora**, não fornecedora.

## 12. Wireframe textual — desktop

```
┌──────────────────────────────────────────────────────────────────────┐
│ KAREN LIMA — edição 01          índice · trabalhos · preços · contato │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│         [ VÍDEO FULL-BLEED · manchete sobreposta, sem caixa ]         │
│                                                                       │
│              KAREN LIMA                                               │
│              Filmmaker · Storymaker · Fashion Film                    │
│              "Vídeos cinematográficos para marcas, eventos            │
│               e histórias inesquecíveis."                             │
│              [ver trabalhos] [orçamento]              ◁ som       p.1 │
├──────────────────────────────────────────────────────────────────────┤
│ ━━━━━━━━━━━━━━━━━━━━ fio dourado ━━━━━━━━━━━━━━━━━━━━                │
│  ┌──────────┐                                                         │
│  │  foto    │↖ "o antes de tudo"        Mais do que registrar,        │
│  │ recorte  │   (manuscrito)            Karen transforma movimentos,  │
│  │  −2°     │                           atmosferas e detalhes em      │
│  └──────────┘                           histórias feitas para         │
│   ↑ bastidor, Brasília, 2025            permanecer.                   │
│                          ┌───────┐                                    │
│   captação · direção ·   │ vídeo │                                p.2 │
│   edição · entrega       │ 9:16  │                                    │
├──────────────────────────────────────────────────────────────────────┤
│  ÍNDICE DE TRABALHOS                                                  │
│  Fashion Film ................................................ p.4    │
│  Marcas e clínicas ........................................... p.6    │
│  Eventos ..................................................... p.8    │
│                                                                       │
│  ┌──────────┐   ┌────────────────┐    ┌──────────┐                   │
│  │ moldura  │   │    moldura     │    │ moldura  │                   │
│  │  branca  │   │     branca     │    │  branca  │                   │
│  │  [vídeo] │   │    [vídeo]     │    │ [vídeo]  │                   │
│  └──────────┘   └────────────────┘    └──────────┘                   │
│  ↑ legenda      ↑ legenda com crédito ↑ legenda               p.4-5   │
├──────────────────────────────────────────────────────────────────────┤
│  MATÉRIA DE CAPA — case completo em diagramação de revista            │
│  manchete grande · olho · corpo em 2 colunas · frames intercalados    │
├──────────────────────────────────────────────────────────────────────┤
│  TABELA DE PREÇOS                                       [CARIMBO]     │
│  ─────────────────────────────────────────────────────────────────    │
│  SIGNATURE   2h    captação · bastidores · 2-4 vídeos      R$   550   │
│  SELECT      4h    captação · reels · bastidores           R$ 1.000   │
│  PRESTIGE    8h    cobertura · tempo real · reels premium  R$ 1.900   │
│  EXCLUSIVE  12h    acompanhamento · entrega premium        R$ 2.800   │
│  ─────────────────────────────────────────────────────────────────    │
│                                          [escolher este pacote] p.10  │
├──────────────────────────────────────────────────────────────────────┤
│  ANÚNCIO — produtos e mentorias (página inteira)                p.12  │
│  SOBRE / BASTIDORES / DEPOIMENTO em citação destacada / INSTAGRAM     │
├──────────────────────────────────────────────────────────────────────┤
│  EXPEDIENTE                                                           │
│  Direção, captação e edição: Karen Lima · Brasília — DF               │
│  Instagram · WhatsApp                                          p.16   │
└──────────────────────────────────────────────────────────────────────┘
```

---

# DIREÇÃO 03 — **HORA DOURADA**

> Quase nenhuma interface. A luz faz o trabalho.

## 1. Conceito

Minimalismo cinematográfico radical. O site é feito de **vídeos em tela cheia
separados por vazio**. Quase não há UI: a navegação é um traço, os títulos são
poucos e enormes, o texto comercial existe mas se apresenta só quando chamado.

O nome vem da hora dourada — a paleta inteira é a temperatura de luz do fim de
tarde, que é exatamente a luz de várias capturas dela.

Risco honesto: é a direção mais elegante e a mais arriscada comercialmente.
Sites assim vendem bem para quem já quer contratar e vendem mal para quem está
descobrindo. Exige vídeos impecáveis e curadoria curtíssima (6 a 8 trabalhos).

## 2. Paleta

| Papel               | Hex       | Uso                              |
| ------------------- | --------- | -------------------------------- |
| Areia clara         | `#F6F1E8` | Fundo dos respiros               |
| Creme quente        | `#EDE3D4` | Segundo plano                    |
| Areia profunda      | `#D9C7AC` | Fios, estados sutis              |
| Café claro          | `#6B5240` | Texto secundário                 |
| Café escuro         | `#2A1F18` | Títulos                          |
| Preto quente        | `#141010` | Só sob vídeo                     |
| Dourado luz         | `#C9A227` | Um único elemento por tela       |
| **REC**             | `#A83A2E` | Exclusivamente o indicador       |

Nenhum cinza. Nenhum branco puro. Nenhum preto puro fora de vídeo.

## 3. Tipografia

- **Cormorant Garamond** — títulos, pesos 300 e italic. Desenho fino, feminino,
  respira em tamanhos enormes.
- **Jost** — o mínimo de informação: navegação, botões, metadados. Caixa alta,
  tracking largo, corpo pequeno.
- Sem mono. Sem manuscrita. A contenção é o conceito.

## 4. Composição da home

Sequência de **telas cheias alternando vídeo e vazio**. Cada vídeo ocupa
100dvh; entre eles, uma tela de respiro com uma única frase centralizada em
Cormorant grande. Ritmo de respiração: cheio, vazio, cheio, vazio.

## 5. Vídeos

Full-bleed, um por vez, com scroll-snap. O título do projeto aparece em corpo
pequeno no canto inferior e cresce sutilmente quando o vídeo está no centro da
tela. Metadados só ao clicar, numa gaveta lateral discreta.

## 6. Serviços

Cinco telas sequenciais. Cada uma: vídeo de fundo, número romano pequeno, nome
do serviço em Cormorant enorme, uma frase. Avança por scroll.

## 7. Pacotes

**Seletor de horas em arco.** Um traço curvo com quatro pontos (2h, 4h, 8h,
12h). Ao selecionar, o conteúdo abaixo faz *cross-dissolve* longo — não corte.
O valor aparece em Cormorant no maior corpo tipográfico do site inteiro. O "mais
contratado" é apenas um ponto dourado.

## 8. Produtos e mentorias

Uma tela cheia por produto, tratada como um **pôster de filme**: imagem, título
enorme, uma linha de descrição, valor pequeno, um botão.

## 9. Celular

É onde esta direção brilha: vídeo vertical nativo em tela cheia, scroll-snap
como um feed de stories, mas silencioso e sem UI. Texto sempre no terço
inferior, nunca sobre rosto. Contato acessível por um traço fixo no rodapé.

## 10. Animações

- *Cross-dissolve* longo (700–900 ms) entre estados. Nada de corte.
- Títulos entram por opacidade e 8px de deslocamento — nada mais.
- Scroll-snap suave entre telas.
- O dourado é a única coisa que se move sozinha: um brilho lento no fio ativo.
- Sob `prefers-reduced-motion`, o site vira estático e continua funcionando.

## 11. Como o visitante deve se sentir

Calmo e impressionado. A sensação é de **galeria**, não de portfólio: alguém
confiante o bastante para mostrar pouco. Percepção de preço alto — o que ajuda
nos pacotes Prestige e Exclusive e atrapalha no Signature.

## 12. Wireframe textual — desktop

```
┌──────────────────────────────────────────────────────────────────────┐
│ KAREN LIMA                                              ─── menu      │
│                                                                       │
│                                                                       │
│              [ VÍDEO EM TELA CHEIA · 100dvh · sem overlay ]           │
│                                                                       │
│                              KAREN LIMA                               │
│                   Filmmaker · Storymaker · Fashion Film               │
│                                                                       │
│                    ver trabalhos    ·    orçamento                    │
│                                                          ◁ som   ● REC│
├──────────────────────────────────────────────────────────────────────┤
│                          [ TELA DE RESPIRO ]                          │
│                                                                       │
│                  Mais do que registrar, Karen transforma              │
│                  movimentos, atmosferas e detalhes em                 │
│                  histórias feitas para permanecer.                    │
│                                                                       │
│                            Brasília — DF                              │
├──────────────────────────────────────────────────────────────────────┤
│              [ VÍDEO TELA CHEIA — trabalho 01 ]                       │
│                                            Hellen Azevedo · 2025      │
├──────────────────────────────────────────────────────────────────────┤
│              [ VÍDEO TELA CHEIA — trabalho 02 ]                       │
├──────────────────────────────────────────────────────────────────────┤
│                          [ RESPIRO ]        I. Storymaker             │
├──────────────────────────────────────────────────────────────────────┤
│              [ VÍDEO ]                      II. Videomaker Mobile     │
├──────────────────────────────────────────────────────────────────────┤
│                            PACOTES                                    │
│                                                                       │
│                    ╭───────●───────────────╮                          │
│                   2h      4h      8h      12h                         │
│                                                                       │
│                            SELECT                                     │
│                           4 horas                                     │
│                                                                       │
│                          R$ 1.000                                     │
│                                                                       │
│              captação completa · reels editados                       │
│              bastidores · conteúdo para redes                         │
│                                                                       │
│                    escolher este pacote                               │
├──────────────────────────────────────────────────────────────────────┤
│  PRODUTOS (pôster por tela) · SOBRE · BASTIDORES · DEPOIMENTO         │
│  INSTAGRAM (4–6 capas)                                                │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│                 Sua próxima história começa aqui.                     │
│                                                                       │
│      storymaker · fashion · evento · marca · mensal · outro           │
│                          → WhatsApp                                   │
│                                                                       │
│   Karen Lima · Brasília — DF · Instagram · WhatsApp                   │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Comparação rápida

|                          | 01 CORTE SECO       | 02 PAPEL & PRATA   | 03 HORA DOURADA    |
| ------------------------ | ------------------- | ------------------ | ------------------ |
| Atende os 7 pontos pedidos | **Sim, todos**    | Falta "edição"     | Falta "comercial"  |
| Clareza comercial        | **Alta**            | Média              | Baixa              |
| Autoralidade             | Alta                | **Máxima**         | Alta               |
| Depende de vídeo perfeito | Não                | Sim                | **Muito**          |
| Funciona com acervo irregular | **Sim**        | Não                | Não                |
| Nº de trabalhos ideal    | 10–12               | 8–10               | 6–8                |
| Risco de parecer template | Baixo              | **Nenhum**         | Médio              |
| Esforço de implementação | Alto                | **Muito alto**     | Médio              |

**Recomendação: 01 CORTE SECO.** É a única que entrega os sete pontos que você
listou, a única que aguenta um acervo irregular como o atual, e a que comunica
preço e duração com clareza — que é como ela realmente vende.

A 02 é a mais bonita e a mais arriscada. A 03 é a mais elegante e a que menos
vende para quem ainda não conhece a Karen.

---

## Depois da escolha, entrego nesta ordem

1. Mapa da página
2. Paleta com hexadecimais definitivos
3. Fontes escolhidas e onde cada uma entra
4. Lógica de movimento e transições
5. Wireframe textual de desktop
6. Wireframe textual de celular
7. Como os pacotes funcionam sem cards convencionais

E só então o código.
