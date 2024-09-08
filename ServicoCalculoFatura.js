class ServicoCalculoFatura {
    constructor(){}

    getPeca(apresentacao, pecas) {
        return pecas[apresentacao.id];
    }
    
    calcularTotalApresentacao(apre, pecas) {
        let total = 0;
      
        switch (this.getPeca(apre, pecas).tipo) {
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
              throw new Error(`Peça desconhecia: ${getPeca(apre, pecas).tipo}`);
        }
      
        return total
      }
      
    calcularTotalFatura(apresentacoes, pecas){
        let fatura = 0
        for (let apre of apresentacoes) {
            fatura+=this.calcularTotalApresentacao(apre, pecas)
        }
      
        return fatura
      }
      
    calcularTotalCreditos(apresentacoes, pecas){
        let creditos = 0
        for (let apre of apresentacoes) {
            creditos+=this.calcularCredito(apre, pecas)
        }
      
        return creditos
      }

    calcularCredito(apre, pecas) {
        let creditos = 0;
        creditos += Math.max(apre.audiencia - 30, 0);
        if (this.getPeca(apre, pecas).tipo === "comedia") 
          creditos += Math.floor(apre.audiencia / 5);
        return creditos;   
      }
}

module.exports = ServicoCalculoFatura