<template>
  <div class="container">
    
    
    <div class="table">
      <DataTable :value="consultations" :paginator="true" :rows="5" :emptyMessage="emptyMessage" class="table">
      <Column field="date" header="Fecha"></Column>
      <Column field="Nombre" header="Nombre"></Column>
      <Column field="Apellido" header="Apellido"></Column>
      <Column field="dni" header="DNI"></Column>
      <Column header="Acciones">
        <template #body="rowData">
          <Button icon="pi pi-eye" class="p-button-text" @click="abrirModalVer(rowData)" />
          <Button icon="pi pi-pencil" class="p-button-text" @click="abrirModalModificar(rowData)" />
          <Button icon="pi pi-trash" class="p-button-text" @click="abrirModalEliminar(rowData)" />
        </template>
      </Column>
    </DataTable>

    </div>
    
   
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as api from '../helpers/api.js'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import axios from 'axios';
const  consultations = ref([]);
  

async function loadStories() {
  try {
    const consultation = await api.getConsultation();
    consultations.value = consultation; 
    console.log(consultation);
  } catch (error) {
    console.error('Error cargando las consultas:', error);
  }
}

onMounted(async () => {
  await loadStories();
});





</script>

<style scoped>
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

.table{
  margin-top: 30px;
}
</style>
