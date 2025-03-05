# Around The U.S.

Este projeto é uma aplicação de rede social interativa onde os usuários podem compartilhar, curtir e gerenciar cartões de fotos de diversos lugares dos EUA. Implementado usando React, o projeto utiliza funcionalidades modernas de React, como Context API, hooks e componentes funcionais.

## Funcionalidades

- Exibição de cartões de lugares com imagens
- Edição de perfil do usuário (nome, descrição e foto de perfil)
- Adição de novos cartões
- Curtir/descurtir cartões
- Exclusão de cartões criados pelo usuário
- Visualização de imagens em tamanho ampliado
- Confirmação de exclusão de cartões

## Tecnologias

- React (Componentes funcionais)
- Context API para gerenciamento de estado global
- Hooks (useState, useEffect, useContext, useRef)
- API RESTful para persistência de dados
- CSS modular para estilização

## Estrutura do Projeto

O projeto segue uma arquitetura de componentes organizada:

```
src/
  blocks/         # Estilos CSS por bloco (metodologia BEM)
  components/     # Componentes React
    header/       # Componentes de cabeçalho
    footer/       # Componentes de rodapé
    main/         # Componentes principais
      components/ # Subcomponentes utilizados pelo Main
        card/     # Componente de cartão
    popup/        # Componentes de pop-up
      editAvatar/     # Edição de avatar
      editProfile/    # Edição de perfil
      imagePopup/     # Visualização de imagem
      newCard/        # Adição de cartão
      removeCard/     # Confirmação de remoção
  contexts/       # Contextos React
  images/         # Recursos de imagem
  utils/          # Utilitários (API, constantes, etc.)
  vendor/         # Código de terceiros
```

## Como executar

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Execute o projeto: `npm start`
4. Acesse http://localhost:3000 no navegador

## Scripts disponíveis

- `npm start`: Inicia o servidor de desenvolvimento
- `npm build`: Cria build de produção
- `npm test`: Executa testes
- `npm eject`: Ejeta configurações do Create React App

## API

O projeto se conecta a uma API externa para persistência de dados. As operações incluem:

- Buscar/atualizar informações do usuário
- Buscar/criar/excluir cartões
- Curtir/descurtir cartões

## Autor

Este projeto foi desenvolvido como parte do programa de educação Web da Tripleten (anteriormente Practicum).
