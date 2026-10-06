/* ==========================================================================
   PcLab Academy - Lógica Interactiva (main.js)
   Control de Modal de Datos Personales, Pestañas de Pago (Tarjeta/PayPal) y Parámetros
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Leer parámetros de la URL (si vienen de cursos.html)
  const urlParams = new URLSearchParams(window.location.search);
  const cursoParam = urlParams.get('curso');
  const precioParam = urlParams.get('precio');

  const resumenCursoEl = document.getElementById('resumen-nombre-curso');
  const resumenPrecioEl = document.getElementById('resumen-precio-curso');
  const resumenTotalEl = document.getElementById('resumen-total-pago');

  if (cursoParam && resumenCursoEl) {
    // Formatear el nombre del curso
    const nombreFormateado = cursoParam.replace(/-/g, ' ');
    resumenCursoEl.textContent = nombreFormateado;
  }

  if (precioParam && resumenPrecioEl && resumenTotalEl) {
    resumenPrecioEl.textContent = `$${precioParam} USD`;
    resumenTotalEl.textContent = `$${precioParam} USD`;
  }

  // 2. Control de Ventana Modal de Datos Personales
  const modalOverlay = document.getElementById('modal-datos-personales');
  const btnAbrirModal = document.getElementById('btn-abrir-modal');
  const btnCerrarModal = document.getElementById('btn-cerrar-modal');
  const formDatosPersonales = document.getElementById('form-datos-personales');
  const resumenDatosEstudiante = document.getElementById('datos-estudiante-preview');

  if (btnAbrirModal && modalOverlay) {
    btnAbrirModal.addEventListener('click', () => {
      modalOverlay.classList.add('active');
    });
  }

  if (btnCerrarModal && modalOverlay) {
    btnCerrarModal.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  // Cerrar al hacer click fuera del cuadro modal
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  // Procesar guardado de datos personales
  if (formDatosPersonales) {
    formDatosPersonales.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('input-nombre').value;
      const email = document.getElementById('input-email').value;
      const telefono = document.getElementById('input-telefono').value;

      if (resumenDatosEstudiante) {
        resumenDatosEstudiante.innerHTML = `
          <div style="background-color: rgb(243, 229, 245); border-left: 4px solid rgb(106, 27, 154); padding: 12px; border-radius: 6px; margin-top: 10px;">
            <p><strong>Estudiante:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${telefono}</p>
            <span style="display:inline-block; font-size:0.8rem; color:rgb(106, 27, 154); font-weight:bold; margin-top:5px;">✓ Datos confirmados con éxito</span>
          </div>
        `;
      }

      modalOverlay.classList.remove('active');
      alert(`¡Datos guardados correctamente para ${nombre}! Ahora puedes proceder a seleccionar tu método de pago.`);
    });
  }

  // 3. Alternar entre Métodos de Pago: Tarjeta de Crédito vs PayPal
  const tabTarjeta = document.getElementById('tab-tarjeta');
  const tabPaypal = document.getElementById('tab-paypal');
  const formTarjeta = document.getElementById('form-tarjeta-pago');
  const vistaPaypal = document.getElementById('vista-paypal-pago');

  if (tabTarjeta && tabPaypal && formTarjeta && vistaPaypal) {
    tabTarjeta.addEventListener('click', () => {
      tabTarjeta.classList.add('active');
      tabPaypal.classList.remove('active');
      formTarjeta.style.display = 'block';
      vistaPaypal.style.display = 'none';
    });

    tabPaypal.addEventListener('click', () => {
      tabPaypal.classList.add('active');
      tabTarjeta.classList.remove('active');
      formTarjeta.style.display = 'none';
      vistaPaypal.style.display = 'block';
    });
  }

  // 4. Manejo de Envíos de Pago Simulados
  if (formTarjeta) {
    formTarjeta.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('¡Pago con Tarjeta de Crédito procesado con éxito! Bienvenido a PcLab Academy.');
    });
  }

  const btnPaypalAction = document.getElementById('btn-paypal-action');
  if (btnPaypalAction) {
    btnPaypalAction.addEventListener('click', () => {
      alert('Redirigiendo de forma segura a la pasarela oficial de PayPal...');
    });
  }
});
