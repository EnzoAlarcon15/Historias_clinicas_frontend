<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import * as api from '../../helpers/api';



const props = defineProps(['pacienteSeleccionado', 'visible', 'paciente']);
const emit = defineEmits();
console.log(props.paciente,"datos del paciente consulta")
const dialog_msg_visble = ref(false);

const campos = [
  { label: 'Fecha:', field: 'date', type: 'date' },
  { label: 'Paciente:', field: 'patient', type: 'text' },
  { label: 'Ginecólogo:', field: 'gynecologist', type: 'text' },
  { label: 'Motivo de Consulta:', field: 'reason_for_consultation', type: 'text' },
  { label: 'Historial Médico:', field: 'medical_history', type: 'text' },
  { label: 'Examen Físico:', field: 'physical_examination', type: 'text' },
  { label: 'Diagnóstico:', field: 'diagnosis', type: 'text' },
  { label: 'Tratamiento:', field: 'treatment', type: 'text' },
  { label: 'Notas:', field: 'notes', type: 'text' },
];
 

 const NewConsultation = ref({
  patient_id:props.paciente.id,
  date: '',
  gynecologist: '',
  reason_for_consultation: '',
  medical_history: '',
  physical_examination: '',
  diagnosis: '',
  treatment: '',
  notes: '',
});


async function agregarConsulta(patient_id) {
  try {
    if (!patient_id) {
      console.error('Error: El ID del paciente no está definido.');
      return; 
    }
    const res = await api.createConsultation({
      patient_id:patient_id,
      date: NewConsultation.value.date || '',
      patient: NewConsultation.value.patient || '',
      gynecologist: NewConsultation.value.gynecologist || '',
      reason_for_consultation: NewConsultation.value.reason_for_consultation || '',
      medical_history: NewConsultation.value.medical_history || '',
      physical_examination: NewConsultation.value.physical_examination || '',
    });
    console.log("campos de respuestas",res );
    cerrarModal();
    resetNewConsultation();
    set_dialog("Paciente creado: " + res.msg);
  } catch (error) {
    console.error('Error al agregar la consulta:', error);
    
  }
}


function cerrarModal() {
  emit('update:visible', false);
}

function resetNewConsultation() {
  NewConsultation.value = {
    patient_id: '',
    date: '',
    patient: '',
    gynecologist: '',
    reason_for_consultation: '',
    medical_history: '',
    physical_examination: '',
    diagnosis: '',
    treatment: '',
    notes: '',
  };
}
</script>

<template>
  
  <div class="container-dialog">
    
    <Dialog :visible="visible" @update:visible="cerrarModal" header="Nueva Consulta">
      <div class="row">
        <div class="column">
          <!-- Columna 1 -->
          <div v-for="field in campos.slice(0, Math.ceil(campos.length / 3))" :key="field.field" class="input-container">
            <div>
              <label>{{ field.label }}</label>
              <InputText :type="field.type" :modelValue="NewConsultation[field.field]" @update:modelValue="val => NewConsultation[field.field] = val" class="p-inputtext" />
            </div>
          </div>
        </div>

        <div class="column">
          <!-- Columna 2 -->
          <div v-for="field in campos.slice(Math.ceil(campos.length / 3), 2 * Math.ceil(campos.length / 3))" :key="field.field" class="input-container">
            <div>
              <label>{{ field.label }}</label>
              <InputText :type="field.type" :modelValue="NewConsultation[field.field]" @update:modelValue="val => NewConsultation[field.field] = val" class="p-inputtext" />
            </div>
          </div>
        </div>

        <div class="column">
          <!-- Columna 3 -->
          <div v-for="field in campos.slice(2 * Math.ceil(campos.length / 3))" :key="field.field" class="input-container">
            <div>
              <label>{{ field.label }}</label>
              <InputText :type="field.type" :modelValue="NewConsultation[field.field]" @update:modelValue="val => NewConsultation[field.field] = val" class="p-inputtext" />
            </div>
          </div>
        </div>
      </div>
     
      <div class="dialog-button">
        <Button label="Guardar" class="p-button-redondeado p-button-success" @click="()=>agregarConsulta(NewConsultation.value.patient_id)" />
       <Button label="Cancelar" class="p-button-redondeado" severity="secondary" @click="cerrarModal" />
      </div>
    </Dialog>
  </div>

  <!-- Diálogo de mensajes -->
  <Dialog
      :dismissableMask="true"
      v-model:visible="dialog_msg_visble"
      :draggable="true"
      modal
      :style="{ width: '50rem' }"
    >
      <div style="text-align: center">
        <p class="m-0">{{ dialog_msg_text }}</p>
      </div>
      <template #footer>
        <Button
          label="Ok"
          autofocus
          @click="dialog_msg_visble = false"
        />
      </template>
    </Dialog>
</template>

<style scoped>
  .p-dialog {
    width: 100%;
    max-width: none;
    background-color: #83B9FF;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .container-dialog {
    width: 100%;
    max-width: 800px; 
    margin: 0 auto; 
    padding: 0 20px; 
  }

  .row {
    display: flex;
    flex-wrap: wrap; 
    margin: 0 -10px; 
  }

  .column {
    flex: 1;
    padding: 0 10px;
    margin-bottom: 20px; 
  }

  .input-container {
    margin-bottom: 20px;
  }

  .p-inputtext {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .dialog-button {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    text-align: right;
    
  }

  .dialog-button .p-button {
  margin-left: 10px; 
}

  @media (max-width: 768px) {
    .column {
      flex: 1 100%; 
      padding: 0; 
    }
  }
</style>
