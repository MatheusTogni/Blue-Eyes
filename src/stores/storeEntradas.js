import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { uid, Notify } from "quasar";

export const useStoreEntradas = defineStore("entradas", () => {
  const entradas = ref([
    { id: "id1", nome: "Salário", quantidade: 3000 },
    { id: "id2", nome: "Aluguel", quantidade: -499 },
    { id: "id3", nome: "Celular", quantidade: -250 },
    { id: "id4", nome: "Desconhecido", quantidade: 0 },
  ]);

  const total = computed(() => {
    return entradas.value.reduce((accumulator, { quantidade }) => {
      return accumulator + quantidade;
    }, 0);
  });

  const addEntrada = (adicionarEntradaForm) => {
    const novaEntrada = Object.assign({}, adicionarEntradaForm, { id: uid() });
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

  return { entradas, total, addEntrada, deletarEntrada };
});
