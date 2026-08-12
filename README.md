# 🌦️ Weather App — Previsão do Tempo

Aplicação web de consulta de previsão do tempo em tempo real, com interface glassmorphism e vídeo de fundo animado.
---

## 🎯 Sobre o Projeto

Weather App permite consultar o clima atual de qualquer cidade do mundo de forma rápida e visual. A aplicação consome a API gratuita [Open-Meteo](https://open-meteo.com/) e exibe temperatura, sensação térmica, umidade, vento, mínima/máxima e probabilidade de chuva.

---

## ✨ Funcionalidades

- 🔍 Busca por nome de cidade com suporte a formato **"cidade, estado"** (ex: Lajeado, RS)
- 🗺️ Geocoding automático via Open-Meteo — converte nome em coordenadas
- 📋 Seleção de cidade quando há nomes duplicados (ex: Lajeado/RS vs Lajeado/SP)
- 🌡️ Dados em tempo real: temperatura, sensação térmica, umidade, vento e probabilidade de chuva
- 🇧🇷 Mapa completo das 27 siglas de estados brasileiros
- 🌙 Ícones adaptados para dia e noite (códigos WMO)
- 🎬 Vídeo de fundo em loop com overlay gradiente
- 💎 Interface glassmorphism com animações de entrada e borda colorida rotativa
- 📱 100% responsivo — mobile, tablet e desktop

---

## 🛠️ Tecnologias

| Tecnologia | Função |
|---|---|
| **Next.js 16** | Framework React com App Router e Route Handlers |
| **TypeScript** | Tipagem estática em todo o projeto |
| **Tailwind CSS** | Estilização utilitária com classes responsivas |
| **Lucide React** | Ícones SVG leves e consistentes |
| **Open-Meteo API** | Dados meteorológicos e geocoding (gratuita, sem API key) |

---

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx                    # Página principal — orquestra estados e componentes
│   ├── layout.tsx                  # Layout raiz com metadados
│   ├── globals.css                 # Estilos globais e animações (fadeIn, borderGlow)
│   └── api/
│       └── weather/
│           └── route.ts            # Proxy servidor — geocoding + forecast + WMO codes
├── components/
│   └── weather/
│       ├── SearchBar.tsx           # Input de busca com dica de formato
│       ├── WeatherCard.tsx         # Card de resultado com ícones Lucide
│       └── CitySelect.tsx          # Lista de seleção para cidades duplicadas
├── lib/
│   └── weather.ts                  # Helpers de fetch (por nome e por coordenadas)
└── types/
    └── weather.ts                  # Interfaces TypeScript para API e dados internos
```

---

## 🚀 Como Rodar

**Pré-requisitos:** Node.js 18+ instalado.

```bash
# 1. Clone o repositório
git clone https://github.com/DouglassenG/weather-app.git

# 2. Entre na pasta
cd weather-app

# 3. Instale as dependências
npm install

# 4. Rode o servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:3000** no navegador.

> ℹ️ Não é necessário configurar API key. A Open-Meteo é gratuita e aberta para uso não-comercial.

---

## 🔄 Fluxo da Aplicação

```
Usuário digita "Lajeado, RS" → clica Buscar
        ↓
SearchBar envia o texto para page.tsx
        ↓
page.tsx chama fetchWeather("Lajeado, RS")
        ↓
lib/weather.ts faz fetch para /api/weather?city=Lajeado,%20RS
        ↓
route.ts separa "Lajeado" + "RS"
        ↓
Geocoding API retorna coordenadas de Lajeado/RS
        ↓
Forecast API retorna clima atual + min/max + probabilidade de chuva
        ↓
route.ts monta WeatherData e devolve ao frontend
        ↓
WeatherCard renderiza os dados na tela
```

---

## 🎨 Design

A interface segue o conceito **glassmorphism** com:

- Cards translúcidos com `backdrop-blur` sobre vídeo de fundo
- Animação de borda colorida rotativa no card de busca (céu → entardecer → sol → natureza)
- Animações de entrada em cascata (fade + slide)
- Ícones coloridos com fundo semitransparente por métrica
- Paleta escura para contraste e legibilidade sobre qualquer fundo

---

## 📄 Licença

Este projeto é de uso pessoal e educacional.

---

Desenvolvido por [Douglas](https://github.com/DouglassenG) 🚀
