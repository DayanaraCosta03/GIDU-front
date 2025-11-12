<script setup lang="ts">
definePageMeta({
  layout: "app",
});

const navigateToCreate = () => {
  navigateTo("/expedientes/create");
};

// Datos de ejemplo para mostrar en la tabla
const expedientes = [
  {
    id: 1,
    numeroExpediente: "EXP-2024-001",
    fechaEntrada: "2024-01-15",
    fechaSalida: "2024-01-20",
    horaSalida: "14:30",
    remitente: "Juan Pérez García",
    area: "Administración",
    asunto: "Solicitud de materiales de oficina",
    folios: 5,
    estado: "activo",
  },
  {
    id: 2,
    numeroExpediente: "EXP-2024-002",
    fechaEntrada: "2024-01-16",
    fechaSalida: "",
    horaSalida: "",
    remitente: "María López Ruiz",
    area: "Recursos Humanos",
    asunto: "Contratación de personal temporal",
    folios: 8,
    estado: "pendiente",
  },
];

// Definir el tipo para los estados
type EstadoType = "activo" | "pendiente" | "archivado";

const getEstadoBadge = (estado: string) => {
  const estados: Record<EstadoType, { clase: string; texto: string }> = {
    activo: { clase: "estado-activo", texto: "Activo" },
    pendiente: { clase: "estado-pendiente", texto: "Pendiente" },
    archivado: { clase: "estado-archivado", texto: "Archivado" },
  };

  // Verificar si el estado es válido, si no, usar 'pendiente' por defecto
  const estadoValido = estados[estado as EstadoType];
  return estadoValido || estados.pendiente;
};
</script>

<template>
  <div class="container">
    <div class="content">
      <div class="action-bar">
        <h2>Lista de Expedientes</h2>
        <button @click="navigateToCreate" class="btn-primary">
          <i class="fas fa-plus"></i> Registrar Expediente
        </button>
      </div>

      <div class="table-container">
        <table class="documents-table">
          <thead>
            <tr>
              <th class="text-left">N° Expediente</th>
              <th class="text-left">Fecha Entrada</th>
              <th class="text-left">Fecha Salida</th>
              <th class="text-left">Remitente</th>
              <th class="text-left">Área</th>
              <th class="text-left">Asunto</th>
              <th class="text-left">Folios</th>
              <th class="text-left">Estado</th>
              <th class="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="expedientes.length === 0" class="no-data">
              <td colspan="9">
                <div class="empty-state">
                  <i class="fas fa-inbox"></i>
                  <p>
                    No hay expedientes registrados. Haz clic en "Registrar
                    Expediente" para agregar uno.
                  </p>
                </div>
              </td>
            </tr>
            <tr
              v-else
              v-for="expediente in expedientes"
              :key="expediente.id"
              class="table-row"
            >
              <td class="font-semibold text-blue-600">
                {{ expediente.numeroExpediente }}
              </td>
              <td>{{ expediente.fechaEntrada }}</td>
              <td>{{ expediente.fechaSalida || "-" }}</td>
              <td class="truncate max-w-xs">{{ expediente.remitente }}</td>
              <td>
                <span class="area-badge">{{ expediente.area }}</span>
              </td>
              <td class="truncate max-w-sm">{{ expediente.asunto }}</td>
              <td class="text-center">{{ expediente.folios }}</td>
              <td>
                <span
                  :class="[
                    'estado-badge',
                    getEstadoBadge(expediente.estado).clase,
                  ]"
                >
                  {{ getEstadoBadge(expediente.estado).texto }}
                </span>
              </td>
              <td>
                <div class="actions">
                  <button class="btn-action btn-edit" title="Editar">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn-action btn-delete" title="Eliminar">
                    <i class="fas fa-trash"></i>
                  </button>
                  <button class="btn-action btn-view" title="Ver detalles">
                    <i class="fas fa-eye"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.header h1 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.header p {
  opacity: 0.9;
  font-size: 16px;
}

.content {
  padding: 30px;
}

.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.action-bar h2 {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
}

.btn-primary {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 10px rgba(39, 174, 96, 0.3);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #27ae60, #219653);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(39, 174, 96, 0.4);
}

.table-container {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.documents-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.documents-table th {
  background: #f8fafc;
  color: #2c3e50;
  font-weight: 600;
  padding: 16px 12px;
  border-bottom: 2px solid #e2e8f0;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.5px;
}

.documents-table td {
  padding: 16px 12px;
  border-bottom: 1px solid #e2e8f0;
  color: #4a5568;
}

.table-row:hover {
  background-color: #f7fafc;
}

.no-data td {
  padding: 0;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #718096;
}

.empty-state i {
  font-size: 48px;
  margin-bottom: 16px;
  color: #cbd5e0;
}

.empty-state p {
  font-size: 16px;
  max-width: 400px;
  margin: 0 auto;
  line-height: 1.5;
}

.area-badge {
  background: #edf2f7;
  color: #4a5568;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.estado-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.estado-activo {
  background: rgba(46, 204, 113, 0.15);
  color: #27ae60;
}

.estado-pendiente {
  background: rgba(241, 196, 15, 0.15);
  color: #f39c12;
}

.estado-archivado {
  background: rgba(149, 165, 166, 0.15);
  color: #7f8c8d;
}

.actions {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.btn-action {
  padding: 8px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.btn-edit {
  background: rgba(52, 152, 219, 0.1);
  color: #3498db;
}

.btn-edit:hover {
  background: #3498db;
  color: white;
}

.btn-delete {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.btn-delete:hover {
  background: #e74c3c;
  color: white;
}

.btn-view {
  background: rgba(155, 89, 182, 0.1);
  color: #9b59b6;
}

.btn-view:hover {
  background: #9b59b6;
  color: white;
}

/* Responsive */
@media (max-width: 1024px) {
  .container {
    margin: 10px;
    border-radius: 8px;
  }

  .content {
    padding: 20px;
  }

  .documents-table {
    font-size: 13px;
  }

  .documents-table th,
  .documents-table td {
    padding: 12px 8px;
  }
}

@media (max-width: 768px) {
  .action-bar {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }

  .btn-primary {
    width: 100%;
    justify-content: center;
  }

  .table-container {
    overflow-x: auto;
  }

  .documents-table {
    min-width: 800px;
  }
}
</style>
