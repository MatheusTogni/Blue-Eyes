<template>
    <q-page>
        <div class="q-pa-md">
            <NadaAqui v-if="!storeTodos.todos.length" />
            <div v-else>
                <div v-if="pendentes.length" class="q-mb-lg">
                    <q-item-label class="header-label">Afazeres Pendentes</q-item-label>
                    <transition-group name="fade" tag="div">
                        <div v-for="todo in pendentes" :key="todo.id"
                            class="q-my-sm  shadow-2">
                            <q-slide-item @right="({ reset }) => storeTodos.confirmDeleteTodo(todo.id, reset)"
                                right-color="negative" class="rounded-borders">
                                <template v-slot:right>
                                    <q-icon name="delete" />
                                </template>

                                <q-item>
                                    <q-item-section side>
                                        <q-checkbox v-model="todo.concluido" @update:model-value="toggleConcluido(todo)"
                                            color="green" keep-color />
                                    </q-item-section>

                                    <!-- Adicionando a funcionalidade de edição ao clicar no nome -->
                                    <q-item-section>
                                        <q-popup-edit @save="(value) => updateDescricao(todo, value)"
                                            :model-value="todo.descricao" v-slot="scope" :offset="[16, 12]"
                                            anchor="top left" auto-save buttons label-set="Ok"
                                            label-cancel="Cancelar">
                                            <q-input v-model="scope.value" placeholder="Editar tarefa" dense
                                                autofocus />
                                        </q-popup-edit>

                                        <span class="text-weight-bold text-primary">
                                            {{ todo.descricao }}
                                        </span>
                                    </q-item-section>
                                </q-item>
                            </q-slide-item>
                        </div>
                    </transition-group>
                </div>
                <div v-if="concluidos.length" class="q-mt-lg">
                    <q-item-label class="header-label">Afazeres Concluídos</q-item-label>
                    <transition-group name="fade" tag="div">
                        <div v-for="todo in concluidos" :key="todo.id"
                            class="q-my-sm shadow-1">
                            <q-slide-item @right="({ reset }) => storeTodos.confirmDeleteTodo(todo.id, reset)"
                                right-color="negative" class="rounded-borders">
                                <template v-slot:right>
                                    <q-icon name="delete" />
                                </template>

                                <q-item>
                                    <q-item-section side>
                                        <q-checkbox v-model="todo.concluido" @update:model-value="toggleConcluido(todo)"
                                            color="green" keep-color />
                                    </q-item-section>

                                    <q-item-section>
                                        <q-popup-edit @save="(value) => updateDescricao(todo, value)"
                                            :model-value="todo.descricao" v-slot="scope" :offset="[16, 12]"
                                            anchor="top left" auto-save buttons label-set="Salvar"
                                            label-cancel="Cancelar">
                                            <q-input v-model="scope.value" placeholder="Editar tarefa" dense
                                                autofocus />
                                        </q-popup-edit>

                                        <span class="text-weight-bold text-primary">
                                            {{ todo.descricao }}
                                        </span>
                                    </q-item-section>
                                </q-item>
                            </q-slide-item>
                        </div>
                    </transition-group>
                </div>
            </div>
        </div>
        <q-footer class="bg-transparent">
            <AddTodo />
        </q-footer>
    </q-page>
</template>

<script setup>
import NadaAqui from "src/components/NadaAqui.vue";
import { computed } from "vue";
import { useStoreTodos } from "src/stores/storeTodos";
import AddTodo from "src/components/AddTodo.vue";

const storeTodos = useStoreTodos();

const pendentes = computed(() =>
    storeTodos.todos.filter((todo) => !todo.concluido)
);

const concluidos = computed(() =>
    storeTodos.todos.filter((todo) => todo.concluido)
);

const toggleConcluido = (todo) => {
    storeTodos.updateTodo(todo.id, { concluido: todo.concluido });
};

const updateDescricao = (todo, value) => {
    storeTodos.updateTodo(todo.id, { descricao: value });
};
</script>