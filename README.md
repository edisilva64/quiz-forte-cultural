# 🧠 Desafio Lógico Forte Cultural

Quiz interativo de raciocínio lógico, construído em **HTML5, CSS3 e JavaScript puro** (sem frameworks), com visual premium (glassmorphism, gradientes, animações), PWA instalável, SEO completo e integração de vendas com banners promocionais.

---

## 📁 Estrutura do projeto

```
Quiz-Forte-Cultural/
├── index.html
├── css/
│   ├── style.css          → design system, layout e componentes
│   ├── animations.css     → keyframes e microanimações
│   ├── responsive.css     → breakpoints (tablet, celular, TV)
│   └── dark.css           → modo escuro (automático + manual)
├── js/
│   ├── quiz.js            → banco de perguntas e níveis de resultado
│   ├── progress.js        → barra de progresso
│   ├── timer.js           → cronômetro
│   ├── confetti.js        → efeito de confetes
│   ├── certificate.js     → geração do certificado (canvas + PDF)
│   ├── share.js           → compartilhamento social
│   ├── ui.js               → renderização de telas
│   └── app.js              → orquestrador principal
├── img/
│   ├── camiseta-cafe.png
│   ├── camiseta-gato.png
│   ├── camiseta-fada.png
│   └── logo.png
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

Todas as perguntas estão em `js/quiz.js`, dentro do array `QUESTIONS`. Cada pergunta segue este formato:

```js
{
  id: 1,
  question: "Texto da pergunta",
  options: ["Alternativa A", "Alternativa B", "Alternativa C", "Alternativa D"],
  correctIndex: 2, // índice (0 a 3) da alternativa correta
  explanation: "Texto explicando a resposta correta"
}
```

## ➕ Como adicionar novas perguntas

1. Copie o bloco de uma pergunta existente em `QUESTIONS`.
2. Cole no final do array (antes do `]`).
3. Atualize o campo `id`.
4. Ajuste `question`, `options`, `correctIndex` e `explanation`.
5. Se aumentar o total de perguntas além de 15, revise os pontos de exibição dos banners promocionais em `js/app.js` (`finishedQuestionNumber === 5` e `=== 10`).

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

## 📢 Como alterar os anúncios (banners promocionais)

Em `js/ui.js`, edite o objeto `PROMO_CONTENT`:

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

Altere `title`, `text`, `emoji` e `cta` (texto do botão) livremente.

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
3. Sempre que atualizar arquivos do site, **incremente a versão do cache** em `sw.js`:
   ```js
   const CACHE_NAME = "forte-cultural-v2"; // altere o número da versão
   ```
   Isso força os usuários a baixarem a versão mais recente.

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

## 🌓 Dark mode

O modo escuro é ativado automaticamente conforme a preferência do sistema operacional (`prefers-color-scheme: dark`), e também pode ser alternado manualmente pelo botão no cabeçalho (ícone de lua/sol).

---

## 🛠️ Suporte técnico

Este projeto não depende de nenhum backend, banco de dados ou serviço pago além do link da loja. Qualquer editor de código (VS Code, Sublime, etc.) é suficiente para editar os arquivos.
