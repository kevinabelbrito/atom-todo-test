# TODO API

## Tecnologias

- TypeScript
- Express JS
- Firebase Admin
- JWT

Se creo una API con rutas para autenticar, registrar nuevos correos, y un crud para gestionar tareas, la autenticacion se realiza mediante JWT, y la tecnologia para almacenar la informacion a manejar es Firebase.

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

### Correr el proyecto

Desarrollo:
```
ng serve o npm start
```

Crear el build de produccion:
```
ng build --prod
```
