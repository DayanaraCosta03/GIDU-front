<script setup lang="ts">
definePageMeta({
  layout: "app",
});

const form = ref({
  numeroExpediente: "",
  fechaEntrada: "",
  fechaSalida: "",
  horaSalida: "",
  remitente: "",
  area: "",
  asunto: "",
  folios: "",
});

const handleSubmit = () => {
  // Aquí luego conectas con tu backend
  console.log("Datos enviados:", form.value);
};
</script>

<template>
  <div class="container">
    <div class="header">
      <h1><i class="fas fa-folder-open"></i> Registrar Nuevo Expediente</h1>
      <p>Completa los datos del expediente para registrarlo en el sistema</p>
    </div>

    <div class="form-container">
      <form @submit.prevent="handleSubmit" class="form-grid">
        <div class="form-group">
          <label for="numeroExpediente" class="required">N° Expediente</label>
          <input
            id="numeroExpediente"
            v-model="form.numeroExpediente"
            type="text"
            class="input"
            placeholder="Ej: EXP-2024-001"
            required
          />
        </div>

        <div class="form-group">
          <label for="fechaEntrada" class="required">Fecha de Entrada</label>
          <input
            id="fechaEntrada"
            v-model="form.fechaEntrada"
            type="date"
            class="input"
            required
          />
        </div>

        <div class="form-group">
          <label for="fechaSalida">Fecha de Salida</label>
          <input
            id="fechaSalida"
            v-model="form.fechaSalida"
            type="date"
            class="input"
          />
        </div>

        <div class="form-group">
          <label for="horaSalida">Hora de Salida</label>
          <input
            id="horaSalida"
            v-model="form.horaSalida"
            type="time"
            class="input"
          />
        </div>

        <div class="form-group">
          <label for="remitente" class="required">Remitente</label>
          <input
            id="remitente"
            v-model="form.remitente"
            type="text"
            class="input"
            placeholder="Nombre del remitente"
            required
          />
        </div>

        <div class="form-group">
          <label for="area" class="required">Área</label>
          <select id="area" v-model="form.area" class="input" required>
            <option value="" disabled selected>Seleccione un área</option>
            <option value="administracion">Administración</option>
            <option value="finanzas">Finanzas</option>
            <option value="recursos-humanos">Recursos Humanos</option>
            <option value="juridico">Jurídico</option>
            <option value="tecnologia">Tecnología</option>
          </select>
        </div>

        <div class="form-group full-width">
          <label for="asunto" class="required">Asunto</label>
          <textarea
            id="asunto"
            v-model="form.asunto"
            rows="4"
            class="input resize-none"
            placeholder="Descripción detallada del asunto del expediente..."
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label for="folios" class="required">Folios</label>
          <input
            id="folios"
            v-model="form.folios"
            type="number"
            class="input"
            min="1"
            placeholder="Número de folios"
            required
          />
        </div>

        <div class="button-group full-width">
          <button type="submit" class="btn btn-save">
            <i class="fas fa-save"></i> Guardar Expediente
          </button>
          <button type="button" @click="$router.back()" class="btn btn-cancel">
            <i class="fas fa-times"></i> Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  max-width: 800px;
  width: 100%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 0 auto;
}

.header {
  background: linear-gradient(135deg, #78b9fa, #79d7ff);
  color: rgb(0, 0, 0);
  padding: 25px 30px;
  text-align: center;
}

.header h1 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.header p {
  opacity: 0.9;
  font-size: 16px;
}

.form-container {
  padding: 30px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.full-width {
  grid-column: 1 / -1;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2c3e50;
  font-size: 16px;
}

.required::after {
  content: " *";
  color: #e74c3c;
}

.input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
  background-color: #f9f9f9;
}

.input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  background-color: white;
}

textarea.input {
  min-height: 120px;
  resize: vertical;
}

.button-group {
  display: flex;
  gap: 15px;
  margin-top: 20px;
  justify-content: flex-end;
}

.btn {
  padding: 14px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.btn-save {
  background: linear-gradient(135deg, #64ef9e, #38f286);
  color: rgb(0, 0, 0);
}

.btn-save:hover {
  background: linear-gradient(135deg, #27ae60, #219653);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(145, 230, 180, 0.3);
}

.btn-cancel {
  background: #f8f9fa;
  color: #6c757d;
  border: 1px solid #dee2e6;
}

.btn-cancel:hover {
  background: #e9ecef;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .container {
    border-radius: 0;
  }

  .form-container {
    padding: 20px;
  }

  .button-group {
    flex-direction: column;
  }
}
</style>
