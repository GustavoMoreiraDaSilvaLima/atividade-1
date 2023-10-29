import express from 'express';

const app = express();

const host = '0.0.0.0';
const porta = 3000;

function paginaTabuada(requisicao, resposta) {
    try {
        const numero = Number(requisicao.query.tabuada);
        let conteudoResposta =`<!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Tabuada do Numero ${numero} </title>
        </head>
        <body>
            <div class="container">
            <h1 class="h1">Tabuada do Numero ${numero}</h1>
            <ul>`;
        for (let i = 0; i <= 10; i++) {
            const linha = `<li style="font-size: 20px;"><a style="color: blue;"> ${numero} </a> x <a style="color: green;">${i}</a> = <strong style="color: red;"> ${numero*i} </strong></li>`;
            conteudoResposta += linha;
        }
        conteudoResposta += `
            </ul>
        </div>
        </body>
        </html>`;
        resposta.end(conteudoResposta);
    } catch (erro) {
        console.log('erro');
        resposta.end(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Erro ao processar a Tabuada</title>
        </head>
        <body>
            <h1>Não foi possível processar a sua requisição</h1>
            <h2>Erro ao tentar gerar os resultados</h2>
            <h2>Na barra de endereço digite por exemplo http://localhost:3000/?tabuada=2</h2>
            <h3>${erro.message}</h3>
        </body>
        </html>`);
        return;
    }


}

app.get('/', paginaTabuada);

app.listen(porta, host, () => {
    console.log(`Servidor sendo hospedado em http://${host}:${porta}`);
})