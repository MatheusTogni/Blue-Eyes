<template>
    <q-page padding>
        <div class="row q-gutter-md q-py-md q-col-gutter-md justify-center">
            <!-- Card 1: Soma Total dos Gastos -->
            <q-card class="dashboard-card" flat bordered>
                <q-card-section>
                    <div class="text-h6 text-primary">Total de Gastos</div>
                </q-card-section>
                <q-card-section>
                    <q-icon name="trending_down" color="negative" size="48px" />
                    <div class="text-h4 text-negative">
                        R$ {{ storeDashboard.totalGastos.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) }}
                    </div>
                </q-card-section>
                <q-card-section>
                    <q-btn flat dense icon="edit"  @click="editMeta = true" label="Definir Meta" />
                    <div v-if="storeDashboard.metaGastos > 0" class="text-caption">
                        Meta: R$ {{ storeDashboard.metaGastos.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) }}
                        ({{ storeDashboard.progressoGastos.toFixed(1) }}%)
                    </div>
                </q-card-section>
            </q-card>

            <!-- Card 2: Tarefas Prioritárias -->
            <q-card class="dashboard-card tarefas-card" flat bordered>
        <!-- Título do Card -->
        <q-card-section class="">
            <div class="text-h6 text-primary">Tarefas Prioritárias</div>
        </q-card-section>

        <!-- Lista de Tarefas -->
        <q-card-section class="">
            <q-list dense>
                <q-item
                    v-for="(todo, index) in storeDashboard.tarefasPrioritarias"
                    :key="index"
                    class="tarefas-item"
                >
                    <q-item-section>{{ todo.descricao }}</q-item-section>
                </q-item>
            </q-list>
            <div v-if="storeDashboard.tarefasPrioritarias.length === 0" class="text-body2 text-grey">
                Nenhuma tarefa encontrada.
            </div>
        </q-card-section>
    </q-card>

            <!-- Card 3: Progresso das Tarefas -->
            <q-card class="dashboard-card" flat bordered>
                <q-card-section>
                    <div class="text-h6 text-primary">Progresso das Tarefas</div>
                </q-card-section>
                <q-card-section>
                    <q-linear-progress :value="storeDashboard.progressoTarefas / 100" class="progress-bar"
                        track-color="grey-3" />
                    <div class="text-caption">
                        {{ storeDashboard.tarefasConcluidas }} de {{ storeDashboard.totalTarefas }} concluídas
                    </div>
                </q-card-section>
            </q-card>

            <!-- Card 4: Eventos do Dia -->
            <q-card class="dashboard-card" flat >
                <q-card-section>
                    <div class="text-h6 text-primary">Eventos de Hoje ({{ storeDashboard.diaAtual }})</div>
                </q-card-section>
                <q-card-section>
                    <q-list dense >
                        <q-item  v-for="(event, index) in storeDashboard.eventosDoDia" :key="index" class=" tarefas-item">
                            <q-item-section>{{ event }}</q-item-section>
                        </q-item>
                    </q-list>
                    <div v-if="storeDashboard.eventosDoDia.length === 0" class="text-body2 text-grey">
                        Nenhum evento marcado para hoje.
                    </div>
                </q-card-section>
            </q-card>
        </div>

        <!-- Dialog para edição da meta -->
        <q-dialog v-model="editMeta">
            <q-card style="max-width: 400px">
                <q-card-section>
                    <div class="text-h6">Definir Meta de Gastos</div>
                </q-card-section>
                <q-card-section>
                    <q-input v-model.number="storeDashboard.metaGastos" type="number" label="Meta (R$)" dense
                        outlined />
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="Cancelar" color="negative" @click="editMeta = false" />
                    <q-btn flat label="Salvar" color="primary" @click="saveMeta" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useStoreDashboard } from "src/stores/storeDashboard";
import { Notify } from "quasar";

const storeDashboard = useStoreDashboard();

const editMeta = ref(false);

const saveMeta = async () => {
    try {
        const novaMeta = storeDashboard.metaGastos;
        await storeDashboard.saveMetaGastos(novaMeta);
        Notify.create({
            message: "Meta de gastos salva com sucesso!",
            type: "positive",
            position: "top-right",
        });
        editMeta.value = false;
    } catch (error) {
        Notify.create({
            message: "Erro ao salvar a meta de gastos.",
            type: "negative",
            position: "top-right",
        });
    }
};

storeDashboard.loadMetaGastos();
</script>

<style scoped>
.dashboard-card {
    width: 45%;
    min-height: 250px;
    display: flex;
    flex-direction: column;
    text-align: center;
    border-radius: 12px;
    transition: all 0.3s;
    border: 2px solid #027be3; /* Borda azul */
    background-color: #f9f9f9;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.1), -10px -10px 20px rgba(255, 255, 255, 0.8);
}

.dashboard-card:hover {
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
    transform: scale(1.03);
}

.tarefas-card-header {
    padding: 8px 16px;
    border-bottom: 1px solid #d1d1d1;
    background-color: #ffffff;
    border-radius: 12px 12px 0 0;
}

.tarefas-card-body {
    flex-grow: 1;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #f9f9f9;
    border-radius: 0 0 12px 12px;
}

.tarefas-item {
    font-size: 1rem;
    margin-bottom: 8px;
    border: 2px solid #d1d1d1;
    border-radius: 8px;
    padding: 8px;
    border-color: #040504;
    background-color: #ffffff;
}

.tarefas-item:last-child {
    margin-bottom: 0; 
}

.progress-bar{
    margin-left: 40px;
    width: 40rem;
    font-size: 2rem;
    color: #0bc05d;
    border: 2px solid #111518;
    border-radius: 20px;
}


.text-primary {
    margin-left: 9rem;
    width: 25rem;
    font-size: 2rem;
    color: #027be3;
    padding: 5px;
    border: 3px solid #027be3;
    border-radius: 20px;
}
</style>
