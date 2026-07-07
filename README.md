# Bikes Summit — Protótipo de site (v1)

Protótipo de alta fidelidade da homepage da **Bikes Summit** — a primeira Cimeira ibérica dedicada ao ecossistema da bicicleta e à mobilidade sustentável.
📍 Matosinhos · Portugal · 09–10 Abril 2027

> Referência visual: [palermo.ddd.live](https://palermo.ddd.live) · Direção: secções mistas claro/escuro, tipografia display, gradientes verdes neon.
> Este protótipo servirá de base para reconstrução em **WordPress + Elementor Pro**.

## Como visualizar

Site estático, sem build. Basta abrir `index.html` num browser, ou servir a pasta:

```bash
python3 -m http.server 4599
# abrir http://localhost:4599
```

## Estrutura

```
index.html          → homepage (one-page, todas as secções)
css/style.css       → sistema de design + estilos
js/main.js          → nav, menu mobile, reveals, fallback de imagens
fonts/              → Aller (títulos) + Google Sans (texto)
img/                → logótipos Bikes Summit
assets/             → materiais de origem (PDF, arquitetura, paleta, logos)
```

## Secções da homepage

Hero · Ticker · Galeria · A Bikes Summit · Métricas · Eixos Temáticos ·
Oradores · Programa (2 dias) · Bilhetes · Expositores & Startups ·
Events Hub (Talks / After / Sunset / Night / Awards) · Sponsors · Footer.

## Identidade

| Uso | Cor |
|-----|-----|
| Verde neon (marca) | `#38F5C7` |
| Verde-petróleo (fundo escuro) | `#01140E` |
| Roxo (Bikes Summit Talks) | `#C85CF1` |
| Dourado (Bikes Summit Awards) | `#F7C938` |

**Tipografia:** Aller (display/títulos) · Google Sans (corpo).

## Notas

- Conteúdos (oradores, preços, sponsors) são **simulados** para efeitos de protótipo.
- Fotografias via Unsplash (banco de imagens) — substituir por fotografia oficial na produção.
- Responsivo (desktop / tablet / mobile), com `prefers-reduced-motion` respeitado.
