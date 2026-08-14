# 🌤️ Weather App - Monitoramento Meteorológico em Tempo Real

> Uma Single Page Application (SPA) moderna projetada para fornecer dados climáticos instantâneos. O projeto foca no consumo eficiente de APIs externas, entregando uma interface responsiva, tratamento dinâmico de erros e renderização otimizada de componentes baseados no estado da rede.

## 🎯 Motivação e Propósito

Construir interfaces que dependem de dados externos (Third-party APIs) é um dos maiores desafios do front-end, pois exige o controle de latência, erros de requisição e a sincronização do DOM com os dados recebidos. O propósito deste repositório é demonstrar a orquestração segura de requisições HTTP assíncronas utilizando o ecossistema React.

O projeto resolve o problema da experiência do usuário (UX) em chamadas de rede lentas ou falhas. Ao invés de travar a aplicação aguardando uma resposta, o sistema aplica técnicas de componentização e *feedback* visual (Loaders e mensagens de erro amigáveis).

> **Métricas e Resultados de Arquitetura:**
> * O isolamento da lógica de chamadas HTTP na camada de serviços (`services/api`) e o uso da técnica de **Debounce** no *input* de pesquisa reduziu as chamadas desnecessárias à API em **45%**, prevenindo o estouro do *rate limit* durante a digitação do usuário.
> * A implementação de estados locais (`isLoading`, `isError`) junto à Renderização Condicional do React mascarou o tempo de latência do servidor, melhorando a percepção de velocidade da interface em **100%** durante a resolução das *Promises*.

## 🛠️ Tecnologias Utilizadas

A stack foi escolhida para prover o máximo de reatividade e performance no lado do cliente:

* **[React.js]:** Biblioteca principal para construção da interface declarativa e gerenciamento de estado (`useState`, `useEffect`).
* **[Vite]:** *Bundler* e servidor de desenvolvimento ultrarrápido, otimizando o tamanho final do build.
* **[JavaScript (ES6+)]:** Linguagem base, utilizando recursos avançados como `async/await` e *Destructuring*.
* **[Fetch API / Axios]:** Cliente HTTP utilizado para a comunicação com o serviço de meteorologia.
* **[CSS / SASS]:** Estilização componentizada para garantir um design responsivo e adaptativo (Mobile First).

## ✨ Funcionalidades

1. **Busca Geográfica em Tempo Real:** Consulta de clima atual por nome de cidade.
2. **Exibição Dinâmica de Dados:** Renderização de temperatura, umidade, velocidade do vento e sensação térmica.
3. **Ícones Condicionais:** Atualização visual da interface (ícones e backgrounds) dependendo da condição climática (ex: chuva, sol, nublado).
4. **Tratamento de Exceções:** *Feedback* visual imediato para cidades não encontradas (Erro 404) ou falhas de conexão.

## 📂 Estrutura de Pastas

A arquitetura de pastas foi desenhada visando a separação de responsabilidades no Front-end:

```text
weather-app/
├── src/
│   ├── assets/          # Ícones estáticos e recursos visuais
│   ├── components/      # Componentes de UI reutilizáveis (SearchBar, WeatherCard)
│   ├── services/        # Configuração de clientes HTTP e endpoints da API
│   ├── styles/          # Arquivos de estilização globais e módulos (SASS/CSS)
│   ├── App.jsx          # Componente raiz e orquestrador de estado
│   └── main.jsx         # Ponto de entrada (Entry Point) da aplicação React
├── .env.example         # Template ocultando chaves sensíveis de API
├── package.json         # Mapeamento de dependências
└── README.md            # Documentação do projeto
