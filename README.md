# 🏦 Proyecto Frontend — Prueba Técnica (Next.js + Tailwind + Componentes UI)

Este proyecto es una **prueba técnica frontend** construida con **Next.js **, **React**, **Tailwind CSS**, y una arquitectura basada en **componentes reutilizables (atoms, molecules, organisms)**.

El objetivo es implementar una interfaz bancaria sencilla con:

- Sidebar dinámico
- Vista de Dashboard
- Vista de Transferencias con **formulario paso a paso (stepper)**
- Confirmación de transferencia mediante modal
- Componentes reusables (cards, inputs, selectors, icon buttons, etc.)

## 🚀 Tecnologías utilizadas

| Tecnología | Uso |
|-----------|-----|
| **Next.js (App Router)** | Renderizado del lado del servidor y cliente |
| **React** | UI + estado local |
| **Tailwind CSS** | Sistema de estilos |
| **Lucide Icons** | Iconografía ligera |
| **TypeScript** | Tipado robusto en todo el proyecto |
| **Arquitectura Atómica** | Organización de componentes |

## 🧱 Arquitectura del proyecto

El proyecto sigue principios de **Atomic Design**:

```
src/
 ├── app/
 │    ├── page.tsx
 │    ├── dashboard/
 │    ├── transfers/
 │    └── layout.tsx
 │
 ├── components/
 │    ├── atoms/
 │    ├── molecules/
 │    ├── organisms/
 │
 ├── hooks/
 │    └── useTransferForm.ts
 │
 ├── context/
 │    └── UserContext.tsx
 │
 ├── styles/
 │    └── globals.css
```

## 💸 Flujo principal: Transferencias

Incluye un formulario paso a paso:

1. Cuenta origen
2. Cuenta destino
3. Monto
4. Datos adicionales

Y un modal de confirmación de transferencia.

## ⚙️ Instalación y ejecución

```bash
npm install
npm run dev
```

Abrir en:

```
http://localhost:3000
```

## 🧪 Funcionalidades incluidas

- Validación de saldo y monto
- Modal de confirmación
- Stepper visual
- Componentes reutilizables

