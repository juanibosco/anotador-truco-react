# Anotador de Truco / React JS

Este proyecto es un anotador digital para el juego de cartas **Truco** desarrollado con [React](https://react.dev/) y [Vite](https://vitejs.dev/). Permite llevar la cuenta de los puntos de dos equipos ("Nosotros" y "Ellos") y funciona como una aplicación web progresiva (PWA).

## Características

- Registro de puntos para ambos equipos con botones para sumar o restar.
- Persistencia automática usando **localStorage**.
- Animación de confeti cuando un equipo alcanza 30 puntos.
- Indicadores visuales en forma de "cerillas" para representar los puntos obtenidos.
- Modal de confirmación para reiniciar la partida.
- Configuración de PWA incluida mediante `vite-plugin-pwa`.

## Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior.
- [npm](https://www.npmjs.com/) (se instala junto con Node.js).

## Instalación

Clona el repositorio e instala las dependencias:

```bash
npm install
```

### Servidor de desarrollo

Inicia el proyecto en modo desarrollo con recarga en caliente:

```bash
npm run dev
```

### Generar build de producción

```bash
npm run build
```

Una vez finalizada la compilación puedes hacer una vista previa local con:

```bash
npm run preview
```

## Estructura del proyecto

- `index.html`: punto de entrada principal.
- `src/` contiene los archivos de React.
  - `App.jsx`: componente principal con la lógica del anotador.
  - `main.jsx`: monta la aplicación en el DOM.
  - `index.css`: estilos generales.
- `public/` contiene los recursos estáticos (iconos, imágenes, etc.).
- `vite.config.js`: configuración de Vite junto al plugin PWA.

## Scripts disponibles

```json
"dev": "vite",
"build": "vite build",
"lint": "eslint .",
"preview": "vite preview"
```

## Licencia

Distribuido bajo la [GNU General Public License v3.0](LICENSE).

## Autor

Desarrollado por [Juani Bosco](https://instagram.com/juanibosco).
