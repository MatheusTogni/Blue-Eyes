export function usoQuantidadeClasseCor(quantidade) {
    if (quantidade > 0) return 'text-positive'
    else if (quantidade < 0) return 'text-negative'
    else return 'text-grey-6'
}
