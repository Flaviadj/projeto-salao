### Instalação do Ambiente de Desenvolvimento (Windows 10)
Para o seu projeto "projeto-salao", você precisará de:

Node.js e npm: Para rodar seu servidor backend (Express) e o frontend (React). O npm (Node Package Manager) vem junto com o Node.js.
XAMPP: Um pacote que inclui o servidor Apache, o banco de dados MySQL (ou MariaDB, que é compatível e está na sua configuração) e o PHP (que não será usado diretamente no seu projeto, mas é útil para o phpMyAdmin).
Passo 1: Instalar o XAMPP (Apache, MySQL/MariaDB)
O XAMPP é a forma mais fácil de ter um servidor web e banco de dados rodando na sua máquina localmente.

## Baixe o XAMPP:

Abra seu navegador e vá para o site oficial do XAMPP: https://www.apachefriends.org/download.html
Baixe a versão para Windows com a versão mais recente do PHP. Escolha a opção de download com "PHP 8.x.x".
Execute o Instalador do XAMPP:

Após o download, execute o arquivo .exe que você baixou.
Importante: Durante a instalação, pode aparecer um aviso sobre o UAC (User Account Control). Basta clicar em "OK" para prosseguir.
Siga as etapas do instalador. Quando ele perguntar quais componentes instalar, certifique-se de que Apache e MySQL estão selecionados. Os outros são opcionais para o seu projeto, mas pode deixá-los marcados se quiser.
Escolha a pasta de instalação. O padrão é C:\xampp. Pode deixar assim ou escolher outra, mas lembre-se onde instalou.
Conclua a instalação.
Inicie o XAMPP Control Panel:

Ao final da instalação, o instalador perguntará se você deseja iniciar o Painel de Controle do XAMPP. Marque essa opção e clique em "Finish".
Se não iniciar, procure por "XAMPP Control Panel" no menu Iniciar do Windows e execute-o.
Inicie o Apache e o MySQL:

No XAMPP Control Panel, você verá uma lista de módulos.

Clique no botão "Start" ao lado de "Apache".
Clique no botão "Start" ao lado de "MySQL".

Se tudo correr bem, os módulos ficarão verdes e você verá os PIDs e Portas associados. Se houver algum problema, pode ser conflito de portas (geralmente com o MySQL). Me avise se acontecer, mas o padrão é a porta 3306 para o MySQL, que é a que seu backend está configurado.
Passo 2: Configurar o Banco de Dados (MySQL/MariaDB)
Agora que o MySQL está rodando, vamos importar o banco de dados do seu projeto.

## Acesse o phpMyAdmin:
No XAMPP Control Panel, ao lado do módulo MySQL, clique no botão "Admin". Isso abrirá o phpMyAdmin no seu navegador (http://localhost/phpmyadmin/).
Crie o Banco de Dados:
No phpMyAdmin, no menu à esquerda, clique em "New" (ou "Novo").
No campo "Database name" (Nome do banco de dados), digite exatamente: projetosalao
Clique em "Create" (ou "Criar").
Importe o Script SQL:
Com o banco de dados projetosalao selecionado no menu à esquerda, clique na aba "Import" (Importar) na parte superior.
Clique no botão "Choose File" (Escolher arquivo) e navegue até a pasta do seu projeto: 

`fulano/projeto-salao/projeto-salao-/bd/`

# projeto-salao/blob/main/bd/projetosalao.sql

Selecione o arquivo `projetosalao.sql`

Role a página até o final e clique no botão "Go" (Executar/Ir).

Você deverá ver uma mensagem de sucesso, e as tabelas (agendamentos, categorias, clientes, procedimentos) aparecerão no menu à esquerda, dentro do banco projetosalao.

# : Instalar o Node.js e npm

Baixe o Node.js:

Vá para o site oficial do Node.js: https://nodejs.org/en/download/
Baixe o instalador para Windows (recomendado a versão LTS - Long Term Support, que é a mais estável). Escolha "Windows Installer (.msi)".
Execute o Instalador do Node.js:

Siga as instruções do instalador. Geralmente, você pode aceitar as opções padrão ("Next", "I accept the terms", "Next" até "Install").
Ele instalará o Node.js e o npm automaticamente.
Verifique a Instalação:

Abra o Prompt de Comando (cmd) ou PowerShell no Windows.
Digite os seguintes comandos e pressione Enter após cada um:

`node -v`

`npm -v`

Você deverá ver os números das versões instaladas (ex: v18.17.0 para Node.js e 9.6.7 para npm). Isso confirma que a instalação foi bem-sucedida.

# : Configurar e Iniciar o Backend (Servidor Node.js)
Abra o Prompt de Comando/PowerShell:

É importante que você abra uma nova janela do Prompt de Comando ou PowerShell após instalar o Node.js, para que as variáveis de ambiente sejam atualizadas.
Navegue até a pasta do servidor:

Use o comando cd (change directory) para ir até a pasta onde está o código do seu backend.
No seu caso, o caminho completo é: FULANO/projeto-salao/projeto-salao-/server.
Você pode copiar o caminho da barra de endereços do explorador de arquivos e usar:

cd `C:\caminho\completo\para\sua\pasta\projeto-salao-\server`

(Substitua C:\caminho\completo\para\sua\pasta pelo caminho real no seu computador).


# Instale as dependências do backend:

`npm install`

# Começando com o Create React App

Este projeto foi inicializado com [Create React App](https://github.com/facebook/create-react-app).

## Scripts Disponíveis

No diretório do projeto, você pode executar:

Isso baixará as bibliotecas express, mysql2, cors e nodemon para o seu servidor.

Inicie o servidor backend:

`npm start`


### `npm start`

Executa o aplicativo no modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizá-lo no seu navegador.

A página será recarregada quando você fizer alterações.\
Você também pode ver erros de lint no console.

### `npm test`

Inicia o executor de testes no modo de observação interativo.\
Consulte a seção sobre [execução de testes](https://facebook.github.io/create-react-app/docs/running-tests) para obter mais informações.

### `npm run build`

Cria o aplicativo para produção na pasta `build`.
Ele agrupa corretamente o React no modo de produção e otimiza a compilação para o melhor desempenho.

A compilação é minificada e os nomes dos arquivos incluem os hashes.

Seu aplicativo está pronto para ser implantado!

Consulte a seção sobre [implantação](https://facebook.github.io/create-react-app/docs/deployment) para obter mais informações.

### `npm run eject`

**Observação: esta é uma operação unidirecional. Depois de `ejetar`, você não pode voltar atrás!**

Se não estiver satisfeito com a ferramenta de compilação e as opções de configuração, você pode `ejetar` a qualquer momento. Este comando removerá a dependência de compilação única do seu projeto.

Em vez disso, ele copiará todos os arquivos de configuração e as dependências transitivas (webpack, Babel, ESLint, etc.) diretamente para o seu projeto, para que você tenha controle total sobre eles. Todos os comandos, exceto `eject`, continuarão funcionando, mas apontarão para os scripts copiados para que você possa ajustá-los. Neste ponto, você está por conta própria.

Você não precisa usar `eject`. O conjunto de recursos selecionados é adequado para implantações de pequeno e médio porte, e você não deve se sentir obrigado a usá-lo. No entanto, entendemos que esta ferramenta não seria útil se você não pudesse personalizá-la quando estiver pronto para usá-la.

## Saiba Mais

Você pode aprender mais na [documentação do Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

Para aprender React, confira a [documentação do React](https://reactjs.org/).

### Divisão de Código

Esta seção foi movida para aqui: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analisando o Tamanho do Pacote

Esta seção foi movida para aqui: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Criando um Aplicativo Web Progressivo

Esta seção foi movida para aqui: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Configuração Avançada

Esta seção foi movida para aqui: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Implantação

Esta seção foi movida para aqui: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` falha ao minificar

Esta seção foi movida para aqui: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
