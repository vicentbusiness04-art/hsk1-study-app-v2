# HSK1 Study App V2 (Versión Avanzada) 🇨🇳🚀

Una aplicación interactiva y completa para dominar el examen HSK1. Esta versión incluye **audio**, **ejercicios de lectura** y un diseño más avanzado.

## 🔊 Sistema de Audio (TTS)

La aplicación utiliza el motor **Youdao TTS** para generar la pronunciación del mandarín. 

> **Nota:** El sistema de audio está en fase de refinamiento. Debido a restricciones de red, políticas de "Auto-play" de los navegadores o limitaciones del servidor externo, la reproducción puede no ser 100% estable en todos los dispositivos.

**Detalles técnicos:**
- **Motor principal:** Youdao DictVoice API.
- **Formato:** Streaming de audio MP3 dinámico.
- **Estado:** Funcional para palabras sueltas y frases cortas. Las frases muy largas pueden presentar retardos o bloqueos dependiendo de la conexión.

Si el audio no suena, asegúrate de haber interactuado (clic) con la página al menos una vez para otorgar permisos de reproducción al navegador.

## 🚀 Cómo poner en marcha la aplicación

Sigue estos pasos en orden para ejecutar la app en tu ordenador:

### 1. Instalar Node.js (El motor)
Para que esta aplicación funcione, necesitas **Node.js**. 
- **Descárgalo aquí:** [https://nodejs.org/](https://nodejs.org/) (Haz clic en el botón que dice **"LTS"**).
- Instálalo como cualquier otro programa. Si ya lo tienes, salta al siguiente paso.

### 2. Descargar los archivos
Si no tienes el código en tu ordenador, pulsa el siguiente enlace para descargar esta versión avanzada:
- 📥 [**Descargar Proyecto V2 (ZIP)**](https://github.com/vicentbusiness04-art/hsk1-study-app-v2/archive/refs/heads/main.zip)

**Importante:** Una vez descargado, haz clic derecho sobre el archivo y elige **"Extraer todo"**. Entra en la carpeta extraída llamada `hsk1-study-app-v2`.

### 3. Abrir la consola (Terminal)
Debes abrir la terminal **dentro** de la carpeta que acabas de extraer:
- **En Windows:** Abre la carpeta, haz clic en la **barra de direcciones** (arriba, donde sale la ruta de la carpeta), borra todo, escribe `cmd` y pulsa **Enter**. [Ver imagen de ejemplo](https://winaero.com/blog/wp-content/uploads/2017/12/Windows-10-Explorer-address-bar-cmd.png)
- **En Mac:** Haz clic derecho sobre la carpeta y elige "Nuevo terminal en la carpeta".

### 4. Comandos de instalación
En la ventana negra que se ha abierto, escribe estos dos comandos (pulsa Enter tras cada uno):

1. **Instalar piezas:** (Solo la primera vez)
   ```bash
   npm install
   ```
2. **Arrancar App:**
   ```bash
   npm run dev
   ```

### 5. ¡A estudiar!
Cuando la terminal te dé un enlace, abre tu navegador y ve a:
👉 [**http://localhost:5173**](http://localhost:5173)

---

## 🌟 Novedades de la V2
- **🔊 Audio Integrado:** Escucha la pronunciación de cada palabra.
- **📖 Examen de Lectura:** 4 partes completas (Verdadero/Falso, Emparejar, Opción Múltiple y Rellenar huecos).
- **🎨 Interfaz Mejorada:** Animaciones fluidas y diseño más moderno.
- **Quiz Avanzado:** Sistema de preguntas mejorado.

---
*Desarrollado con React + Vite + Tailwind CSS + Framer Motion.*