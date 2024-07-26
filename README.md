# TODO API

## Tecnologias

- TypeScript
- Express JS
- Firebase Admin
- JWT

Se creo una API con rutas para autenticar, registrar nuevos correos, y un crud para gestionar tareas, la autenticacion se realiza mediante JWT, y la tecnologia para almacenar la informacion a manejar es Firebase.

## Configuracion de variables de entorno para poder correr el proyecto

Hacer una copia de .env.example:
```
cp .env.example .env
```

Rellenar los valores que ahi indica. En el caso de Firebase, crear una Base de datos en dicho servicio, y descargarse el archivo de configuracion .json que Google proporciona, colocar los valores necesarios en el .env para conectar la BD con la API. Para el tema de las IPs o sitios web permitidos, por defecto esta colocada el frontend de Angular en localhost, modificar este campo para colocar las IPs o sitios web que quieres permitir conexion con la API.

### Correr el proyecto

Desarrollo:
```
npm run dev
```

Crear el build de produccion:
```
npm run build
```

Correr el build de produccion:
```
npm start
```

# TODO Frontend

## Tecnologias

- Angular 18
- Angular Material
- Angular Router
- Http Client
- RxJS

Se creo una PWA para consumir la API creada, se utiliza como libreria css Angular Material, para el manejo de las rutas se configuro Angular Router. Para la comunicacion con la API, se crearon dos servicios, uno para manejar los usuarios (autenticacion y registro) y otro para el CRUD de las tareas, y en estos servicios, se utiliza Http Client para establecer la comunicacion con la API. Para el manejo de observables y guards se utiliza RxJS.

## Entornos

Por defecto, el entorno de desarrollo esta configurado para conectarse con la API en el puerto 8080, si tiene la API en otro puerto debe modificar el valor apiUrl del enviroment utilizado.

### Correr el proyecto

Desarrollo:
```
ng serve o npm start
```

Crear el build de produccion:
```
ng build --prod
```
