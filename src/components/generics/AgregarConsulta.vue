<script setup>
import { ref, computed, onMounted, defineProps, watch, watchEffect} from 'vue';
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import * as api from '../../helpers/api';
const { visible, pacienteSeleccionado } = defineProps(['visible', 'pacienteSeleccionado']);
const emits = defineEmits(['update:visible']);


//falta enviar el id de paciente para el registro
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


function cerrarModal() {
  emits('update:visible', false);
}

function abrirModal() {
  emits('update:visible', true);
}

function abrirModalAgregar() {
  console.log('Valor de pacienteSeleccionado en abrirModalAgregar:', pacienteSeleccionado.value);
  if (agregar.value) {
    const abrirModalFunc = agregarConsultaComponent.value.abrirModalAgregar;
    console.log(abrirModalAgregar.value);

    if (abrirModalFunc && typeof abrirModalFunc === 'function') {
      abrirModalFunc();
    } else {
      console.error('Error: abrirModalAgregar no está definido como una función');
    }
  } else {
    console.error('Error: no es una instancia válida');
  }
}


//envio id de paciente con index
async function agregarConsulta() {
  try {
    const index = pacientes.value.findIndex(e => e.id == pacienteSeleccionado.value.id)
    pacientes.value.push(pacienteSeleccionado.value);
    console.log(pacienteSeleccionado);
    
    const res = await api.createConsultation({
      patient_id: pacienteSeleccionado.value.patient_id,
      date: pacienteSeleccionado.date,
      patient: pacienteSeleccionado.patient,
      gynecologist: pacienteSeleccionado.gynecologist,
      reason_for_consultation: pacienteSeleccionado.reason_for_consultation,
      medical_history: pacienteSeleccionado.medical_history,
      physical_examination: pacienteSeleccionado.physical_examination,
      diagnosis: pacienteSeleccionado.diagnosis,
      treatment: pacienteSeleccionado.treatment,
      notes: pacienteSeleccionado.notes,
    });

    console.log(res, "res");
    abrirModal();
    pacienteSeleccionado.value = {
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
  } catch (error) {
    console.log(error, "error en la petición");
    cerrarModal();
  }
}


</script>
<template>
  <div class="container-dialog">
    <Dialog :visible="abrirModalAgregar" @update:visible="cerrarModal" header="Agregar Paciente" class="p-dialog">
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
                <InputText :type="field.type" :modelValue="pacienteSeleccionado[field.field]" @update:modelValue="val => pacienteSeleccionado[field.field] = val" class="p-inputtext" />
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