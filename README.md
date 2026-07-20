# 🧠 Desafio Lógico Forte Cultural

Quiz interativo de raciocínio lógico, construído em **HTML5, CSS3 e JavaScript puro** (sem frameworks), com visual premium (glassmorphism, gradientes, animações), PWA instalável, SEO completo e integração de vendas com banners promocionais.

> ## ⚠️ LEIA ANTES DE ATUALIZAR O SITE
> Toda vez que você receber uma nova versão deste projeto e for subir os arquivos para o GitHub, **o arquivo `js/config.js` volta com valores de exemplo** (ele não tem suas chaves reais do Supabase, por segurança). Depois de subir os arquivos, **sempre edite `js/config.js` direto no GitHub e cole suas chaves reais de novo** — senão o site perde a conexão com o banco de dados (o painel administrativo mostra "Banco de dados ainda não configurado" quando isso acontece). Veja o passo a passo na seção "Configurando o banco de dados" mais abaixo.

---

## 📁 Estrutura do projeto

```
Quiz-Forte-Cultural/
├── index.html
├── admin.html               → painel privado (contador de acessos, login)
├── css/
│   ├── style.css          → design system, layout e componentes
│   ├── animations.css     → keyframes e microanimações
│   ├── responsive.css     → breakpoints (tablet, celular, TV)
│   └── dark.css           → modo escuro (automático + manual)
├── js/
│   ├── config.js           → credenciais do Supabase (preencher)
│   ├── db.js                → integração com o banco de dados
│   ├── quiz.js              → banco de perguntas local (fallback) e níveis
│   ├── progress.js          → barra de progresso
│   ├── timer.js             → cronômetro (total + por pergunta)
│   ├── confetti.js          → efeito de confetes
│   ├── certificate.js       → geração do certificado (canvas + PDF)
│   ├── share.js             → compartilhamento social
│   ├── ui.js                → renderização de telas
│   └── app.js               → orquestrador principal
├── img/
│   ├── camiseta-cafe.png
│   ├── camiseta-gato.png
│   ├── camiseta-fada.png
│   └── logo.png
├── supabase/
│   └── schema.sql            → script único de configuração do banco
├── manifest.json           → configuração do PWA
├── sw.js                    → service worker (offline)
├── favicon.ico
└── README.md
```

---

## 🚀 Como publicar

1. Faça upload de **todos os arquivos e pastas** mantendo a mesma estrutura para o seu servidor (Hostinger, Vercel, Netlify, GitHub Pages etc.).
2. Certifique-se de que `index.html` fique na raiz do domínio/subpasta.
3. O site é 100% estático — não precisa de banco de dados nem backend.
4. Para ativar o PWA corretamente, o site **precisa estar em HTTPS** (obrigatório para Service Workers).

### Publicando em serviços gratuitos
- **Netlify / Vercel:** arraste a pasta inteira do projeto na interface de deploy.
- **GitHub Pages:** suba os arquivos para um repositório e ative "Pages" nas configurações.

---

## 🖼️ Como trocar as imagens das camisetas

As imagens ficam em `img/`:
- `camiseta-cafe.png` → banner após a pergunta 5
- `camiseta-gato.png` → banner após a pergunta 10
- `camiseta-fada.png` → banner antes do resultado final

Basta **substituir o arquivo mantendo o mesmo nome**, ou trocar o nome referenciado em `js/ui.js`, dentro do objeto `PROMO_CONTENT`:

```js
const PROMO_CONTENT = {
  cafe: { img: "img/camiseta-cafe.png", ... },
  gato: { img: "img/camiseta-gato.png", ... },
  fada: { img: "img/camiseta-fada.png", ... }
};
```

Recomendação: use imagens com no máximo ~700px de largura e comprimidas (JPG ou PNG otimizado) para manter o carregamento rápido.

---

## ❓ Como trocar as perguntas

**Se o banco de dados (Supabase) estiver configurado:** gerencie as perguntas direto pelo painel do Supabase — veja a seção "Como adicionar/editar perguntas pelo banco de dados" mais abaixo. É o método recomendado, não exige subir código novo.

**Banco de reserva local (fallback):** o arquivo `js/quiz.js` mantém uma cópia local de 400 perguntas, usada automaticamente caso o banco de dados não esteja configurado ou fique indisponível. Para editar esse fallback, vá em `js/quiz.js`, array `FALLBACK_QUESTIONS`. Cada pergunta segue este formato:

```js
{
  id: 1,
  question: "Texto da pergunta",
  options: ["Alternativa A", "Alternativa B", "Alternativa C", "Alternativa D"],
  correctIndex: 2, // índice (0 a 3) da alternativa correta
  explanation: "Texto explicando a resposta correta"
}
```

A cada partida, **15 perguntas são sorteadas aleatoriamente** (e em ordem aleatória) do total disponível — seja do banco de dados ou do fallback local (`QuizData.pickRandom`, em `js/quiz.js`). Além disso, a **ordem das 4 alternativas de cada pergunta também é embaralhada** a cada sorteio, para que a resposta certa nunca fique sempre na mesma posição (isso evita que alguém "decore" que a resposta costuma ser a B ou a C, por exemplo).

## ➕ Como adicionar novas perguntas ao fallback local

1. Copie o bloco de uma pergunta existente em `FALLBACK_QUESTIONS`.
2. Cole no final do array (antes do `]`).
3. Atualize o campo `id` (use um número que ainda não exista).
4. Ajuste `question`, `options`, `correctIndex` e `explanation`.

---

## 🎨 Como trocar as cores

As cores ficam centralizadas em `css/style.css`, no bloco `:root`:

```css
:root {
  --color-orange: #FF6B00;
  --color-green: #00A651;
  --color-navy: #16213E;
  --color-gray-light: #F6F7FB;
}
```

Basta alterar os valores hexadecimais — todo o site se atualiza automaticamente, pois os componentes usam essas variáveis.

---

## 🖼️ Logo e link do cabeçalho

A logo atual (`img/logo.png`) é um emblema circular com um ícone de lâmpada (representando ideia/lógica), em gradiente laranja → verde. Para trocá-la, basta substituir o arquivo `img/logo.png` mantendo o mesmo nome (recomendado: imagem quadrada, PNG com fundo transparente, pelo menos 256×256px).

Tanto a logo quanto o nome "Forte Cultural" no topo do site são, juntos, um link clicável que abre `https://umapenca.com/fortecultural/` em uma nova aba. Para trocar esse link, edite o `href` da tag `<a class="brand">` no início do `index.html`.

---

## 📢 Como alterar os anúncios (faixa lateral)

**Atualização:** o banner promocional não interrompe mais o quiz. Agora existe uma **faixa lateral fixa** (`promo-rail`), visível ao lado direito da tela em telas largas (a partir de 1240px) — posicionada na altura aproximada de onde ficava o título "DESAFIO LÓGICO" no hero, e não mais centralizada verticalmente. Em telas menores, vira um cartão estático acima da pergunta. A imagem, título, texto e botão trocam automaticamente a cada 5 perguntas:

- Perguntas 1 a 5 → `camiseta-cafe.png`
- Perguntas 6 a 10 → `camiseta-gato.png`
- Perguntas 11 a 15 → `camiseta-fada.png`

Para editar os textos/imagens, vá em `js/ui.js` e edite o objeto `PROMO_CONTENT`:

```js
const PROMO_CONTENT = {
  cafe: {
    img: "img/camiseta-cafe.png",
    emoji: "☕",
    title: "ESTILO CIÊNCIA",
    text: "Inteligência também se veste.",
    cta: "VER CAMISETA"
  },
  ...
};
```

Altere `title`, `text`, `emoji` e `cta` (texto do botão) livremente. Para mudar em quais perguntas cada imagem aparece, edite a função `getPromoKeyForIndex` no mesmo arquivo.

Para ajustar a posição vertical exata da faixa lateral fixa (desktop), edite `top: 150px;` em `css/responsive.css`, dentro do bloco `@media (min-width: 1240px) { .promo-rail { ... } }`.

---

## ⏱️ Cronômetro por pergunta (pressão)

Além do cronômetro total (tempo desde o início do desafio), cada pergunta tem seu **próprio cronômetro progressivo**, exibido no canto superior direito do cartão da pergunta. Ele:
- Começa em `00:00` a cada nova pergunta
- Conta o tempo enquanto o usuário pensa
- Fica vermelho e pulsa após 15 segundos, criando uma leve sensação de urgência

Para ajustar o tempo em que o alerta visual aparece, edite a constante em `js/app.js`:
```js
const PRESSURE_THRESHOLD_MS = 15000; // em milissegundos
```

> **Nota:** este cronômetro é apenas visual — não há penalidade real por demorar, nem limite de tempo que bloqueia a resposta.

---

## 🔗 Como alterar os links da loja

Os links para a loja aparecem em dois lugares:

1. **CTA final** (`index.html`), na tag `<a>` dentro da seção `cta-final`:
   ```html
   <a href="https://umapenca.com/fortecultural/" ...>🛍 VISITAR A LOJA</a>
   ```
2. **Banners promocionais** (`js/ui.js`), no template de `renderPromo`:
   ```js
   '<a class="btn btn-primary ripple" href="https://umapenca.com/fortecultural/" ...>'
   ```

Substitua a URL pelo link desejado nos dois lugares.

---

## 🏆 Como personalizar o certificado

O certificado é desenhado em `js/certificate.js`, na função `drawCertificate`. Você pode alterar:
- Cores de fundo e borda (`grad.addColorStop`, `ctx.strokeStyle`)
- Textos e fontes (`ctx.font`, `ctx.fillText`)
- Tamanho do canvas (definido em `index.html`, no elemento `<canvas id="certCanvas" width="1200" height="850">`)

O certificado é baixado automaticamente em **PDF** (via biblioteca jsPDF, carregada por CDN). Caso a biblioteca não carregue (ex: sem internet), o sistema faz fallback automático para download em **PNG**.

---

## 🔍 Como alterar o SEO

As tags de SEO ficam no `<head>` do `index.html`:
- `<meta name="description">` — descrição nos resultados de busca
- `<meta name="keywords">` — palavras-chave
- `<link rel="canonical">` — URL canônica (ajuste para o domínio real)
- Tags `og:*` e `twitter:*` — pré-visualização ao compartilhar em redes sociais
- Bloco `<script type="application/ld+json">` — dados estruturados Schema.org

**Importante:** atualize a URL em `rel="canonical"`, `og:url` e em `js/share.js` (constante `PAGE_URL`) para o domínio real após a publicação.

---

## 📲 Como atualizar o PWA

1. **Ícone e nome do app:** edite `manifest.json` (`name`, `short_name`, `icons`).
2. **Arquivos em cache offline:** edite a lista `ASSETS_TO_CACHE` em `sw.js`.
3. Sempre que atualizar QUALQUER arquivo do site (HTML, CSS ou JS), **incremente a versão do cache** em `sw.js`:
   ```js
   const CACHE_NAME = "forte-cultural-v5"; // sempre aumente esse número ao atualizar arquivos
   ```
   Isso força os navegadores dos usuários (inclusive o seu, ao testar) a descartar a versão antiga em cache e baixar a mais recente. **Esquecer esse passo é a causa mais comum de "eu editei mas não mudou nada"** — o Service Worker continua servindo a versão antiga guardada localmente no navegador.
4. `js/config.js` e `admin.html` são exceções propositais: eles **nunca** são guardados em cache (ver `NEVER_CACHE` em `sw.js`), justamente para que edições neles (como trocar as chaves do Supabase) apareçam imediatamente, sem depender de trocar a versão do cache.

> **Dica ao testar mudanças:** mesmo em aba anônima, se você recarregar a mesma aba várias vezes durante os testes, o Service Worker registrado nela pode continuar servindo arquivos antigos até a versão do cache mudar. Se algo parecer não ter atualizado, feche a janela anônima por completo e abra uma nova.

---

## ♿ Acessibilidade (WCAG 2.2)

- Navegação completa por teclado (Tab / Enter / Espaço).
- Foco visível em todos os elementos interativos.
- Atributos ARIA (`role`, `aria-live`, `aria-checked`, `aria-valuenow` etc.).
- Contraste de cores dentro dos padrões AA.
- Respeita `prefers-reduced-motion` para usuários sensíveis a animações.
- Link "Pular para o conteúdo" no topo da página.

---

## ⚡ Performance

- Imagens otimizadas e carregadas com `loading="lazy"` (exceto o herói/logo).
- `preconnect` e `preload` para fontes e imagens críticas.
- CSS e JS separados e organizados por responsabilidade (facilita cache do navegador).
- Service Worker com estratégia *cache-first* para acesso instantâneo em visitas futuras.

---

## 🗄️ Configurando o banco de dados (Supabase — gratuito)

O quiz agora usa um banco de dados real e gratuito ([Supabase](https://supabase.com)) para três coisas:
1. **Banco de perguntas** — 400 perguntas cadastradas; a cada partida, 15 são sorteadas aleatoriamente.
2. **Estatísticas gerais** — média de acertos e média de tempo de todos os jogadores, mostradas de forma incentivadora junto com o resultado de cada pessoa.
3. **Contador de acessos** — visível só para você, no painel administrativo (`admin.html`).

> **Enquanto você não configurar isso, o site continua funcionando normalmente** — ele usa um banco de 400 perguntas local (`js/quiz.js`) como reserva e simplesmente não mostra a comparação com outros jogadores nem o contador de acessos. Nada quebra.

### Aplicando atualizações no banco já configurado (patches)

Sempre que houver uma correção ou melhoria no banco de dados depois que você já rodou o `schema.sql` a primeira vez, ela vem como um arquivo separado dentro de `supabase/`, com nome começando em `patch_`. Para aplicar:
1. Abra o arquivo `patch_...sql` mais recente dentro da pasta `supabase/`.
2. Copie todo o conteúdo e cole no **SQL Editor** do Supabase.
3. Clique em **Run**.

Patches disponíveis até agora:
- `patch_2026-07-18_fix_admin_count.sql` — corrige o painel administrativo mostrando "Desafios Concluídos: 0".
- `patch_2026-07-18_expand_to_120_questions.sql` — atualiza o banco de perguntas de 30 para 120 (todas diferentes).
- `patch_2026-07-19_expand_to_400_questions.sql` — atualiza o banco de perguntas de 120 para 400 (todas diferentes). **Se você já rodou o patch de 120, não precisa rodar o de 120 de novo — só este.**

> Se você está configurando o Supabase pela primeira vez agora, **não precisa rodar os patches** — basta rodar o `schema.sql` completo, que já vem com tudo atualizado.

### Passo a passo

**1. Criar o projeto**
1. Acesse [supabase.com](https://supabase.com) e crie uma conta gratuita.
2. Clique em **New Project**, dê um nome (ex: `forte-cultural-quiz`) e uma senha de banco (guarde-a).
3. Aguarde alguns minutos até o projeto ficar pronto.

**2. Rodar o script de configuração**
1. No menu lateral, clique em **SQL Editor** → **New query**.
2. Abra o arquivo `supabase/schema.sql` (está dentro desta pasta do projeto), copie **todo o conteúdo** e cole no editor.
3. Clique em **Run**. Isso cria as tabelas, as permissões de segurança e já cadastra as 400 perguntas.

**3. Pegar as chaves de acesso**
1. No menu lateral, vá em **Project Settings** (ícone de engrenagem) → **API**.
2. Copie o valor de **Project URL** e o valor de **anon public** (a chave pública).
3. Abra o arquivo `js/config.js` do projeto e cole assim:
   ```js
   window.QUIZ_CONFIG = {
     SUPABASE_URL: "https://SEU-PROJETO.supabase.co",
     SUPABASE_ANON_KEY: "sua-chave-anon-aqui"
   };
   ```
4. Salve, suba o arquivo atualizado para o GitHub (substituindo o antigo) e pronto — o site já passa a usar o banco de dados.

**4. Criar seu login de administrador** (necessário para ver o contador de acessos)
1. No painel do Supabase, vá em **Authentication** → **Users** → **Add user**.
2. Escolha **Create new user**, preencha com seu e-mail e uma senha forte.
3. Marque a opção para já confirmar o e-mail automaticamente (ou confirme pelo link recebido).
4. Pronto — esse e-mail/senha é o que você vai usar para entrar em `admin.html`.

### Painel administrativo (contador de acessos)

Acesse `seusite.com/admin.html` (essa página **não aparece em nenhum menu do site** — só quem sabe o endereço consegue chegar nela, e mesmo assim precisa fazer login). Nela você vê:
- Total de acessos ao site
- Total de desafios concluídos
- Média geral de acertos
- Tempo médio geral

> **Sobre segurança:** o login usa autenticação real do Supabase — mesmo que alguém descubra a URL `admin.html`, não consegue ver nenhum número sem o seu e-mail e senha. Os dados brutos (tabela `results` e `page_views`) também ficam bloqueados para leitura pública no banco — só os números agregados (médias, totais) ficam disponíveis, e só depois do login.

#### Se o painel parar de mostrar os números

A página agora mostra o **erro técnico real** embaixo da mensagem genérica, o que ajuda a identificar a causa. As mais comuns são:
- **Projeto do Supabase pausado** — o plano gratuito pausa projetos automaticamente após cerca de 1 semana sem nenhum acesso à API. Se a mensagem de erro mencionar isso (ou "paused"/"inactive"), acesse [supabase.com](https://supabase.com), entre no projeto e clique em **Restore project**.
- **Patch de permissões não aplicado** — se a mensagem mencionar "row-level security" ou "permission denied", rode o `patch_2026-07-18_fix_admin_count.sql` (veja a seção de patches acima).
- **Sessão de login expirada** — clique em **Sair** e faça login novamente.

### Como funciona a comparação com outros jogadores

No resultado, o jogador vê mensagens como "você acertou mais que a média geral" ou "a média geral é X — jogue de novo e supere todo mundo!" — **sempre em tom positivo e de incentivo**, nunca como uma comparação crítica ou negativa, independentemente do desempenho da pessoa. Se ainda não houver dados suficientes (ex: acabou de configurar o banco), aparece uma mensagem de boas-vindas ao invés de qualquer número.

### Como adicionar/editar perguntas pelo banco de dados

Depois de configurado, você pode gerenciar as perguntas direto pelo painel do Supabase, sem precisar mexer em código:
1. Vá em **Table Editor** → tabela `questions`.
2. Para adicionar: clique em **Insert row** e preencha `question`, `options` (formato `["Alternativa A","Alternativa B","Alternativa C","Alternativa D"]`), `correct_index` (0 a 3) e `explanation`.
3. Para editar/excluir: clique na linha desejada.

O quiz sempre sorteia 15 perguntas aleatórias do total cadastrado — quanto mais perguntas você adicionar, maior a variedade entre as partidas.

---

## 🌓 Dark mode

O modo escuro é ativado automaticamente conforme a preferência do sistema operacional (`prefers-color-scheme: dark`), e também pode ser alternado manualmente pelo botão no cabeçalho (ícone de lua/sol).

---

## 🛠️ Suporte técnico

Este projeto não depende de nenhum backend, banco de dados ou serviço pago além do link da loja. Qualquer editor de código (VS Code, Sublime, etc.) é suficiente para editar os arquivos.
