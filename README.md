# Robotest - Login Streamlit

Robô de login administrativo para o site Streamlit usando Playwright com TypeScript.

## Pré-requisitos

- Node.js 18 ou superior
- npm

## Instalação

Instale as dependências do projeto:

```bash
npm install
```

Instale os navegadores usados pelo Playwright:

```bash
npx playwright install
```

## Variáveis de ambiente

Configure as variáveis antes de executar o robô:

```bash
export SITE_URL="https://coletapurm23.streamlit.app"
export SITE_PASS="senha_admin"
```

> Não coloque a senha real no código. O teste lê a senha somente de `process.env.SITE_PASS`.

## Como rodar localmente

Execute o fluxo de login:

```bash
npm run test:login
```

Ou execute todos os testes Playwright:

```bash
npm test
```

Ao finalizar o login com sucesso, o robô salva a captura de tela em:

```text
screenshots/login-ok.png
```

## Fluxo automatizado

O teste em `tests/login.spec.ts` realiza os seguintes passos:

1. Abre `SITE_URL`.
2. Aguarda o texto `Controle Operacional` carregar.
3. Clica em `Entrar como administrador`.
4. Aguarda o modal `Acesso administrativo`.
5. Preenche `Senha administrativa` com `SITE_PASS`.
6. Clica em `Entrar`.
7. Aguarda o modal sumir.
8. Salva o screenshot em `screenshots/login-ok.png`.
