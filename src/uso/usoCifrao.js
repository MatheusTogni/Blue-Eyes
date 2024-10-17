export function usoCifrao(quantidade) {

    let posNegSimbolo = ''
    if (quantidade > 0) posNegSimbolo = '+'
    else if (quantidade < 0) posNegSimbolo = '-'
  
    const cifraoSimbolo = 'R$',
      quantidadePositiva = Math.abs(quantidade),
      quantidadeFormatada = quantidadePositiva.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
  
    return ` ${cifraoSimbolo} ${posNegSimbolo}  ${quantidadeFormatada}`
  }