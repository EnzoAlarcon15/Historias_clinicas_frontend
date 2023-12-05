<template>
  <div class="container">
    <span class="p-input-icon-left">
      <i class="pi pi-search" />
      <InputText v-model="busqueda" @input="filtarPacientes" placeholder="Keyword Search" @click="searchPatients" />
    </span>
    <button class="p-button p-button-rounded p-button-success" @click="abrirDialogAgregarPaciente">Agregar Paciente</button>



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











    


    <!-- Modal Modificar Paciente -->
  <div>
    <Dialog v-model="mostrarModalModificar" header="Modificar Paciente" :visible="mostrarModalModificar"
      class="p-dialog">
      <div class="modal-column "> 
        <div>
        <label>Nombre:</label>
        <InputText v-model="pacienteSeleccionado.name" class="p-inputtext" />
      </div>
      <div>
        <label>Apellido:</label>
        <InputText v-model="pacienteSeleccionado.last_name" class="p-inputtext" />
      </div>
      <div>
        <label>Dirección:</label>
        <InputText v-model="pacienteSeleccionado.address" class="p-inputtext" />
      </div>
      <div>
        <label>Localidad:</label>
        <InputText v-model="pacienteSeleccionado.location" class="p-inputtext" />
      </div>
      <div>
        <label>Provincia:</label>
        <InputText v-model="pacienteSeleccionado.province" class="p-inputtext" />
      </div>
      <div>
        <label>Teléfono:</label>
        <InputText type="number" v-model="pacienteSeleccionado.cell_phone" class="p-inputtext" />
      </div>
      <div>
        <label>Correo:</label>
        <InputText type="email" v-model="pacienteSeleccionado.mail" class="p-inputtext" />
      </div>
      <div>
        <label>Fecha De Nacimiento:</label>
        <InputText type="date" v-model="pacienteSeleccionado.birthdate" class="p-inputtext" />
      </div>
      <div>
        <label>Edad:</label>
        <InputText type="number" v-model="pacienteSeleccionado.date" class="p-inputtext" />
      </div>
      <div>
        <label>Tipo De Sangre:</label>
        <Dropdown placeholder="Seleccionar Tipo de Sangre" :options="tipoSangre" v-model="pacienteSeleccionado.blood_type" class="p-dropdown" />
      </div>
      <div>
        <label>Rh:</label>
        <Dropdown v-model="pacienteSeleccionado.rh" placeholder="Seleccionar RH" :options="rh" class="p-dropdown" />
      </div>
      <div>
        <label>Cobertura:</label>
        <InputText v-model="pacienteSeleccionado.coverage" class="p-inputtext" />
      </div>
      <div>
        <label>Antecedentes Familiares:</label>
        <InputText v-model="pacienteSeleccionado.family_history" class="p-inputtext" />
      </div>
      <div>
        <label>Antecedentes Personales:</label>
        <InputText v-model="pacienteSeleccionado.personal_background" class="p-inputtext" />
      </div>
      <div>
        <label>Código Postal:</label>
        <InputText v-model="pacienteSeleccionado.cod_post" class="p-inputtext" />
      </div>
      <div>
        <label>Nacionalidad:</label>
        <InputText v-model="pacienteSeleccionado.nationalid" class="p-inputtext" />
      </div>
      <div>
        <label>Teléfono Alternativo:</label>
        <InputText v-model="pacienteSeleccionado.telephone" class="p-inputtext" />
      </div>
      <div>
        <label>Tipo De Documento:</label>
        <InputText v-model="pacienteSeleccionado.type_of_do" class="p-inputtext" />
      </div>
      <div>
        <label>Número de Documento:</label>
        <InputText v-model="pacienteSeleccionado.no_of_doc" class="p-inputtext" />
      </div>
      <div>
        <label>Sexo:</label>
        <Dropdown placeholder="Seleccionar Sexo" :options="sexo" v-model="pacienteSeleccionado.sex" class="p-dropdown" />
      </div>
      <div>
        <label>Estado Civil:</label>
        <InputText v-model="pacienteSeleccionado.est_civil" class="p-inputtext" />
      </div>
      <div>
        <label>Ocupación:</label>
        <InputText v-model="pacienteSeleccionado.occupation" class="p-inputtext" />
      </div>
      <div>
        <label>Tipo de Deuda:</label>
        <InputText v-model="pacienteSeleccionado.type_of_debt" class="p-inputtext" />
      </div>
      <div>
        <label>Código Deudor o Plan:</label>
        <InputText v-model="pacienteSeleccionado.cod_deudorcod_plan" class="p-inputtext" />
      </div>
      <div>
        <label>Número de Afiliación:</label>
        <InputText v-model="pacienteSeleccionado.nro_affilia" class="p-inputtext" />
      </div>
      <div>
        <label>Gravado:</label>
        <InputText v-model="pacienteSeleccionado.gavado" class="p-inputtext" />
      </div>
      <div>
        <label>Primera Visita:</label>
        <InputText type="date" v-model="pacienteSeleccionado.primera_vi" class="p-inputtext" />
      </div>
      <div>
        <label>Última Visita:</label>
        <InputText type="date" v-model="pacienteSeleccionado.last_vis" class="p-inputtext" />
      </div>
      <div>
        <label>Número de Visitas:</label>
        <InputText v-model="pacienteSeleccionado.nro_de_vis" class="p-inputtext" />
      </div>
      <div>
        <label>Código de Seguimiento:</label>
        <InputText v-model="pacienteSeleccionado.cod_seguim" class="p-inputtext" />
      </div>
      <div>
        <label>Geo Zona:</label>
        <InputText v-model="pacienteSeleccionado.geozona" class="p-inputtext" />
      </div>
      <div>
        <label>CUIT:</label>
        <InputText v-model="pacienteSeleccionado.cuit" class="p-inputtext" />
      </div>
      <div>
        <label>Posición Vapaci:</label>
        <InputText v-model="pacienteSeleccionado.posivapaci" class="p-inputtext" />
      </div>
      <div>
        <label>Condición:</label>
        <InputText v-model="pacienteSeleccionado.condition" class="p-inputtext" />
      </div>
      <div>
        <label>Historia Clínica Anterior:</label>
        <InputText v-model="pacienteSeleccionado.hcanterior" class="p-inputtext" />
      </div>
      <div>
        <label>Notas:</label>
        <InputText v-model="pacienteSeleccionado.notes" class="p-inputtext" />
      </div>
      <div>
        <label>Null Flags:</label>
        <InputText v-model="pacienteSeleccionado.nullflags" class="p-inputtext" />
      </div>
      

      </div>


      <Button label="Guardar" class="p-button-rounded p-button-success" @click="modificarPaciente($event)" />
      <Button label="Cancelar" class="p-button-rounded p-button-danger" @click="cerrarModalModificar" />
    </Dialog>

    <!-- Modal Eliminar Paciente -->
    <Dialog v-model="mostrarModalEliminar" header="Eliminar Paciente" :visible="mostrarModalEliminar" class="p-dialog">
      <p>¿Está seguro que desea eliminar el paciente?</p>

      <Button label="Eliminar" class="p-button-rounded p-button-danger" @click="eliminarPaciente" />
      <Button label="Cancelar" class="p-button-rounded" @click="cerrarModalEliminar" />
    </Dialog>
  </div>

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
import AgregarPacienteVue from '../components/generics/AgregarPaciente.vue';
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
const agregarPacienteDialog = ref(null);

function abrirDialogAgregarPaciente() {
  abrirModalAgregar();
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

const NewConsulta = ref({
  patient_id:'',
  date:'',
  patient:'',
  no_of_doc:'',
  gynecologist:'',
  reason_for_consultation:'',
  medical_history:'',
  physical_examination:'',
  diagnosis:'',
  treatment:'',
  notes:''
});

onMounted(async () => {
  await loadPatientes();
})





async function loadPatientes() {
  const patients = await api.getPatients()
  console.log(patients)
  pacientes.value = patients
}






async function modificarPaciente(event) {
  try {

    const index = pacientes.value.findIndex(e => e.id == pacienteSeleccionado.value.id)

    const updatedData = {
      id: pacienteSeleccionado.value.id,
      name: pacienteSeleccionado.value.name,
      last_name: pacienteSeleccionado.value.last_name,
      address: pacienteSeleccionado.value.address,
      location: pacienteSeleccionado.value.location,
      province: pacienteSeleccionado.value.province,
      cell_phone: pacienteSeleccionado.value.cell_phone,
      mail: pacienteSeleccionado.value.mail,
      birthdate: pacienteSeleccionado.value.birthdate,
      blood_type: pacienteSeleccionado.value.blood_type,
      rh: pacienteSeleccionado.value.rh,
      coverage: pacienteSeleccionado.value.coverage,
      family_history: pacienteSeleccionado.value.family_history,
      personal_background: pacienteSeleccionado.value.personal_background,
      date: pacienteSeleccionado.value.date,
      cod_post:pacienteSeleccionado.value.cod_post,
      locality:pacienteSeleccionado.value.locality,
      nationalid:pacienteSeleccionado.value.nationalid,
      telephone:pacienteSeleccionado.value.telephone,
      type_of_do:pacienteSeleccionado.value.type_of_debt,
      no_of_doc:pacienteSeleccionado.value.no_of_doc,
      sex:pacienteSeleccionado.value.sex,
      est_civil:pacienteSeleccionado.value.est_civil,
      occupation:pacienteSeleccionado.value.occupation,
      type_of_debt:pacienteSeleccionado.value.type_of_debt,
      cod_deudorcod_plan:pacienteSeleccionado.value.cod_deudorcod_plan,
      nro_affilia:pacienteSeleccionado.value.nro_affilia,
      gavado:pacienteSeleccionado.value.gavado,
      primera_vi:pacienteSeleccionado.value.primera_vi,
      last_vis:pacienteSeleccionado.value.last_vis,
      cod_seguim:pacienteSeleccionado.value.cod_seguim,
      geozona:pacienteSeleccionado.value.geozona,
      cuit:pacienteSeleccionado.value.cuit,
      posivapaci:pacienteSeleccionado.value.posivapaci,
      condition:pacienteSeleccionado.value.condition,
      hcanterior:pacienteSeleccionado.value.hcanterior,
      notes:pacienteSeleccionado.value.notes,
      nullflags:pacienteSeleccionado.value.nullflags
    };


    console.log(updatedData);

    const res = await api.updatePatient(updatedData.id, updatedData)
    await loadPatientes()
    console.log("pase")
    if (res.error === false) {

      cerrarModalAgregar();
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
        nullflags:''
      };
      console.log(pacienteSeleccionado);
    } else {
      throw new Error('Error al modificar el paciente: ' + res);
    }
  } catch (error) {
    console.log(error.message, 'error al modificar');
    cerrarModalAgregar();
  }
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