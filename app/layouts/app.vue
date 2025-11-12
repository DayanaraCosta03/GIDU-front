<script setup></script>

<template>
  <!-- HEADER -->
  <header>
    <div class="header-container">
      <div class="logo">
        <img src="/images/logo.jpg" alt="Logo GIDU" />
        <div class="info">
          <h1>SIGE-GIDU</h1>
          <p>Municipalidad Provincial de Chepén</p>
        </div>
      </div>

      <nav>
        <NuxtLink to="/">Inicio</NuxtLink>
        <NuxtLink to="/expedientes">Expedientes</NuxtLink>
        <NuxtLink to="/configuracion">Configuración</NuxtLink>
      </nav>

      <div class="user">
        <img
          src="https://ui-avatars.com/api/?name=U&background=0D8ABC&color=fff"
          alt="user"
        />
        <span>Usuario</span>
      </div>
    </div>
  </header>

  <!-- MAIN -->
  <UMain>
    <slot />
  </UMain>

  <!-- FOOTER -->
  <UFooter>
    <div class="footer-container">
      <p>&copy; 2025 SIGE-GIDU. Todos los derechos reservados.</p>
    </div>
  </UFooter>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
  color: #1e293b;
  font-family: "Inter", sans-serif;
}

/* ===== HEADER ===== */
header {
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo img {
  height: 40px;
  width: auto;
}

.logo .info h1 {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  color: #1e3a8a;
}

.logo .info p {
  font-size: 12px;
  color: #64748b;
  margin: 0;
}

/* ===== NAV ===== */
nav {
  display: flex;
  align-items: center;
  gap: 20px;
}

nav a {
  text-decoration: none;
  color: #334155;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s ease;
}

nav a:hover {
  color: #2563eb;
}

/* ===== USER ===== */
.user {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user img {
  height: 36px;
  width: 36px;
  border-radius: 50%;
  border: 2px solid #0d8abc;
}

.user span {
  font-size: 14px;
  color: #334155;
  font-weight: 500;
}

/* ===== MAIN ===== */
main {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

/* ===== FOOTER ===== */
footer {
  background: #0f172a;
  color: #cbd5e1;
  padding: 16px 24px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.footer-links {
  display: flex;
  gap: 16px;
}

.footer-links a {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: #ffffff;
}
</style>
