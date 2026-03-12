Tecnologias Web, PEI2 : Javascript
Grupo 4

Conforme pedido no enunciado foi adicionado um formulário funcional, 2 animações feitas com bibliotecas externas e 3 eventos distintos, em Javascript

Formulário:
Já existia um formulário (não funcional) na versão do trabalho entregue em PE1. Este formulário foi adaptado de forma a que se consiga inserir um Nome, Email, Assunt e Mensagem, sendo o email validado para verificar se acaba numa extensão válida (name@gmail.com por exemplo)
e verificando se todos os campos foram preenchidos. O utilizador será informado caso os dados inseridos são válidos ou não quando tenta submeter

Animações:
Foram usadas as bibliotecas de d3js e GSAP

d3js foi utilizada de forma a inserir um gráfico de barras animado. Quando o utilizador chega à secção relevante na página pela primeira vez, na secção com o nome de "Conheça os nossos parceiros e o nosso impacto", é mostrado um gráfico de barras a crescer

GSAP foi utilizado para animar a secção de "Áreas de Investigação" de forma a criar um efeito de toggle. Quando o utilizador toca no texto descritivo, existe uma animação feita através da função de timeline de GSAP que simula como se o texto estivesse a fazer scroll
para fora da caixa onde está, sendo trocado por algumas métricas relevantes para a área. Quando o utilizador toca nesta métricas, o texto descritivo faz "scroll" de volta, e as estatísticas desaparecem


Eventos:

O primeiro evento encontra-se na secção de Apresentação no topo da página. Existe uma galeria que roda pelas suas imagens automaticamente, permitindo também ao utilizador manualmente selecionar a próxima imagem à esquerda ou à direita, voltando à imagem inicial caso chegue 
à última da galeria

O segundo evento é um botão de voltar para cima. Quando o utilizador faz scroll suficiente para baixo na página, aparece uma seta que permite ao utilizador tocar nela para voltar à secção superior da página

O terceiro evento é um popup. Quando o utilizador passa 3 segundos na secção de Oportunidades, aparece um popup que permite ao utilizador passar imediamente para o formulário.. Este popup desaparece automaticamente se o utilizador sair da secção e pode voltar a aparecer até
o utilizador tocar nele. Caso o utilizador tocar nele, este popup nunca mais aparece até uma nova instância da página ser aberta.

