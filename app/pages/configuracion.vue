<script setup lang="ts">
definePageMeta({
  layout: "app",
});

// Datos para últimos 7 días
const ultimos7Dias = ref([
  { dia: "LUN", documentos: 15 },
  { dia: "MAR", documentos: 22 },
  { dia: "MIE", documentos: 18 },
  { dia: "JUE", documentos: 25 },
  { dia: "VIE", documentos: 20 },
  { dia: "SAB", documentos: 8 },
  { dia: "DOM", documentos: 5 },
]);

// Datos para documentos por área
const documentosPorArea = ref([
  { area: "Administración", cantidad: 156, porcentaje: 28 },
  { area: "Recursos Humanos", cantidad: 132, porcentaje: 24 },
  { area: "Finanzas", cantidad: 98, porcentaje: 18 },
  { area: "Tecnología", cantidad: 75, porcentaje: 14 },
  { area: "Jurídico", cantidad: 54, porcentaje: 10 },
  { area: "Infraestructura", cantidad: 32, porcentaje: 6 },
]);

// Datos para tipos de documentos
const tiposDocumentos = ref([
  { tipo: "Contratos", cantidad: 89, color: "blue" },
  { tipo: "Informes", cantidad: 76, color: "green" },
  { tipo: "Solicitudes", cantidad: 65, color: "purple" },
  { tipo: "Resoluciones", cantidad: 54, color: "orange" },
  { tipo: "Memorandums", cantidad: 43, color: "red" },
  { tipo: "Oficios", cantidad: 32, color: "teal" },
]);

// Calcular totales
const totalDocumentos = computed(() => {
  return tiposDocumentos.value.reduce((sum, item) => sum + item.cantidad, 0);
});

const maxDocumentos = computed(() => {
  return Math.max(...ultimos7Dias.value.map((item) => item.documentos));
});
</script>

<template>
  <div class="reportes">
    <!-- Header -->
    <div class="header">
      <h1><i class="fas fa-chart-bar"></i> Reportes</h1>
      <p>Análisis y estadísticas del sistema documental</p>
    </div>

    <!-- Contenido Principal -->
    <div class="main-content">
      <!-- Columna Izquierda: Últimos 7 días -->
      <div class="column">
        <div class="card">
          <div class="card-header">
            <h2><i class="fas fa-calendar-week"></i> Últimos 7 Días</h2>
          </div>
          <div class="card-content">
            <div class="grafico-barras">
              <div
                v-for="(dia, index) in ultimos7Dias"
                :key="index"
                class="barra-container"
              >
                <div class="barra-info">
                  <span class="dia">{{ dia.dia }}</span>
                  <span class="cantidad">{{ dia.documentos }}</span>
                </div>
                <div class="barra">
                  <div
                    class="barra-fill"
                    :style="{
                      height: `${(dia.documentos / maxDocumentos) * 100}%`,
                    }"
                    :class="`color-${index % 7}`"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Columna Central: Documentos por Área -->
      <div class="column">
        <div class="card">
          <div class="card-header">
            <h2><i class="fas fa-sitemap"></i> Documentos por Área</h2>
          </div>
          <div class="card-content">
            <div class="distribucion-lista">
              <div
                v-for="(area, index) in documentosPorArea"
                :key="index"
                class="distribucion-item"
              >
                <div class="distribucion-info">
                  <span class="distribucion-nombre">{{ area.area }}</span>
                  <span class="distribucion-cantidad">{{ area.cantidad }}</span>
                </div>
                <div class="distribucion-bar">
                  <div
                    class="distribucion-fill"
                    :style="{ width: `${area.porcentaje}%` }"
                    :class="`color-${index % 6}`"
                  ></div>
                </div>
                <span class="distribucion-porcentaje"
                  >{{ area.porcentaje }}%</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Columna Derecha: Tipos de Documentos -->
      <div class="column">
        <div class="card">
          <div class="card-header">
            <h2><i class="fas fa-file-alt"></i> Tipos de Documentos</h2>
          </div>
          <div class="card-content">
            <div class="tipos-lista">
              <div
                v-for="(tipo, index) in tiposDocumentos"
                :key="index"
                class="tipo-item"
              >
                <div class="tipo-icon" :class="tipo.color">
                  <i class="fas fa-file"></i>
                </div>
                <div class="tipo-info">
                  <span class="tipo-nombre">{{ tipo.tipo }}</span>
                  <span class="tipo-cantidad"
                    >{{ tipo.cantidad }} documentos</span
                  >
                </div>
                <div class="tipo-porcentaje">
                  {{ Math.round((tipo.cantidad / totalDocumentos) * 100) }}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reportes {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 20px;
}

/* Header */
.header {
  background: white;
  border-radius: 12px;
  padding: 25px 30px;
  margin-bottom: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #3498db;
}

.header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.header p {
  color: #718096;
  font-size: 16px;
  margin: 0;
}

/* Contenido Principal */
.main-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
}

.column {
  display: flex;
  flex-direction: column;
}

/* Tarjetas */
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  flex: 1;
}

.card-header {
  padding: 20px 25px;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
}

.card-header h2 {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.card-content {
  padding: 25px;
}

/* Gráfico de Barras - Últimos 7 Días */
.grafico-barras {
  display: flex;
  align-items: end;
  justify-content: space-between;
  height: 200px;
  gap: 10px;
}

.barra-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.barra-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.dia {
  font-size: 12px;
  font-weight: 600;
  color: #4a5568;
  text-transform: uppercase;
}

.cantidad {
  font-size: 14px;
  font-weight: 700;
  color: #2c3e50;
}

.barra {
  width: 30px;
  height: 120px;
  background: #edf2f7;
  border-radius: 6px 6px 0 0;
  position: relative;
  overflow: hidden;
}

.barra-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 6px 6px 0 0;
  transition: height 0.8s ease;
}

/* Colores para las barras */
.color-0 {
  background: linear-gradient(to top, #3498db, #2980b9);
}
.color-1 {
  background: linear-gradient(to top, #2ecc71, #27ae60);
}
.color-2 {
  background: linear-gradient(to top, #9b59b6, #8e44ad);
}
.color-3 {
  background: linear-gradient(to top, #e67e22, #d35400);
}
.color-4 {
  background: linear-gradient(to top, #e74c3c, #c0392b);
}
.color-5 {
  background: linear-gradient(to top, #1abc9c, #16a085);
}
.color-6 {
  background: linear-gradient(to top, #f39c12, #e67e22);
}

/* Distribución por Área */
.distribucion-lista {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.distribucion-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.distribucion-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 180px;
  gap: 10px;
}

.distribucion-nombre {
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
  flex: 1;
}

.distribucion-cantidad {
  font-size: 12px;
  font-weight: 600;
  color: #718096;
  background: #f7fafc;
  padding: 2px 8px;
  border-radius: 8px;
}

.distribucion-bar {
  flex: 1;
  height: 8px;
  background: #edf2f7;
  border-radius: 4px;
  overflow: hidden;
}

.distribucion-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.8s ease;
}

.distribucion-porcentaje {
  font-size: 12px;
  font-weight: 600;
  color: #2c3e50;
  width: 35px;
  text-align: right;
}

/* Tipos de Documentos */
.tipos-lista {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tipo-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px;
  border-radius: 8px;
  background: #f8fafc;
  transition: all 0.3s ease;
}

.tipo-item:hover {
  background: #edf2f7;
  transform: translateX(4px);
}

.tipo-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
}

.tipo-icon.blue {
  background: linear-gradient(135deg, #3498db, #2980b9);
}
.tipo-icon.green {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
}
.tipo-icon.purple {
  background: linear-gradient(135deg, #9b59b6, #8e44ad);
}
.tipo-icon.orange {
  background: linear-gradient(135deg, #e67e22, #d35400);
}
.tipo-icon.red {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
}
.tipo-icon.teal {
  background: linear-gradient(135deg, #1abc9c, #16a085);
}

.tipo-info {
  flex: 1;
}

.tipo-nombre {
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
  display: block;
  margin-bottom: 2px;
}

.tipo-cantidad {
  font-size: 12px;
  color: #718096;
}

.tipo-porcentaje {
  font-size: 14px;
  font-weight: 700;
  color: #2c3e50;
  background: white;
  padding: 4px 10px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

/* Responsive */
@media (max-width: 1200px) {
  .main-content {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .reportes {
    padding: 15px;
  }

  .main-content {
    grid-template-columns: 1fr;
  }

  .header {
    padding: 20px;
  }

  .header h1 {
    font-size: 24px;
  }

  .grafico-barras {
    height: 150px;
  }

  .barra {
    width: 25px;
    height: 100px;
  }

  .distribucion-info {
    width: 140px;
  }
}

@media (max-width: 480px) {
  .reportes {
    padding: 10px;
  }

  .card-content {
    padding: 20px;
  }

  .distribucion-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .distribucion-info {
    width: 100%;
  }

  .distribucion-bar {
    width: 100%;
  }

  .tipo-item {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }

  .tipo-info {
    text-align: center;
  }
}
</style>
