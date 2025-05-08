# DIPLOMATURA FULL STACK  
## Módulo 4  
### Sprint 6 – Trabajo Final – Front End  

**Alumno:** Alejandro Luna  

---

## Proyecto: Nodo Cine  

### Tecnologías utilizadas:
- Vite  
- React  
- TailwindCSS  
- Flowbite  
- React Toastify  
- SweetAlert  
- React Hook Form  
- Yup  
- JSON Web Token  
- Axios  
- Nodemailer  

---

### Descripción del proyecto:

La plataforma desarrollada permite visualizar un listado de películas y armar una lista de favoritas.  

Cuenta con un sistema de registro de usuarios, en el cual se debe ingresar una dirección de correo electrónico válida. Al registrarse, el usuario recibirá un mail de validación de cuenta. Para esta funcionalidad se utiliza **Nodemailer** y **JSON Web Token (JWT)**.  

Los usuarios no registrados solo pueden acceder a la página de inicio, donde se muestra un top 5 de películas destacadas por ranking, novedades y popularidad.  

Una vez logueado, el usuario debe seleccionar un perfil o crear uno si es su primer ingreso para poder utilizar la plataforma.  

### Niveles de usuario:
- **Usuario general**  
- **Usuario editor**: puede cargar y editar películas  
- **Usuario administrador**: además de las funciones anteriores, puede gestionar cuentas de usuarios  

### Perfiles:
Los perfiles pueden clasificarse según la edad: mayores o menores de 18 años. Dependiendo de esta información, se mostrarán o no las películas catalogadas como contenido para adultos.  

No existe un límite en la cantidad de perfiles por cuenta. Cada perfil puede gestionar su propia lista de películas favoritas.  

### Funcionalidades adicionales:
- Modo oscuro  
- Paginado en el listado de películas  


Deploy en 
https://nextfliks.netlify.app/