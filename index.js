const { readFileSync } = require('fs');
const ServicoCalculoFatura = require('./ServicoCalculoFatura')

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR",
    { style: "currency", currency: "BRL",
      minimumFractionDigits: 2 }).format(valor/100);
}

function gerarFaturaStr (fatura, pecas, calc) {
    let faturaStr = `Fatura ${fatura.cliente}\n`;
    for (let apre of fatura.apresentacoes) {
        faturaStr += `  ${calc.getPeca(apre, pecas).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(apre, pecas))} (${apre.audiencia} assentos)\n`;
    }

    faturaStr += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura.apresentacoes, pecas))}\n`;
    faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(fatura.apresentacoes, pecas)} \n`;
    return faturaStr;
  }

function gerarFaturaHTML (fatura, pecas) {
    let faturaStr = `<html>\n<p> Fatura ${fatura.cliente}</p>\n<ul>\n`;
    for (let apre of fatura.apresentacoes) {
        faturaStr += `<li> ${getPeca(apre).nome}: ${formatarMoeda(calcularTotalApresentacao(apre, pecas))} (${apre.audiencia} assentos)</li>\n`;
    }

    faturaStr += `</ul>\n`

    faturaStr += `<p> Valor total: ${formatarMoeda(calcularTotalFatura(fatura.apresentacoes, pecas))}</p>\n`;
    faturaStr += `<p> Créditos acumulados: ${calcularTotalCreditos(fatura.apresentacoes, pecas)}</p>\n`;
    faturaStr += `</html>`
    return faturaStr;
  }


const faturas = JSON.parse(readFileSync('./faturas.json'));
const pecas = JSON.parse(readFileSync('./pecas.json'));
const calc = new ServicoCalculoFatura();
const faturaStr = gerarFaturaStr(faturas, pecas, calc);
//const faturaHTML = gerarFaturaHTML(faturas, pecas);

console.log(faturaStr);
//console.log(faturaHTML);