import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { uid, Notify } from "quasar";

export const useStoreEntradas = defineStore("entradas", () => {
  const entradas = ref([
    { id: "id1", nome: "Salário", quantidade: 3000, pago: false },
    { id: "id2", nome: "Aluguel", quantidade: -499, pago: false },
    { id: "id3", nome: "Celular", quantidade: -250, pago: false },
    { id: "id4", nome: "Desconhecido", quantidade: 0, pago: false },
  ]);

  const opcoes = reactive({
    sort: false
  })

  const total = computed(() => {
    return entradas.value.reduce((accumulator, { quantidade }) => {
      return accumulator + quantidade;
    }, 0);
  });

  const totalPago = computed(() => {
    return entradas.value.reduce((accumulator, { quantidade, pago }) => {
      return pago ? accumulator + quantidade : accumulator
    }, 0);
  });

  const addEntrada = (adicionarEntradaForm) => {
    const novaEntrada = Object.assign({}, adicionarEntradaForm, { id: uid(), pago: false });
    entradas.value.push(novaEntrada);
  };

  const deletarEntrada = (entradaId) => {
    const index = entradas.value.findIndex(
      (entrada) => entrada.id === entradaId
    );
    if (index !== -1) {
      entradas.value.splice(index, 1);
      Notify.create({
        message: "Entrada Deletada",
        position: "top-right",
        type: "positive",
      });
    }
  };

  const updateEntrada = (entradaId, updates) => {
    const index = entradas.value.findIndex(
      (entrada) => entrada.id === 
    entradaId)
    Object.assign(entradas.value[index], updates);
  };

  const sortEnd = ({ velhoIndex, novoIndex}) => {
    const entradaMovida = entradas.value[velhoIndex]
    entradas.value.splice(velhoIndex, 1)
    entradas.value.splice(novoIndex, 0, entradaMovida)
  }

  return { entradas, opcoes, total, totalPago, addEntrada, deletarEntrada, updateEntrada, sortEnd };
});
