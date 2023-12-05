<template>
  <div class="container">
    
    <Button @click="abrirModalAgregar(pacienteId)" label="Agregar Consulta" class="p-button-rounded p-button-success" />
    <div class="table">
      <DataTable :value="consultas" :paginator="true" :rows="5" :emptyMessage="emptyMessage" class="table">
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
    <!-- Modal Agregar Consulta -->
    <div class="agregar_consulta">
      <Dialog v-model="mostrarModalAgregar" header="Agregar Consulta" :visible="mostrarModalAgregar">
        <!-- Selección de paciente -->
        <div class="p-field">
          <label for="dniConsulta">DNI:</label>
          <InputText id="dniConsulta" v-model="nuevaConsulta.dni" placeholder="DNI" required />
        </div>
        
      </Dialog>
    </div>
    
   
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import axios from 'axios';

const consultas = ref([]);
const mostrarModalAgregar = ref(false);
const nuevaConsulta = ref({
  
  
  
});

//async function addConstultaion() {
  //try {
    //consultas.value.push(NewConsulta.value);
    //console.log(consultas);

    //const res = await api.createConsultation(NewConsulta.value);
    //console.log(res, "res");

    //cerrarModalConsulta();
    
    // Reiniciar el objeto NewConsulta solo después de que la consulta se haya creado correctamente
    //NewConsulta.value = {
      //patient_id: '',
      //date: '',
      //patient: '',
      //no_of_doc: '',
      //gynecologist: '',
      //reason_for_consultation: '',
      //medical_history: '',
      //physical_examination: '',
      //diagnosis: '',
      //treatment: '',
      //notes: '',
    //};

  //} catch (error) {
    //console.error(error, "error en la petición");

    // Considera mostrar un mensaje de error al usuario o realizar alguna acción específica
    //cerrarModalAgregar();
  //}
//}


const props = defineProps({
  pacienteId: Number
});
const pacienteId = ref(null); 

onMounted(async () => {
  await loadConsultas();
});

async function loadConsultas() {
  
}

function abrirModalAgregar(id) {
  pacienteId.value = id; 
  mostrarModalAgregar.value = true;
}

function cerrarModalAgregar() {
  mostrarModalAgregar.value = false;
}


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
