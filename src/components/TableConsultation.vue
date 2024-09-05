
<template>
  <div class="container">
    <Spinner :isActive="isActive"></Spinner>
    <div class="table">
      <DataTable
        scrollable
        selectionMode="single"
        scrollHeight="50rem"
        size="small"
        :value="consultations"
        showGridlines
        stripedRows
        style="margin-top: 20px;"
        class="custom-data-table"
        :globalFilterFields="['date', 'patient', 'reason_for_consultation']"
        :paginator="true"
        :rows="10"
        :emptyMessage="emptyMessage"
      >
        <!-- Header Personalizado con Campo de Búsqueda y Botón Nuevo -->
        <template #header>
          <div class="header-content">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="globalFilterValue" placeholder="Buscar" style="width: 220px;" />
            </span>
            <Button
              class="btn-success btn-success-custom"
              outlined
              label="Nuevo"
              @click="mostrarModal"
            />
          </div>
        </template>

        <!-- Definición de Columnas -->
        <Column field="date" header="Fecha" sortable></Column>
        <Column field="patient" header="Nombre/Apellido" sortable></Column>
        <Column field="reason_for_consultation" header="Razón de la consulta" sortable></Column>
        
        <!-- Columna de Acciones -->
        <Column header="Acciones">
          <template #body="slotProps">
            <div class="action-buttons">
              <Button
                icon="pi pi-eye"
                class="p-button-text"
                @click="abrirModalVer(slotProps.data)"
                tooltip="Ver"
                tooltipOptions="{ position: 'top' }"
              />
              <Button
                icon="pi pi-pencil"
                class="p-button-text"
                @click="abrirModalModificar(slotProps.data)"
                tooltip="Editar"
                tooltipOptions="{ position: 'top' }"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-text"
                @click="abrirModalEliminar(slotProps.data)"
                tooltip="Eliminar"
                tooltipOptions="{ position: 'top' }"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as api from '../helpers/api.js';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import axios from 'axios';
import Spinner from "../components/Spinner.vue";

const consultations = ref([]);
const emptyMessage = "No se encontraron consultas";

async function loadConsultations() {
  try {
    const response = await api.getConsultation();
    consultations.value = response.data;
    isActive.value = false;
    console.log(response.data);
  } catch (error) {
    console.error('Error cargando las consultas:', error);
  }
}

onMounted(async () => {
  await loadConsultations();
});
</script>

<style scoped>

.btn-success-custom{
  background-color: #28a745;
  border-color: #28a745;
  color: white;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
}



.dialog-button {
  margin-top: 10px;
  text-align: right;
}

.agregar_consulta {
  width: 500px;
}

.container {
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
}

.dialog-button .p-button {
  margin-left: 10px;
}

.table {
  margin-top: 30px;
}
</style>
