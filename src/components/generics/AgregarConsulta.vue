<script setup>
import { ref, computed, onMounted, defineProps, watch, watchEffect} from 'vue';
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import * as api from '../../helpers/api';
const { pacienteSeleccionado, visible } = defineProps(['pacienteSeleccionado','visible']);

const emit = defineEmits();

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

  
const pacientes = ref([]);
const mostrarModalConsulta = ref(false);

watchEffect(() => {
  mostrarModalConsulta.value = visible;
});

const NewConsultation = ref({
        patient_id: pacienteSeleccionado.id || '',
        date: '',
        patient: pacienteSeleccionado.name,
        gynecologist: '',
        reason_for_consultation: '',
        medical_history: '',
        physical_examination: '',
        diagnosis: '',
        treatment: '',
        notes: '',
})



async function agregarConsulta() {
  try { 
    if (pacienteSeleccionado && pacienteSeleccionado.id) {
      const res = await api.createConsultation({
       patient_id:NewConsultation.value.patient_id,
       date: NewConsultation.value.date,
       patient: NewConsultation.value.patient,
       gynecologist: NewConsultation.value.gynecologist,
       reason_for_consultation: NewConsultation.value.reason_for_consultation,
       medical_history: NewConsultation.value.medical_history,
       physical_examination: NewConsultation,
      });

      console.log(res, "res");
      abrirModal();
      NewConsultation.value = {
        patient_id:'',
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
    } else {
      console.error('Error:NewConsultation.value o su propiedad "id" no está definido.');
    }
  } catch (error) {
    console.log(error, "error en la petición");
    cerrarModal();
  }
}
const cerrarModal = () => {
  emit('update:visible', false);
};


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
              <template v-if="field.field === 'blood_type'">
                <Dropdown :options="tipoSangre" :value="pacienteSeleccionado[field.field]" @onChange="handleDropdownChange(field.field)" optionLabel="label" optionValue="value" class="p-inputtext" />
              </template>
              <template v-else>
                <InputText :type="field.type" :modelValue="pacienteSeleccionado?.[field?.field]" @update:modelValue="val => pacienteSeleccionado[field.field] = val" class="p-inputtext" />
              </template>
            </div>
          </div>
        </div>

        <div class="column">
          <!-- Columna 2 -->
          <div v-for="field in campos.slice(Math.ceil(campos.length / 3), 2 * Math.ceil(campos.length / 3))" :key="field.field" class="input-container">
            <div>
              <label>{{ field.label }}</label>
              <InputText :type="field.type" :modelValue="pacienteSeleccionado[field.field]" @update:modelValue="val => pacienteSeleccionado[field.field] = val" class="p-inputtext" />
            </div>
          </div>
        </div>

        <div class="column">
          <!-- Columna 3 -->
          <div v-for="field in campos.slice(2 * Math.ceil(campos.length / 3))" :key="field.field" class="input-container">
            <div>
              <label>{{ field.label }}</label>
              <InputText :type="field.type" :modelValue="pacienteSeleccionado[field.field]" @update:modelValue="val => pacienteSeleccionado[field.field] = val" class="p-inputtext" />
            </div>
          </div>
        </div>
      </div>

      <div class="dialog-button">
        <Button label="Guardar" class="p-button-redondeado p-button-success" @click="agregarConsulta" />
        <Button label="Cancelar" class="p-button-rounded p-button-danger" @click="cerrarModal" />
      </div>
    </Dialog>
  </div>
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
    display: flex;
    flex-direction: column;
    width: 80%;
  }

  .row {
    display: flex;
  }

  .column {
    flex: 1;
    padding: 0 10px;
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
  }
</style>