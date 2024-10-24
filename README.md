# POC Puppeteer

# Automação E2E Utilizando o framework Puppeteer

Esse é um repositório de automação de testes, desenvolvido para trabalhar com o framework Puppeteer.

## Table of Contents

1. [Objetivo](#objetivo)
2. [Estrtutura do projeto](#estrutura-do-projeto)
5. [Setup inicial](#setup-inicial)
6. [Executando Automação](#executando-automação)

## Objetivo

O objetivo desse projeto é criar uma automação do site https://www.saucedemo.com/, utilizando [Puppeteer](https://pptr.dev/) como framework de testes em combinação com a linguagem de programação Javascript, com a finalidade de comparar com os frameworks de teste Playwright, Cypress e Selenium como complemento do que foi analisado no Trabalho de Conclusão de Curso da Especialização em Testes Ágeis da faculdade CESAR School.

## Estrutura do projeto

```
|--- fixtures
|--- pages
|--- tests
|--- utils
|--- package-lock.json
|--- package.json
```

## Executando os testes

### Setup inicial

1. Esse projeto necessita do node.js. Para instalar, execute `npm install node` ou faça o download pelo site [Node](https://nodejs.org/en/download/)
2. Execute o comando `npm install` para instalar as dependências

### Executando Automação

- Execute um dos comandos abaixo para executar os testes.
  Exemplos:
- Para executar todos os testes em formato headed, execute `npm test`
<p>