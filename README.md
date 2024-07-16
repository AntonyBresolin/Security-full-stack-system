
# Projeto Full Stack - Sistema de Segurança

Este é um projeto modelo para aplicações web genéricas, utilizando um stack fullstack que incorpora tecnologias modernas para desenvolvimento web e segurança de aplicações.

## Tecnologias Utilizadas

- **Backend**
  - Java 21
  - Spring Boot
  - Spring Security com JWT e OAuth2
  - Maven 3.8.1
  - Docker

- **Frontend**
  - React
  - JavaScript
  - React Router
  - Node.js 9.6.2

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:
- Java 21
- Maven 3.8.1
- Node.js 9.6.2
- Docker

## Configuração e Instalação

### Configuração do Banco de Dados

Vá até a pasta `backend/docker`:
```
cd backend/docker
```
E rode o Docker Compose para subir o banco de dados:
```
docker-compose up
```

### Backend

Para preparar e construir o backend, siga os passos abaixo.

1. Navegue até a pasta `backend`:
```
cd ../..
cd backend
```
2. Execute o comando para limpar e instalar as dependências, pulando os testes:
```
mvn clean install -DskipTests
```
3. Para iniciar o servidor backend (pode também ser iniciado via IntelliJ):
```
mvn spring-boot:run
```

### Frontend

Para configurar o frontend:

1. Vá para a pasta `frontend`:
```
cd ../frontend
```
2. Instale as dependências do projeto:
```
npm install
```
3. Inicie a aplicação React:
```
npm start
```
## Acessos

Após a instalação e execução conforme as instruções acima, os serviços estarão disponíveis nos seguintes endereços:

- **Frontend:** Acesse a interface do usuário pelo navegador em [http://localhost:3000](http://localhost:3000).
- **Backend/API:** A API estará disponível em [http://localhost:8080](http://localhost:8080).

## Recursos

O sistema utiliza as seguintes tecnologias:

- **Backend:** Java com Spring Boot, utilizando Spring Security para o controle de sessões e autenticação via JWT e OAuth2.
- **Frontend:** React, utilizando React Router para roteamento e gerenciamento de estado interno para controle de sessões.
- **Base de dados:** O sistema usa MySQL como sistema de gerenciamento de banco de dados, o qual é executado em um container Docker.
