<script setup lang="ts">
import { BACKEND_URL } from "~/config/api";
import { useUseStore, type UserResponse } from "~/stores/user";

const userStore = useUseStore();
const router = useRouter();

// Estados del formulario
const isLogin = ref(true);
const isLoading = ref(false);

// Datos del formulario
const form = ref({
  dni: "",
  name: "",
  password: "",
  confirmPassword: "",
});

// Validaciones
const errors = ref({
  dni: "",
  name: "",
  password: "",
  confirmPassword: "",
});

const validateDNI = (dni: string) => {
  if (!dni) return "El DNI es requerido";
  if (!/^\d{8}$/.test(dni)) return "El DNI debe tener 8 dígitos";
  return "";
};

const validateName = (name: string) => {
  if (!isLogin.value && !name) return "El nombre es requerido";
  if (!isLogin.value && name.length < 2)
    return "El nombre debe tener al menos 2 caracteres";
  return "";
};

const validatePassword = (password: string) => {
  if (!password) return "La contraseña es requerida";
  if (password.length < 6)
    return "La contraseña debe tener al menos 6 caracteres";
  return "";
};

const validateConfirmPassword = (confirmPassword: string) => {
  if (!isLogin.value && !confirmPassword) return "Confirme la contraseña";
  if (!isLogin.value && confirmPassword !== form.value.password)
    return "Las contraseñas no coinciden";
  return "";
};

const validateForm = () => {
  errors.value = {
    dni: validateDNI(form.value.dni),
    name: validateName(form.value.name),
    password: validatePassword(form.value.password),
    confirmPassword: validateConfirmPassword(form.value.confirmPassword),
  };

  return !Object.values(errors.value).some((error) => error !== "");
};

// Simulación de login/registro
const handleSubmit = async () => {
  if (!validateForm()) return;

  isLoading.value = true;

  try {
    // Aquí iría la llamada a tu API
    if (isLogin.value) {
      // Lógica de login
      console.log("Login attempt:", {
        dni: form.value.dni,
        password: form.value.password,
      });

      // "http://locahost:8000/auth/login"
      const result = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dni: form.value.dni,
          password: form.value.password,
        }),
      });

      const data = await result.json();

      if (result.status === 200) {
        userStore.changeUser(data as UserResponse);
        localStorage.setItem("token", (data as UserResponse).token);
        router.push("/");
      } else {
        alert(data.message || "Ocurrio un error");
      }
    } else {
      // Lógica de registro
      console.log("Register attempt:", {
        dni: form.value.dni,
        name: form.value.name,
        password: form.value.password,
      });

      // Simular delay de red
      const result = await fetch(`${BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dni: form.value.dni,
          name: form.value.name,
          password: form.value.password,
        }),
      });

      if (result.status === 201) alert("Se creó tu cuenta");
      else {
        const data = await result.json();
        alert(data.message || "Ocurrio un error");
      }

      // Cambiar a login después del registro exitoso
      isLogin.value = true;
      resetForm();
    }
  } catch (error) {
    console.error("Error en la autenticación:", error);
  } finally {
    isLoading.value = false;
  }
};

const resetForm = () => {
  form.value = {
    dni: "",
    name: "",
    password: "",
    confirmPassword: "",
  };
  errors.value = {
    dni: "",
    name: "",
    password: "",
    confirmPassword: "",
  };
};

const toggleMode = () => {
  isLogin.value = !isLogin.value;
  resetForm();
};
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <!-- Header -->
      <div class="auth-header">
        <div class="logo">
          <i class="fas fa-folder-open"></i>
          <h1>SIGE-GIDU</h1>
        </div>
        <p class="institution">Municipalidad Provincial de Chopén</p>
        <h2>{{ isLogin ? "Iniciar Sesión" : "Crear Cuenta" }}</h2>
        <p class="auth-description">
          {{
            isLogin
              ? "Ingresa a tu cuenta para gestionar documentos"
              : "Regístrate para acceder al sistema documental"
          }}
        </p>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="handleSubmit" class="auth-form">
        <!-- Campo DNI -->
        <div class="form-group">
          <label for="dni" class="required">DNI</label>
          <input
            id="dni"
            v-model="form.dni"
            type="text"
            maxlength="8"
            placeholder="Ingresa tu DNI (8 dígitos)"
            :class="{ error: errors.dni }"
            @blur="errors.dni = validateDNI(form.dni)"
          />
          <span v-if="errors.dni" class="error-message">{{ errors.dni }}</span>
        </div>

        <!-- Campo Nombre (solo en registro) -->
        <div v-if="!isLogin" class="form-group">
          <label for="name" class="required">Nombre Completo</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            placeholder="Ingresa tu nombre completo"
            :class="{ error: errors.name }"
            @blur="errors.name = validateName(form.name)"
          />
          <span v-if="errors.name" class="error-message">{{
            errors.name
          }}</span>
        </div>

        <!-- Campo Contraseña -->
        <div class="form-group">
          <label for="password" class="required">Contraseña</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="Ingresa tu contraseña"
            :class="{ error: errors.password }"
            @blur="errors.password = validatePassword(form.password)"
          />
          <span v-if="errors.password" class="error-message">{{
            errors.password
          }}</span>
        </div>

        <!-- Campo Confirmar Contraseña (solo en registro) -->
        <div v-if="!isLogin" class="form-group">
          <label for="confirmPassword" class="required"
            >Confirmar Contraseña</label
          >
          <input
            id="confirmPassword"
            v-model="form.confirmPassword"
            type="password"
            placeholder="Confirma tu contraseña"
            :class="{ error: errors.confirmPassword }"
            @blur="
              errors.confirmPassword = validateConfirmPassword(
                form.confirmPassword
              )
            "
          />
          <span v-if="errors.confirmPassword" class="error-message">{{
            errors.confirmPassword
          }}</span>
        </div>

        <!-- Botón de envío -->
        <button type="submit" class="submit-btn" :disabled="isLoading">
          <span v-if="isLoading" class="loading">
            <i class="fas fa-spinner fa-spin"></i>
            Procesando...
          </span>
          <span v-else>
            {{ isLogin ? "Iniciar Sesión" : "Crear Cuenta" }}
          </span>
        </button>
      </form>

      <!-- Enlace para cambiar entre login/registro -->
      <div class="auth-footer">
        <p>
          {{ isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?" }}
          <button type="button" @click="toggleMode" class="toggle-btn">
            {{ isLogin ? "Regístrate" : "Inicia Sesión" }}
          </button>
        </p>
      </div>

      <!-- Información adicional -->
      <div class="auth-info">
        <div class="info-item">
          <i class="fas fa-shield-alt"></i>
          <span>Sistema seguro y confiable</span>
        </div>
        <div class="info-item">
          <i class="fas fa-clock"></i>
          <span>Acceso 24/7</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.auth-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  padding: 40px;
  width: 100%;
  max-width: 440px;
  position: relative;
  overflow: hidden;
}

.auth-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #3498db, #2980b9);
}

.auth-header {
  text-align: center;
  margin-bottom: 30px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 8px;
}

.logo i {
  font-size: 32px;
  color: #3498db;
}

.logo h1 {
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.institution {
  color: #718096;
  font-size: 14px;
  margin: 0 0 20px 0;
}

.auth-header h2 {
  font-size: 24px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 8px 0;
}

.auth-description {
  color: #718096;
  font-size: 14px;
  margin: 0;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
}

label.required::after {
  content: " *";
  color: #e74c3c;
}

input {
  padding: 14px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: #f8fafc;
}

input:focus {
  outline: none;
  border-color: #3498db;
  background: white;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

input.error {
  border-color: #e74c3c;
  background: rgba(231, 76, 60, 0.02);
}

input.error:focus {
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}

.error-message {
  font-size: 12px;
  color: #e74c3c;
  font-weight: 500;
}

.submit-btn {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.submit-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #2980b9, #2471a3);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.auth-footer {
  text-align: center;
  margin: 25px 0;
  padding-top: 25px;
  border-top: 1px solid #e2e8f0;
}

.auth-footer p {
  color: #718096;
  font-size: 14px;
  margin: 0;
}

.toggle-btn {
  background: none;
  border: none;
  color: #3498db;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  margin-left: 4px;
}

.toggle-btn:hover {
  color: #2980b9;
}

.auth-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #718096;
  font-size: 13px;
}

.info-item i {
  color: #3498db;
  width: 16px;
}

/* Responsive */
@media (max-width: 480px) {
  .auth-container {
    padding: 15px;
  }

  .auth-card {
    padding: 30px 25px;
  }

  .logo h1 {
    font-size: 24px;
  }

  .auth-header h2 {
    font-size: 20px;
  }

  input {
    padding: 12px 14px;
  }

  .submit-btn {
    padding: 14px;
  }
}

@media (max-width: 360px) {
  .auth-card {
    padding: 25px 20px;
  }

  .logo {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
