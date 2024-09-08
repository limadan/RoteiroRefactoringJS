const { readFileSync } = require('fs');

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR",
    { style: "currency", currency: "BRL",
      minimumFractionDigits: 2 }).format(valor/100);
}

function calcularCredito(apre) {
  let creditos = 0;
  creditos += Math.max(apre.audiencia - 30, 0);
  if (getPeca(apre).tipo === "comedia") 
    creditos += Math.floor(apre.audiencia / 5);
  return creditos;   
}

function getPeca(apresentacao) {
  return pecas[apresentacao.id];
}

function calcularTotalApresentacao(apre) {
  let total = 0;

  switch (getPeca(apre).tipo) {
    case "tragedia":
      total = 40000;
      if (apre.audiencia > 30) {
        total += 1000 * (apre.audiencia - 30);
      }
      break;
    case "comedia":
      total = 30000;
      if (apre.audiencia > 20) {
        total += 10000 + 500 * (apre.audiencia - 20);
      }
      total += 300 * apre.audiencia;
      break;
    default:
        throw new Error(`Peça desconhecia: ${getPeca(apre).tipo}`);
  }

  return total
}

function calcularTotalFatura(faturaJSON){
  let fatura = 0
  for (let apre of faturaJSON.apresentacoes) {
      fatura+=calcularTotalApresentacao(apre)
  }

  return fatura
}

function calcularTotalCreditos(){
  let creditos = 0
  for (let apre of faturas.apresentacoes) {
      creditos+=calcularCredito(apre)
  }

  return creditos
}


function gerarFaturaStr (fatura, pecas) {
    let faturaStr = `Fatura ${fatura.cliente}\n`;
    for (let apre of fatura.apresentacoes) {
        faturaStr += `  ${getPeca(apre).nome}: ${formatarMoeda(calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)\n`;
    }

    faturaStr += `Valor total: ${formatarMoeda(calcularTotalFatura(fatura))}\n`;
    faturaStr += `Créditos acumulados: ${calcularTotalCreditos()} \n`;
    return faturaStr;
  }

function gerarFaturaHTML (fatura, pecas) {
    let faturaStr = `<html>\n<p> Fatura ${fatura.cliente}</p>\n<ul>\n`;
    for (let apre of fatura.apresentacoes) {
        faturaStr += `<li> ${getPeca(apre).nome}: ${formatarMoeda(calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)</li>\n`;
    }

    faturaStr += `</ul>\n`

    faturaStr += `<p> Valor total: ${formatarMoeda(calcularTotalFatura(fatura))}</p>\n`;
    faturaStr += `<p> Créditos acumulados: ${calcularTotalCreditos()}</p>\n`;
    faturaStr += `</html>`
    return faturaStr;
  }


const faturas = JSON.parse(readFileSync('./faturas.json'));
const pecas = JSON.parse(readFileSync('./pecas.json'));
const faturaStr = gerarFaturaStr(faturas, pecas);
const faturaHTML = gerarFaturaHTML(faturas, pecas);

console.log(faturaStr);
console.log(faturaHTML);