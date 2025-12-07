# Notas Logísticas

Aplicación web informativa sobre logística desarrollada con HTML, CSS (Bootstrap 5) y JavaScript vanilla. Incluye conceptos fundamentales, métodos, modelos, herramientas interactivas y recursos educativos sobre gestión logística.

Puedes revisarlo <a href="https://lextrack.github.io/NotasLogisticas/" target="_blank">aquí</a>

## Características

### Contenido Educativo

#### Conceptos Básicos de Logística
- Definición y objetivos de la logística
- Papel de la logística en el servicio al cliente
- Distribución física y sus actividades
- Tecnología en la logística moderna (TMS, WMS, SCM)
- Interfaz moderna con cards y accordions interactivos

#### Métodos y Modelos en Logística
- **Cubicaje**: Cálculo de capacidad de carga (volumétrico y dimensional)
- **CEP (Cantidad Económica de Pedido)**: Optimización de costos de inventario
- **Clasificación ABC**: Gestión estratégica de inventario según principio de Pareto
- **Justo a Tiempo (JAT)**: Minimización de inventario y maximización de eficiencia
- **Gestión de Calidad Total (GCT)**: Mejora continua y satisfacción del cliente

#### Conceptos Variados
- Temas adicionales sobre logística y cadena de suministro

### Herramientas Interactivas

#### Glosario
- Más de 100 términos logísticos
- **Búsqueda en tiempo real** con filtrado instantáneo
- Sistema de paginación dinámico
- Contador de resultados de búsqueda
- Función de limpieza de búsqueda

#### Calculadoras Logísticas

1. **Calculadora de Cubicaje**
   - Cálculo dimensional preciso (no volumétrico)
   - Considera distribución física real (largo × ancho × alto)
   - Placeholders con valores de europallet estándar (1.2m × 0.8m × 0.144m)
   - Métricas de eficiencia y aprovechamiento de espacio
   - Muestra espacio utilizado vs desperdiciado

2. **Calculadora CEP (EOQ)**
   - Cálculo de Cantidad Económica de Pedido
   - Optimización de costos de inventario
   - Funciona con cualquier moneda
   - Resultados detallados con análisis de costos

3. **Calculadora VAN/TIR**
   - Evaluación financiera de proyectos logísticos
   - VAN (Valor Actual Neto / NPV)
   - TIR (Tasa Interna de Retorno / IRR) con método Newton-Raphson
   - Tabla detallada de flujos descontados
   - Interpretación automática de resultados

#### FAQ (Preguntas Frecuentes)
- 15 preguntas frecuentes organizadas en 5 categorías:
  - Conceptos Básicos
  - Gestión de Inventarios
  - Transporte y Distribución
  - Tecnología y Sistemas
  - Costos y Eficiencia
- Interfaz con accordion de Bootstrap

### Características de UI/UX

- **Tema Oscuro**: Diseño dark mode para reducir fatiga visual
- **Responsive Design**: Adaptable a móviles, tablets y desktop
- **Accordions Interactivos**: Mejor organización de contenido extenso
- **Cards con Colores Distintivos**: Jerarquía visual clara
- **Alerts Informativos**: Destacan información clave
- **Botón "Volver Arriba"**: Navegación mejorada
- **Contraste Optimizado**: Todos los textos legibles con buen contraste

### Estructura del Proyecto

```
NotasLogisticas/
├── index.html                    # Página principal
├── logisticsBasics.html          # Conceptos básicos
├── logisticsConcepts1.html       # Conceptos variados
├── methodsmodelsLogistics.html   # Métodos y modelos
├── glossary.html                 # Glosario con búsqueda
├── calculators.html              # Calculadoras interactivas
├── faq.html                      # Preguntas frecuentes
├── css/
│   └── main.css                  # Estilos globales
├── js/
│   ├── script.js                 # Funcionalidad general y glosario
│   └── calculators.js            # Lógica de calculadoras
├── img/                          # Imágenes y recursos
├── screenshots/                  # Capturas de pantalla
└── README.md
```

## Instalación y Uso

1. Clona el repositorio:
```bash
git clone https://github.com/Lextrack/NotasLogisticas.git
```

2. Abre `index.html` en tu navegador preferido

O simplemente visita la versión en vivo: [Notas Logísticas](https://lextrack.github.io/NotasLogisticas/)

## Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Autor

**Lextrack** - [GitHub](https://github.com/Lextrack)
