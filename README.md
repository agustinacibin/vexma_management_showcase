# VEXMA Management  
Sistema de Gestión Integral para Agencia de Automóviles  

VEXMA Management es una aplicación full-stack desarrollada para la gestión administrativa de una agencia de autos.  
Permite administrar vehículos, titulares, actividades, documentación y estados de venta, con autenticación segura mediante JWT.

---

## Tecnologías Utilizadas

Backend
- Java 21
- Spring Boot
- Spring Data JPA (Hibernate)
- Spring Security + JWT
- MySQL
- Maven

Frontend
- React (Vite)
- React Router
- Axios
- React Icons
- CSS personalizado

---

## Arquitectura del Proyecto

El proyecto está dividido en dos módulos principales:

```

VEXMA/
│
├── backend-vexma/
│   ├── model/
│   ├── dtos/
│   ├── repository/
│   ├── service/
│   ├── controller/
│   ├── security/
│   └── config/
│
└── frontend-vexma/
├── pages/
├── services/
├── css/
└── App.jsx

```

---

## Seguridad

El sistema utiliza autenticación basada en JWT:

1. Login mediante `/auth/login`
2. Generación de token firmado (HS256)
3. Token almacenado en `localStorage`
4. Header automático:
```

Authorization: Bearer <token>

```
5. Filtro JWT en backend valida cada request protegida.

Endpoints protegidos:

`/api/**`

---

## Funcionalidades Principales

### Gestión de Vehículos
- Alta, edición y eliminación
- Asociación obligatoria a titular
- Estado automático:
  - En agencia
  - Vendido
- Reingreso de vehículo
- Cálculo automático de antigüedad
- Capital total invertido

### Gestión de Titulares
- Alta, edición y eliminación
- Validación de datos obligatorios
- Asociación 1:N con vehículos

### Gestión de Actividades
- Registro de gastos por vehículo
- Estado pendiente/finalizado
- Impacto en capital total

### Documentación
- Registro único por vehículo
- Control de múltiples documentos con fechas

---

## Base de Datos

Nombre por defecto:
```
vexma_db
```

Crear manualmente:

```sql
CREATE DATABASE vexma_db;
````

Configuración en `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/vexma_db
spring.datasource.username=root
spring.datasource.password=tu_password
spring.jpa.hibernate.ddl-auto=update
```

---

## Cómo Ejecutar el Proyecto

### Backend

```bash
cd backend-vexma
./mvnw spring-boot:run
```

Servidor en:

```
http://localhost:8080
```

---

### Frontend

```bash
cd frontend-vexma
npm install
npm run dev
```

Servidor en:

```
http://localhost:5173
```

---

## Flujo General de Construcción (Backend)

1. Creación de entidades JPA (model)
2. Definición de DTO de Vehiculo con validaciones
3. Creación de repositorios (JpaRepository)
4. Implementación de lógica de negocio en Services
5. Exposición de endpoints REST en Controllers
6. Configuración de seguridad y CORS

---

## Reglas de Negocio Destacadas

* El año del vehículo no puede ser mayor al actual.
* La fecha de ingreso no puede ser anterior al año del vehículo.
* No se puede vender con fecha futura.
* Un vehículo debe tener titular obligatorio.
* Una documentación por vehículo (upsert automático).

---

## Conceptos Aplicados

* Arquitectura en capas
* Principio de separación de responsabilidades
* Relaciones JPA:

  * `@ManyToOne`
  * `@OneToMany`
  * `@OneToOne`
* Validaciones con Bean Validation
* Manejo de excepciones con ResponseEntity
* Interceptores Axios
* Protección de rutas en frontend (PrivateRoute)

---

## Mejoras Futuras

* Roles (ADMIN / VENDEDOR)
* Paginación y filtros
* Reportes PDF/Excel
* Dashboard analítico

---

## Autor

María Agustina Cibin
Ingeniería de Software
Proyecto profesional y de portfolio.

