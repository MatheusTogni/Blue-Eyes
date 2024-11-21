<template>
    <q-page padding>
      <div class="row justify-around q-gutter-md q-pa-md">
        <!-- Renderiza os cards dos dias da semana -->
        <q-card
          v-for="day in days"
          :key="day.name"
          class="day-card"
          flat
          bordered
          @click="openDay(day.name)"
        >
          <q-card-section>
            <div class="row items-center justify-between">
              <span class="text-h5 dia-nome">{{ day.name }}</span>

              <q-icon
                v-if="storeSemana.eventosSemana[day.name]?.length"
                name="circle"
                color="red"
                size="16px"
              />
            </div>
          </q-card-section>
          <!-- Lista de eventos -->
          <q-card-section v-if="storeSemana.eventosSemana[day.name]?.length">
            <q-list dense>
              <q-item
                v-for="(event, index) in storeSemana.eventosSemana[day.name]"
                :key="index"
                class="event-item"
                bordered
              >
                <q-item-section>{{ event }}</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-section v-else>
            <div class="text-body2 text-grey">Nenhum evento neste dia.</div>
          </q-card-section>
        </q-card>
      </div>
  
      <!-- Dialogo para adicionar e listar eventos -->
      <q-dialog v-model="dialog">
        <q-card style="min-width: 450px">
          <q-card-section>
            <div class="text-h6 text-primary">Eventos de {{ selectedDay }}</div>
          </q-card-section>
  
          <!-- Campo para adicionar novos eventos -->
          <q-card-section>
            <q-input
              v-model="newEvent"
              label="Adicionar novo evento"
              dense
              outlined
              autofocus
            />
            <q-btn
              flat
              label="Adicionar"
              color="primary"
              class="q-mt-sm"
              @click="addEvent"
            />
          </q-card-section>
  
          <!-- Lista de eventos já cadastrados -->
          <q-card-section v-if="storeSemana.eventosSemana[selectedDay]?.length">
            <q-list dense bordered>
              <q-item
                v-for="(event, index) in storeSemana.eventosSemana[selectedDay]"
                :key="index"
                class="event-item"
                bordered
              >
                <!-- Campo para edição -->
                <q-item-section>
                  <q-input
                    v-model="eventosEdicao[index]"
                    dense
                    outlined
                    class="q-mr-md"
                  />
                </q-item-section>
  
                <!-- Botões de ação -->
                <q-item-section side class="action-buttons">
                  <q-btn
                    flat
                    icon="save"
                    color="green"
                    dense
                    @click="updateEvent(index, event)"
                  />
                  <q-btn
                    flat
                    icon="delete"
                    color="negative"
                    dense
                    @click="deleteEvent(event)"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
  
          <q-card-section v-else>
            <div class="text-body2 text-grey">Nenhum evento neste dia.</div>
          </q-card-section>
  
          <q-card-actions align="right">
            <q-btn flat label="Fechar" color="primary" @click="dialog = false" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useStoreSemana } from "src/stores/storeSemana";
  
  const days = [
    { name: "Domingo" },
    { name: "Segunda" },
    { name: "Terça" },
    { name: "Quarta" },
    { name: "Quinta" },
    { name: "Sexta" },
    { name: "Sábado" },
  ];
  
  const dialog = ref(false);
  const selectedDay = ref("");
  const newEvent = ref("");
  const eventosEdicao = ref([]);
  const eventosEditando = ref([]);
  
  const storeSemana = useStoreSemana();
  
  // Abre o diálogo ao clicar no dia
  const openDay = (dayName) => {
    selectedDay.value = dayName;
    eventosEdicao.value = [...(storeSemana.eventosSemana[dayName] || [])];
    eventosEditando.value = eventosEdicao.value.map(() => false);
    dialog.value = true;
  };
  
  // Adiciona um novo evento
  const addEvent = async () => {
    if (!newEvent.value.trim()) return; // Evita adicionar eventos vazios
    await storeSemana.addEvento(selectedDay.value, newEvent.value.trim());
    eventosEdicao.value.push(newEvent.value.trim()); // Atualiza localmente
    newEvent.value = ""; // Limpa o campo do evento
  };
  
  // Atualiza um evento
  const updateEvent = async (index, oldEvent) => {
    const newEvent = eventosEdicao.value[index]?.trim();
    if (newEvent && newEvent !== oldEvent) {
      try {
        const success = await storeSemana.updateEvento(
          selectedDay.value,
          oldEvent,
          newEvent
        );
        if (success) {
          eventosEdicao.value[index] = newEvent; // Atualiza localmente
        }
      } catch (error) {
        console.error("Erro ao atualizar evento:", error);
      }
    }
  };
  
  // Exclui um evento
  const deleteEvent = async (event) => {
    await storeSemana.deleteEvento(selectedDay.value, event);
    eventosEdicao.value = eventosEdicao.value.filter((e) => e !== event);
  };
  </script>

  <style scoped>
  .day-card {
    width: 13%;
    min-width: 160px;
    height: 250px; /* Define altura maior */
    text-align: center;
    cursor: pointer;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 16px;
    background-color: #306c88;
    transition: all 0.2s;
  }

  .dia-nome {
    color: floralwhite;
  }
  
  .day-card:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
  }
  
  .q-list .event-item {
    border-radius: 6px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: #ffffff;
  }
  
  .action-buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
  }
  </style>
  
  

