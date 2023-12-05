<template>
  <div class=".container-dialog" >
    <Dialog v-model="abrirModalAgregar" header="Agregar Paciente " :visible="abrirModalAgregar" class="p-dialog" style="width: 80%;" >
      <div> 
       <div style="flex: 1; padding-right: 20px;">
        <div>
        <label>Nombre:</label>
        <InputText v-model="pacienteSeleccionado.name" class="p-inputtext" />
      </div>
      <div>
        <label>Apellido:</label>
        <InputText v-model="pacienteSeleccionado.last_name" class="p-inputtext" />
      </div>
      <div  >
        <label>Dirección:</label>
        <InputText v-model="pacienteSeleccionado.address" class="p-inputtext" />
      </div>
      <div  >
        <label>Localidad:</label>
        <InputText v-model="pacienteSeleccionado.location" class="p-inputtext" />
      </div>
      <div  >
        <label>Provincia:</label>
        <InputText v-model="pacienteSeleccionado.province" class="p-inputtext" />
      </div>
      <div  >
        <label>Teléfono:</label>
        <InputText type="number" v-model="pacienteSeleccionado.cell_phone" class="p-inputtext" />
      </div>
      <div >
        <label>Correo:</label>
        <InputText type="email" v-model="pacienteSeleccionado.mail" class="p-inputtext" />
      </div>
      <div >
        <label>Fecha De Nacimiento:</label>
        <InputText type="date" v-model="pacienteSeleccionado.birthdate" class="p-inputtext" />
      </div>
      <div >
        <label>Edad:</label>
        <InputText type="number" v-model="pacienteSeleccionado.date" class="p-inputtext" />
      </div>
      <div >
        <label>Tipo De Sangre:</label>
        <Dropdown placeholder="Seleccionar Tipo de Sangre" :options="tipoSangre" v-model="pacienteSeleccionado.blood_type" class="p-dropdown" />
      </div>
      <div>
        <label>Rh:</label>
        <Dropdown v-model="pacienteSeleccionado.rh" placeholder="Seleccionar RH" :options="rh" class="p-dropdown" />
      </div>
      <div >
        <label>Cobertura:</label>
        <InputText v-model="pacienteSeleccionado.coverage" class="p-inputtext" />
      </div>
      <div >
        <label>Antecedentes Familiares:</label>
        <InputText v-model="pacienteSeleccionado.family_history" class="p-inputtext" />
      </div>
      <div >
        <label>Antecedentes Personales:</label>
        <InputText v-model="pacienteSeleccionado.personal_background" class="p-inputtext" />
      </div>
      <div >
        <label>Código Postal:</label>
        <InputText v-model="pacienteSeleccionado.cod_post" class="p-inputtext" />
      </div>
      <div >
        <label>Nacionalidad:</label>
        <InputText v-model="pacienteSeleccionado.nationalid" class="p-inputtext" />
      </div>
      <div >
        <label>Teléfono Alternativo:</label>
        <InputText v-model="pacienteSeleccionado.telephone" class="p-inputtext" />
      </div>
       </div>
      <div>
        <label>Tipo De Documento:</label>
        <InputText v-model="pacienteSeleccionado.type_of_do" class="p-inputtext" />
      </div>
      <div >
        <label>Número de Documento:</label>
        <InputText v-model="pacienteSeleccionado.no_of_doc" class="p-inputtext" />
      </div>
      <div>
        <label>Sexo:</label>
        <Dropdown placeholder="Seleccionar Sexo" :options="sexo" v-model="pacienteSeleccionado.sex" class="p-dropdown" />
      </div>
      <div >
        <label>Estado Civil:</label>
        <InputText v-model="pacienteSeleccionado.est_civil" class="p-inputtext" />
      </div>
      <div >
        <label>Ocupación:</label>
        <InputText v-model="pacienteSeleccionado.occupation" class="p-inputtext" />
      </div>
      <div >
        <label>Tipo de Deuda:</label>
        <InputText v-model="pacienteSeleccionado.type_of_debt" class="p-inputtext" />
      </div>
      <div >
        <label>Código Deudor o Plan:</label>
        <InputText v-model="pacienteSeleccionado.cod_deudorcod_plan" class="p-inputtext" />
      </div>
      <div>
        <label>Número de Afiliación:</label>
        <InputText v-model="pacienteSeleccionado.nro_affilia" class="p-inputtext" />
      </div>
      <div >
        <label>Gravado:</label>
        <InputText v-model="pacienteSeleccionado.gavado" class="p-inputtext" />
      </div>
      <div >
        <label>Primera Visita:</label>
        <InputText type="date" v-model="pacienteSeleccionado.primera_vi" class="p-inputtext" />
      </div>
      <div >
        <label>Última Visita:</label>
        <InputText type="date" v-model="pacienteSeleccionado.last_vis" class="p-inputtext" />
      </div>
      <div>
        <label>Número de Visitas:</label>
        <InputText v-model="pacienteSeleccionado.nro_de_vis" class="p-inputtext" />
      </div>
      <div >
        <label>Código de Seguimiento:</label>
        <InputText v-model="pacienteSeleccionado.cod_seguim" class="p-inputtext" />
      </div>
      <div>
        <label>Geo Zona:</label>
        <InputText v-model="pacienteSeleccionado.geozona" class="p-inputtext" />
      </div>
      <div >
        <label>CUIT:</label>
        <InputText v-model="pacienteSeleccionado.cuit" class="p-inputtext" />
      </div>
      <div>
        <label>Posición Vapaci:</label>
        <InputText v-model="pacienteSeleccionado.posivapaci" class="p-inputtext" />
      </div>
      <div >
        <label>Condición:</label>
        <InputText v-model="pacienteSeleccionado.condition" class="p-inputtext" />
      </div>
      <div >
        <label>Historia Clínica Anterior:</label>
        <InputText v-model="pacienteSeleccionado.hcanterior" class="p-inputtext" />
      </div>
      <div >
        <label>Notas:</label>
        <InputText v-model="pacienteSeleccionado.notes" class="p-inputtext" />
      </div>
      <div>
        <label>Null Flags:</label>
        <InputText v-model="pacienteSeleccionado.nullflags" class="p-inputtext" />
      </div>
      </div>
      <div class="dialog-button">
        <Button label="Guardar" class="p-button-redondeado p-button-success" @click="agregarPaciente" />
        <Button label="Cancelar" class="p-button-rounded p-button-danger" @click="cerrarModalAgregar" />
      </div>
    </Dialog>
  </div>

</template>

<script setup>
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import { ref, defineProps, defineEmits, watch} from 'vue';
import Dropdown from 'primevue/dropdown';
const emits = defineEmits();
const pacientes = ref([]);
const mostrarModalAgregar = ref(false);


const props = defineProps(['abrirModalAgregar']);
defineExpose({ abrirModalAgregar });

watch(() => props.abrirModalAgregar, (newValue) => {
  abrirModalAgregar.value = newValue;
});

const pacienteSeleccionado = ref({
  name: '',
  last_name:'',
  address:'',
  location:'',
  province:'',
  cell_phone:'',
  mail:'',
  birthdate:'',
  blood_type:'',
  rh:'',
  coverage:'',
  family_history:'',
  personal_background:'',
  date:'',
  cod_post:'',
  locality:'',
  nationalid:'',
  telephone:'',
  type_of_do:'',
  no_of_doc:'',
  sex:'',
  est_civil:'',
  occupation:'',
  type_of_debt:'',
  cod_deudorcod_plan:'',
  nro_affilia:'',
  gavado:'',
  primera_vi:'',
  last_vis:'',
  nro_de_vis:'',
  cod_seguim:'',
  geozona:'',
  cuit:'',
  posivapaci:'',
  condition:'',
  hcanterior:'',
  notes:'',
  nullflags:''
});

async function agregarPaciente() {
  try {
    pacientes.value.push(pacienteSeleccionado.value);
    console.log(pacienteSeleccionado)
    const res = await api.createPatients(pacienteSeleccionado.value);
    console.log(res, "res");
    cerrarModalAgregar();
    pacienteSeleccionado.value = {
      name: '',
      last_name:'',
      address:'',
      location:'',
      province:'',
      cell_phone:'',
      mail:'',
      birthdate:'',
      blood_type:'',
      rh:'',
      coverage:'',
      family_history:'',
      personal_background:'',
      date:'',
      cod_post:'',
      locality:'',
      nationalid:'',
      telephone:'',
      type_of_do:'',
      no_of_doc:'',
      sex:'',
      est_civil:'',
      occupation:'',
      type_of_debt:'',
      cod_deudorcod_plan:'',
      nro_affilia:'',
      gavado:'',
      primera_vi:'',
      last_vis:'',
      nro_de_vis:'',
      cod_seguim:'',
      geozona:'',
      cuit:'',
      posivapaci:'',
      condition:'',
      hcanterior:'',
      notes:'',
      nullflags:''
    };
  } catch (error) {
    console.log(error, "error en la petición");
    cerrarModalAgregar();
  }
}


function abrirModalAgregar() {
  mostrarModalAgregar.value = true;
}

function cerrarModalAgregar() {
  mostrarModalAgregar.value = false;
}

</script>
<style scoped>

.p-dialog {
  width: 800px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>