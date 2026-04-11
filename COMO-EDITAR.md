# Como Editar o Site da Soora Bubble

Guia direto ao ponto para atualizar o site sem precisar saber programar.

---

## 1. Atualizar datas indisponíveis

Abra o arquivo `booking.js` e localize o bloco:

```js
datasIndisponiveis: [
  '2026-04-25',
  '2026-04-26',
  // ...
],
```

- **Adicionar uma data bloqueada:** inclua uma nova linha com o formato `'AAAA-MM-DD'` seguida de vírgula.
- **Remover um bloqueio:** apague a linha correspondente.
- **Formato obrigatório:** ano-mês-dia com zeros à esquerda. Ex.: 1º de maio de 2026 = `'2026-05-01'`.

---

## 2. Alterar o valor da diária

No mesmo arquivo `booking.js`, localize:

```js
valorDiariaBase: 1200,          // Domingo a quinta-feira
valorDiariaFimDeSemana: 1500,   // Sexta-feira e sábado
```

Troque os números pelo valor desejado em reais.

---

## 3. Adicionar ou remover comodidades (acomodações)

No `booking.js`, localize o array `ACOMODACOES`. Cada item tem esta estrutura:

```js
{
  id: 'identificador-unico',
  icon: `<svg>...</svg>`,     // ícone SVG (pode copiar de heroicons.com)
  titulo: 'Nome da comodidade',
  descricao: 'Descrição curta da comodidade.',
},
```

- **Adicionar:** copie um bloco completo, cole após o último item (antes do `]`) e edite o conteúdo.
- **Remover:** apague o bloco inteiro do item (da `{` até o `},`).
- **Editar texto:** altere `titulo` e `descricao` diretamente.

---

## 4. Substituir as fotos

As fotos são marcadas como `<!-- PLACEHOLDER: ... -->` no `index.html`. Para substituir:

1. Coloque o arquivo de imagem na pasta `/images/` (crie se não existir).
2. Localize o bloco `<figure class="img-placeholder...">` correspondente no HTML.
3. Substitua o bloco inteiro por:

```html
<figure>
  <img
    src="images/nome-da-foto.jpg"
    alt="Descrição da foto para acessibilidade"
    loading="lazy"
    width="800"
    height="600"
  />
</figure>
```

Fotos recomendadas (em ordem de impacto visual):

| Placeholder no HTML | Conteúdo ideal | Proporção |
|---|---|---|
| `FOTO: Bolha de dia na floresta` | Vista frontal da bolha com vegetação | 3:4 vertical |
| `FOTO: Bolha à noite com estrelas` | Interior/exterior da bolha à noite | 16:9 horizontal |

---

## 5. Atualizar dados de contato e redes sociais

No `index.html`, procure por `<!-- EDITÁVEL:` — são comentários que marcam todos os pontos de edição:

- **WhatsApp:** troque `5500000000000` pelo número com código do país e DDD (sem espaços). Ex.: `5511987654321`.
- **E-mail:** troque `contato@soorabubble.com.br`.
- **Instagram/TikTok:** troque o `href="#"` pelo link completo do perfil.
- **Endereço:** localize `Estrada da Mata Atlântica, km 12` e atualize.
- **Endereço no rodapé:** idem.

---

## 6. Adicionar o mapa do Google Maps

1. Acesse [Google Maps](https://maps.google.com) e encontre a localização.
2. Clique em **Compartilhar → Incorporar mapa → Copiar HTML**.
3. No `index.html`, localize o comentário `<!-- EDITÁVEL: Substitua o bloco abaixo pelo iframe... -->`.
4. Apague o bloco `<div class="map-placeholder">...</div>` e cole o `<iframe>` copiado dentro de `<div class="map-container">`.

Exemplo final:
```html
<div class="map-container">
  <iframe
    src="https://www.google.com/maps/embed?pb=..."
    width="100%"
    height="400"
    style="border:0; border-radius: 12px;"
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
  ></iframe>
</div>
```

---

## 7. Atualizar horários de check-in / check-out

No `index.html`, localize a seção `id="checkin"` e edite:

```html
<li><strong>Check-in:</strong> A partir das 15h00</li>
<li><strong>Check-out:</strong> Até as 11h00</li>
```

---

## 8. Atualizar a política de cancelamento

No rodapé do `index.html` (dentro de `footer`), localize `<div class="footer__politica">` e edite o texto.

---

## Deploy em Netlify

1. Crie uma conta em [netlify.com](https://netlify.com).
2. No dashboard, clique em **"Add new site → Deploy manually"**.
3. Arraste a pasta do projeto para a área indicada.
4. Pronto! O site fica online em segundos com uma URL gerada automaticamente.
5. Para domínio próprio: **Site settings → Domain management → Add custom domain**.

### Deploy via GitHub (com atualização automática)

1. Faça push do repositório para o GitHub.
2. No Netlify: **Add new site → Import an existing project → GitHub**.
3. Selecione o repositório.
4. Branch: `main` (ou `claude/build-soora-bubble-site-JJf25`).
5. Publish directory: deixe em branco (raiz do projeto).
6. Clique **Deploy**. A cada novo commit, o site atualiza automaticamente.

## Deploy em Vercel

1. Crie uma conta em [vercel.com](https://vercel.com).
2. Clique em **"Add New → Project"** e importe o repositório do GitHub.
3. Framework Preset: **Other** (HTML estático).
4. Clique **Deploy**.

---

## Estrutura dos arquivos

```
/
├── index.html       ← estrutura do site (textos, seções)
├── style.css        ← visual (cores, fontes, layout)
├── main.js          ← comportamento (nav, animações)
├── booking.js       ← sistema de reservas (EDITAR AQUI)
├── favicon.svg      ← ícone da aba do browser
└── COMO-EDITAR.md   ← este arquivo
```
