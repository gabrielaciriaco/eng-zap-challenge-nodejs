# Eng Zap Challenge - Nodejs - Gabriela Ciríaco

## Sumário
- [Descrição](#descricao)
- [Desafios enfrentados](#desafios-enfrentados)
- [Instruções de execução](#instrucoes-de-execucao)
- [Instruções de teste](#instrucoes-de-teste)
- [Instruções de deploy](#instrucoes-de-deploy)
- [Estrutura do código](#estrutura-do-codigo)

## Descrição

Este projeto consiste na implementação do desafio proposto pelo grupo Zap. O objetivo é criar uma API que consuma um endpoint que possua as informações gerais dos imóveis e liste a partir deles os imóveis pertencentes aos portais Viva Real e Zap, aplicando as regras de negócio indicadas para cada portal, cada tipo de imóvel e retornando nos endpoints correspondentes de cada portal os imóveis elegíveis a cada um deles.

## Desafios enfrentados

Um dos maiores desafios ao iniciar a construção deste projeto foi a falta de conhecimento prévio de uma das linguagens que são utilizadas pelo grupo Zap. Foi necessário, além dos conhecimentos teóricos e do entendimento do problema, estudos relacionados à tecnologia escolhida (nodejs) para que fosse possível o desenvolvimento do projeto.
<br>
<br>
Outro desafio enfrentado foi garantir que os dados da chamada ao endpoint fossem mantidos em memória sem a necessidade de realizar múltiplas requisições ao endpoint fornecido. Para solucionar esse problema, foi implementado um Singleton de imóveis que faz a requisição no momento em que a API é incializada. O Singleton tem como proposta ser uma única instância em toda a aplicação, sendo assim os dados seriam mantidos sem a necessidade de uma nova chamada ao endpoint.


## Instruções de execução

É possível executar o projeto de duas formas:

### Utilizando Docker

Para executar desta maneira, é necessário possuir o [Docker](https://docs.docker.com/engine/install/) instalado em sua máquina. Após realizada a instalação, basta executar o comando `docker-compose up -d` em seu terminal no diretório do projeto que a aplicação começará a rodar na porta 5000 do seu dispositivo.

### Utilizando o node

Para executar desta maneira, é necessário instalar o [node](https://nodejs.org/en/download/) na versão 14.0 (ou superior) em seu dispositivo. Execute o comando `npm install` para instalar as dependências do projeto e `npm start` para executar a API na porta 5000 do seu dispositivo.

## Instruções de teste

Com as dependências instaladas localmente, execute o comando `npm run test` para rodar os testes unitários.

## Instruções de deploy

O repositório do projeto está conectado ao [Heroku](https://www.heroku.com/), então toda alteração na branch `main` aciona um deploy no heroku. 
<br>
A API publicada no heroku se encontra no endereço: https://eng-zap-challenge-nodejs.herokuapp.com/api/v1/

