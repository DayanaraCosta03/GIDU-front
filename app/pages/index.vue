<script setup lang="ts">
definePageMeta({
  layout: "app",
});

// Datos para las estadísticas principales
const stats = ref({
  total: 1.248,
  pendientes: 45,
});

// Datos para áreas GIDU
const areasGIDU = ref([
  {
    nombre: "Gestión Documental",
    documentos: 245,
    icono: "fa-folder",
    color: "blue",
  },
  {
    nombre: "Archivo Central",
    documentos: 187,
    icono: "fa-archive",
    color: "green",
  },
  {
    nombre: "Digitalización",
    documentos: 132,
    icono: "fa-scanner",
    color: "purple",
  },
  {
    nombre: "Consulta Pública",
    documentos: 98,
    icono: "fa-search",
    color: "orange",
  },
]);

// Datos para áreas del Consejo
const areasConsejo = ref([
  {
    nombre: "Presidencia",
    documentos: 156,
    icono: "fa-user-tie",
    color: "red",
  },
  {
    nombre: "Secretaría General",
    documentos: 143,
    icono: "fa-scroll",
    color: "indigo",
  },
  {
    nombre: "Comisión Legal",
    documentos: 121,
    icono: "fa-gavel",
    color: "teal",
  },
  {
    nombre: "Comisión Técnica",
    documentos: 98,
    icono: "fa-cogs",
    color: "pink",
  },
]);

// Datos para pendientes
const pendientes = ref([
  {
    descripcion: "Revisión de expedientes técnicos",
    prioridad: "alta",
    fecha: "Hoy",
  },
  {
    descripcion: "Firmas pendientes de director",
    prioridad: "media",
    fecha: "Hoy",
  },
  {
    descripcion: "Digitalización de documentos antiguos",
    prioridad: "baja",
    fecha: "15 Ene",
  },
  {
    descripcion: "Actualización de metadatos",
    prioridad: "media",
    fecha: "18 Ene",
  },
]);
</script>

<template>
  <!-- Título del Dashboard -->
  <div class="dashboard-title">
    <h2>Dashboard SIGE-GIDU</h2>
    <p>Resumen general del sistema</p>
  </div>

  <!-- Contenido Principal -->
  <div class="main-content">
    <!-- Columna Izquierda: Estadísticas y Áreas GIDU -->
    <div class="left-column">
      <!-- Estadísticas Rápidas -->
      <div class="stats-cards">
        <div class="stat-card">
          <div class="stat-main">
            <div class="stat-number">{{ stats.total.toLocaleString() }}</div>
            <div class="stat-label">Total Documentos</div>
          </div>
          <div class="stat-trend positive">
            <i class="fas fa-arrow-up"></i>
            <span>12.5%</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-main">
            <div class="stat-number">{{ stats.pendientes }}</div>
            <div class="stat-label">Pendientes</div>
          </div>
          <div class="stat-trend negative">
            <i class="fas fa-arrow-up"></i>
            <span>5.2%</span>
          </div>
        </div>
      </div>

      <!-- Áreas GIDU -->
      <div class="section-card">
        <div class="section-header">
          <h3><i class="fas fa-building"></i> Áreas de GIDU</h3>
        </div>
        <div class="areas-grid">
          <div
            v-for="(area, index) in areasGIDU"
            :key="index"
            class="area-item"
            :class="area.color"
          >
            <div class="area-icon">
              <i :class="['fas', area.icono]"></i>
            </div>
            <div class="area-content">
              <h4>{{ area.nombre }}</h4>
              <p>{{ area.documentos }} documentos</p>
            </div>
            <div class="area-badge">
              {{ Math.round((area.documentos / stats.total) * 100) }}%
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Columna Derecha: Áreas del Consejo y Pendientes -->
    <div class="right-column">
      <!-- Áreas del Consejo -->
      <div class="section-card">
        <div class="section-header">
          <h3><i class="fas fa-landmark"></i> Áreas del Consejo</h3>
        </div>
        <div class="areas-grid">
          <div
            v-for="(area, index) in areasConsejo"
            :key="index"
            class="area-item"
            :class="area.color"
          >
            <div class="area-icon">
              <i :class="['fas', area.icono]"></i>
            </div>
            <div class="area-content">
              <h4>{{ area.nombre }}</h4>
              <p>{{ area.documentos }} documentos</p>
            </div>
            <div class="area-badge">
              {{ Math.round((area.documentos / stats.total) * 100) }}%
            </div>
          </div>
        </div>
      </div>

      <!-- Pendientes -->
      <div class="section-card">
        <div class="section-header">
          <h3><i class="fas fa-clock"></i> Pendientes</h3>
        </div>
        <div class="pendientes-list">
          <div
            v-for="(pendiente, index) in pendientes"
            :key="index"
            class="pendiente-item"
          >
            <div class="pendiente-priority" :class="pendiente.prioridad"></div>
            <div class="pendiente-content">
              <p>{{ pendiente.descripcion }}</p>
              <span class="pendiente-date">{{ pendiente.fecha }}</span>
            </div>
            <button class="pendiente-action">
              <i class="fas fa-ellipsis-v"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 20px 30px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.header-left h1 {
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 4px 0;
}

.header-left p {
  color: #718096;
  font-size: 14px;
  margin: 0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #4a5568;
  font-weight: 500;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3498db, #2980b9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

/* Título del Dashboard */
.dashboard-title {
  background: white;
  border-radius: 12px;
  padding: 25px 30px;
  margin-bottom: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.dashboard-title h2 {
  font-size: 28px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 8px 0;
}

.dashboard-title p {
  color: #718096;
  font-size: 16px;
  margin: 0;
}

/* Contenido Principal */
.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  height: calc(100vh - 200px);
}

.left-column,
.right-column {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

/* Tarjetas de Estadísticas */
.stats-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  line-height: 1;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: #718096;
  font-weight: 500;
}

.stat-trend {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 20px;
}

.stat-trend.positive {
  background: rgba(46, 204, 113, 0.15);
  color: #27ae60;
}

.stat-trend.negative {
  background: rgba(231, 76, 60, 0.15);
  color: #e74c3c;
}

/* Tarjetas de Sección */
.section-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.section-header {
  padding: 20px 25px;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
}

.section-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Grid de Áreas */
.areas-grid {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.area-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border-radius: 8px;
  background: #f8fafc;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.area-item:hover {
  background: #edf2f7;
  transform: translateX(4px);
}

.area-item.blue {
  border-left-color: #3498db;
}
.area-item.green {
  border-left-color: #2ecc71;
}
.area-item.purple {
  border-left-color: #9b59b6;
}
.area-item.orange {
  border-left-color: #e67e22;
}
.area-item.red {
  border-left-color: #e74c3c;
}
.area-item.indigo {
  border-left-color: #4c6ef5;
}
.area-item.teal {
  border-left-color: #20c997;
}
.area-item.pink {
  border-left-color: #e64980;
}

.area-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
}

.area-item.blue .area-icon {
  background: #3498db;
}
.area-item.green .area-icon {
  background: #2ecc71;
}
.area-item.purple .area-icon {
  background: #9b59b6;
}
.area-item.orange .area-icon {
  background: #e67e22;
}
.area-item.red .area-icon {
  background: #e74c3c;
}
.area-item.indigo .area-icon {
  background: #4c6ef5;
}
.area-item.teal .area-icon {
  background: #20c997;
}
.area-item.pink .area-icon {
  background: #e64980;
}

.area-content {
  flex: 1;
}

.area-content h4 {
  font-size: 15px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 4px 0;
}

.area-content p {
  font-size: 13px;
  color: #718096;
  margin: 0;
}

.area-badge {
  background: white;
  color: #4a5568;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid #e2e8f0;
}

/* Lista de Pendientes */
.pendientes-list {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.pendiente-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border-radius: 8px;
  background: #f8fafc;
  transition: background-color 0.3s ease;
}

.pendiente-item:hover {
  background: #edf2f7;
}

.pendiente-priority {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.pendiente-priority.alta {
  background: #e74c3c;
}
.pendiente-priority.media {
  background: #f39c12;
}
.pendiente-priority.baja {
  background: #3498db;
}

.pendiente-content {
  flex: 1;
}

.pendiente-content p {
  font-size: 14px;
  font-weight: 500;
  color: #2c3e50;
  margin: 0 0 4px 0;
}

.pendiente-date {
  font-size: 12px;
  color: #718096;
  background: #edf2f7;
  padding: 2px 8px;
  border-radius: 8px;
}

.pendiente-action {
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.pendiente-action:hover {
  background: #e2e8f0;
  color: #4a5568;
}

/* Responsive */
@media (max-width: 1024px) {
  .main-content {
    grid-template-columns: 1fr;
    height: auto;
  }

  .left-column,
  .right-column {
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .dashboard {
    padding: 15px;
  }

  .header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }

  .stats-cards {
    grid-template-columns: 1fr;
  }

  .dashboard-title h2 {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .dashboard {
    padding: 10px;
  }

  .area-item {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }

  .area-content {
    text-align: center;
  }

  .pendiente-item {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }

  .pendiente-content {
    text-align: center;
  }
}
</style>
