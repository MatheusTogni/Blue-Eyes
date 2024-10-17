<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered separator>
        <q-item v-for="entrada in entradas" :key="entrada.id">
          <q-item-section>
            {{ entrada.nome }}
          </q-item-section>

          <q-item-section side>
            {{ cifrao(entrada.quantidade) }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup>

import { ref } from 'vue'

const entradas = ref([
  {
    id: 'id1',
    nome: 'Salário',
    quantidade: 3000,
  },
  {
    id: 'id2',
    nome: 'Aluguel',
    quantidade: -499,
  },
  {
    id: 'id3',
    nome: 'Celular',
    quantidade: -250,
  },
  {
    id: 'id4',
    nome: 'Nesconhecido',
    quantidade: 0,
  },
])

function cifrao(quantidade) {

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
</script>
