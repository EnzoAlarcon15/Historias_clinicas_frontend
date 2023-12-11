<template>
  <div class="container">
    <span class="p-input-icon-left">
      <i class="pi pi-search" />
      <InputText v-model="busqueda" @input="filtarPacientes" placeholder="Keyword Search" @click="searchPatients" />
    </span>
    <button class="p-button p-button-rounded p-button-success" @click="abrirDialogAgregarPaciente">
      Agregar Paciente
    </button>
    <DataTable :value="pacientes" :paginator="true" :rows="5" :emptyMessage="emptyMessage" class="table">
      <Column field="name" header="Nombre"></Column>
      <Column field="last_name" header="Apellido"></Column>
      <Column field="dni" header="DNI">
        <template #body="rowData">
          {{ rowData.data.no_of_doc ? rowData.data.no_of_doc : '-' }}
        </template>
      </Column>
      <Column field="cell_phone" header="Teléfono"></Column>
      <Column field="mail" header="Email"></Column>
      <Column header="Acciones">
        <template #body="rowData">
          <Button icon="pi pi-eye" class="p-button-text custom-icon" @click="abrirModalVer(rowData.data)" />
          <Button icon="pi pi-pencil" class="p-button-text custom-icon" @click="abrirModalModificar(rowData.data)" />
          <Button icon="pi pi-trash" class="p-button-text custom-icon" @click="abrirModalEliminar(rowData.data)" />
          <Button icon="pi pi-angle-double-right" class="p-button-text custom-icon" @click="abrirModalConsulta(rowData)" />
         </template>
      </Column>
    </DataTable>
  </div>

<!--Modal agregar paciente-->
<AgregarPaciente :visible="mostrarModalAgregar" @update:visible="cerrarDialogAgregarPaciente" />


<!-- Modal Modificar Paciente -->
<ModificarPaciente :visible="mostrarModalModificar" @update:visible="cerrarModalModificar"/>

 <!-- Modal Eliminar Paciente -->
<Dialog v-model="mostrarModalEliminar" header="Eliminar Paciente" :visible="mostrarModalEliminar" class="p-dialog">
      <p>¿Está seguro que desea eliminar el paciente?</p>

      <Button label="Eliminar" class="p-button-rounded p-button-danger" @click="eliminarPaciente" />
      <Button label="Cancelar" class="p-button-rounded" @click="cerrarModalEliminar" />
</Dialog>
  
<!-- Modal Ver Paciente -->
<Dialog v-model="mostrarModalVer" header="Ver Paciente" :visible="mostrarModalVer" class="p-dialog" style="width: 800px;">
    <div class="container-dialog">
      <div>
        <label>Nombre:</label>
        <div>{{ pacienteSeleccionado.name }}</div>
      </div>
      <div>
        <label>Apellido:</label>
        <div>{{ pacienteSeleccionado.last_name }}</div>
      </div>
      <div>
        <label>Dirección:</label>
        <div>{{ pacienteSeleccionado.address }}</div>
      </div>
      <div>
        <label>Localidad:</label>
        <div>{{ pacienteSeleccionado.location }}</div>
      </div>
      <div>
        <label>Provincia:</label>
        <div>{{ pacienteSeleccionado.province }}</div>
      </div>
      <div>
        <label>Teléfono:</label>
        <div>{{ pacienteSeleccionado.cell_phone }}</div>
      </div>
      <div>
        <label>Mail:</label>
        <div>{{ pacienteSeleccionado.mail }}</div>
      </div>
      <div>
        <label>Fecha De Nacimiento:</label>
        <div>{{ (new Date(pacienteSeleccionado.birthdate)).toLocaleString() }}</div>
      </div>
      <div>
        <label>Edad:</label>
        <div>{{ pacienteSeleccionado.date }}</div>
      </div>
      <div>
        <label>Tipo De Sangre:</label>
        <div>{{ pacienteSeleccionado.blood_type }}</div>
      </div>
      <div>
        <label>Rh:</label>
        <div>{{ pacienteSeleccionado.rh }}</div>
      </div>
      <div>
        <label>Historia Familiar:</label>
        <div>{{ pacienteSeleccionado.family_history }}</div>
      </div>
      <div>
        <label>Historia Personal:</label>
        <div>{{ pacienteSeleccionado.personal_background }}</div>
      </div>
      <div>
        <label>Cobertura:</label>
        <div>{{ pacienteSeleccionado.coverage }}</div>
      </div>
    </div>
    <div class="dialog-button">
      <Button icon="pi pi-print" class="p-button-rounded p-button-success"
        style="color: rgb(77, 77, 240); background-color: antiquewhite;" @click="generatePDF" />
      <Button icon="pi pi-comment" class="p-button-rounded p-button-success" @click="shareWhatsApp" />
      <Button label="Cerrar" class="p-button-rounded p-button-secondary" @click="cerrarModalVer" />
    </div>
  </Dialog>

<!--Moldal Agregar Consulta-->
<AgregarConsulta v-model:visible="mostrarModalConsulta" :pacienteSeleccionado="pacienteSeleccionado" />


</template>

<script setup>
import { ref, computed, onMounted, defineProps} from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import axios from 'axios';
import Dropdown from 'primevue/dropdown';
import * as api from '../helpers/api.js'
import TableConsultationVue from '../components/TableConsultation.vue';
import AgregarPaciente from '../components/generics/AgregarPaciente.vue';
import ModificarPaciente from '../components/generics/ModificarPaciente.vue';
import AgregarConsulta from '../components/generics/AgregarConsulta.vue';

import { createRouter, createWebHistory } from 'vue-router';
import { useRouter } from 'vue-router';

import jsPDF from 'jspdf';


const pacientes = ref([]);
const consultas =ref([]);
const mostrarModalAgregar = ref(false);
const mostrarModalVer = ref(false);
const mostrarModalModificar = ref(false);
const mostrarModalEliminar = ref(false);
const mostrarModal = ref(false)
const busqueda = ref('')
const pacienteId = ref('');
const mostraModalconsulta=ref(false)

function abrirDialogAgregarPaciente() {
  mostrarModalAgregar.value = true;
}

function cerrarDialogAgregarPaciente() {
  mostrarModalAgregar.value = false;
}

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



onMounted(async () => {
  await loadPatientes();
})





async function loadPatientes() {
  const patients = await api.getPatients()
  console.log(patients)
  pacientes.value = patients
}








async function eliminarPaciente() {
  try { 
    console.log(pacienteSeleccionado.value)
    const pacienteId = pacienteSeleccionado.value.id;

    if (!pacienteId) {
      console.log("El ID del paciente seleccionado es undefined.");
      return;
    }

    const indice = pacientes.value.findIndex(p => p.id === pacienteId);
    if (indice !== -1) {
      pacientes.value.splice(indice, 1);
    }

    const res = await api.deletePatient({ id: pacienteId })

    console.log(res.data, "res");

    cerrarModalEliminar();

    pacienteSeleccionado.value = {
      id: '',
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
      nullflags:'',
   
    };
  } catch (err) {
    console.log(err, "error al eliminar");
    cerrarModalEliminar();
  }
}
const emptyMessage = computed(() => {
  return 'No se encontraron pacientes.';
});
async function searchPatients() {
  try {
    console.log(busqueda.value);
    if (busqueda.value.length < 1) {
      return await loadPatientes();
    }

    const res = await api.searchPatient({ data: busqueda.value });
    pacientes.value = res.data;
  } catch (error) {
    console.log(error, "error en la petición");
  }
}

async function filtarPacientes() {
  try {
    console.log(busqueda.value);
    if (busqueda.value.length < 1) {
      return await loadPatientes();
    }

    const res = await api.searchPatient({ data: busqueda.value });
    pacientes.value = res.data;
  } catch (error) {
    console.log(error, "error en la petición");
  }
}




//Función pdf
const generatePDF = () => {
  const doc = new jsPDF();

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString();

  doc.setFontSize(18);
  doc.setTextColor('#007BFF');
  doc.setFont('helvetica', 'bold');

  doc.text(`Fecha: ${formattedDate}`, 10, 30);
  doc.text(`Hora: ${formattedTime}`, 210 - doc.getTextWidth(`Hora: ${formattedTime}`) - 10, 30);
  doc.text('Historia Clínica del Paciente', 90, 45, { align: 'center' });

  doc.setFontSize(12);
  doc.setTextColor('#333');
  doc.setFont('helvetica', 'normal');


  let posY = 80;
  const lineSpacing = 10;

  doc.text(`Nombre: ${pacienteSeleccionado.value.name} ${pacienteSeleccionado.value.last_name}`, 20, posY);
  posY += lineSpacing;

  doc.text(`Dirección: ${pacienteSeleccionado.value.address}`, 20, posY);
  posY += lineSpacing;

  doc.text(`Localidad: ${pacienteSeleccionado.value.location}`, 20, posY);
  posY += lineSpacing;

  doc.text(`Provincia: ${pacienteSeleccionado.value.province}`, 20, posY);
  posY += lineSpacing;

  doc.text(`Teléfono: ${pacienteSeleccionado.value.cell_phone}`, 20, posY);
  posY += lineSpacing;

  doc.text(`Email: ${pacienteSeleccionado.value.mail}`, 20, posY);
  posY += lineSpacing;

  doc.text(`Fecha de Nacimiento: ${pacienteSeleccionado.value.birthdate}`, 20, posY);
  posY += lineSpacing;

  doc.text(`Tipo de Sangre: ${pacienteSeleccionado.value.blood_type}`, 20, posY);
  posY += lineSpacing;

  doc.text(`Factor RH: ${pacienteSeleccionado.value.rh}`, 20, posY);
  posY += lineSpacing;

  doc.text(`Cobertura Médica: ${pacienteSeleccionado.value.coverage}`, 20, posY);
  posY += lineSpacing;

  doc.text(`Antecedentes Familiares: ${pacienteSeleccionado.value.family_history}`, 20, posY);
  posY += lineSpacing;

  doc.text(`Antecedentes Personales: ${pacienteSeleccionado.value.personal_background}`, 20, posY);
  posY += lineSpacing;

  doc.text(`DNI: ${pacienteSeleccionado.value.dni}`, 20, posY);
  posY += lineSpacing;

  doc.text(`Fecha: ${pacienteSeleccionado.value.date}`, 20, posY);

  doc.save('historia_clinica_paciente.pdf');
};



const shareWhatsApp = () => {

  const pdfLink = 'https://localhost/historia_clinica_paciente.pdf';


  const message = `¡Hola! Aquí está tu Historia Clínica: ${pdfLink}`;


  const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;


  window.open(whatsappLink, '_blank');
};






//funciones de modales


function abrilModalConsulta(){
  pacienteSeleccionado.id=pacienteId
  mostrarNuevaConsulta.value= false ;
}
function cerrarModalConsulta(){
  mostrarModalConsulta.value= false;
}
function cerrarModalAgregar() {
  mostrarModalAgregar.value = false;
}



const mostrarModalConsulta = ref(false);

function abrirModalConsulta() {
  mostrarModalConsulta.value = true;
}

function abrirModalVer(paciente) {
  pacienteSeleccionado.value =paciente;
  mostrarModalVer.value = true;
}

function cerrarModalVer() {
  mostrarModalVer.value = false;
}


function abrirModalModificar(paciente) {
  pacienteSeleccionado.value = { ...paciente };
  mostrarModalModificar.value = true;
}

function cerrarModalModificar() {
  mostrarModalModificar.value = false;
}

function abrirModalEliminar(paciente) {
  pacienteSeleccionado.value = paciente;
  mostrarModalEliminar.value = true;
}

function cerrarModalEliminar() {
  mostrarModalEliminar.value = false;
}



</script>

<style scoped>
.container {
  max-width:100%;
  margin: 0 auto;
  padding: 20px;
 
 
}

.p-inputtext {
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

.dialog-button {
  margin-top: 10px;
  text-align: right;
}

.dialog-button .p-button {
  margin-left: 10px;
  min-width: 120px; 
}



.table {
  margin-top: 30px;
  padding: 8px;
  text-align: left;
  border: 5px solid #dfe0df;

}



label {
  font-weight: bold;
  color: rgb(47, 47, 248);
}

.p-input-icon-left {
  margin-right: 10px;
}
.custom-icon {
  color: blue; 
}


.container-dialog {
  display: grid;
  grid-template-columns: 25% 50% 25%;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 0 auto;
}


@media screen and (min-width: 235px) {
  
}
@media (max-width: 768px) {
  .container-dialog {
    grid-template-columns: 1fr;
  }
}


</style>