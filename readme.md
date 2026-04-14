
# 🏋️‍♂️ MetaFit - Consulta de Status de Aluno

O **MetaFit** é uma interface de terminal de autoatendimento para academias, permitindo que os alunos consultem seu status de acesso (Ativo ou Bloqueado) de forma rápida e intuitiva através do CPF.

## 🚀 Funcionalidades

  * **Teclado Virtual Customizado:** Otimizado para telas touch e uso rápido.
  * **Formatação Automática:** Máscara de CPF em tempo real (`000.000.000-00`).
  * **Integração com API:** Consulta de dados em tempo real via `fetch`.
  * **Feedback Visual:** Diferenciação de estados (Sucesso, Bloqueio, Erro e Carregamento) com cores intuitivas.
  * **Suporte a Teclado Físico:** Atalhos para números, Backspace e Enter integrados.
  * **Interface Responsiva:** Desenvolvida com **Tailwind CSS**, adaptando-se a totens e dispositivos móveis.

-----

## 🛠️ Tecnologias Utilizadas

  * **HTML5:** Estrutura semântica.
  * **Tailwind CSS:** Estilização utilitária e responsiva.
  * **JavaScript (ES6+):** Lógica de manipulação de DOM, máscaras e consumo de API assíncrona.
  * **Vercel (API Externa):** Endpoint para validação de alunos.

-----

## 📂 Estrutura do Projeto

```text
├── index.html      # Estrutura principal da página
├── script.js       # Lógica do teclado, máscara e chamadas de API
└── images/         # Ativos visuais (Logotipos e ícones)
```

-----

## ⚙️ Como Instalar e Rodar

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/isajuca/Academia-Catraca.git 
    ```
2.  **Navegue até a pasta:**
    ```bash
    cd metafit
    ```
3.  **Abra o arquivo `index.html`:**
    Basta abrir o arquivo diretamente no seu navegador de preferência ou utilizar a extensão *Live Server* no VS Code.

-----

## 🌐 Integração com API

O projeto consome um endpoint REST que espera o CPF (apenas números) e retorna um objeto JSON.


Para alterar a URL da API, basta modificar a linha no arquivo `script.js`:

```javascript
const response = await fetch('SUA_NOVA_URL_AQUI' + cleanCPF);
```

-----

## 📝 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](https://www.google.com/search?q=LICENSE) para mais detalhes.

-----

## 🤝 Contato

Desenvolvido por **Isa Jucá** – sinta-se à vontade para entrar em contato!

-----