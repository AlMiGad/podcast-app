Este proyecto se inició con [Create React App](https://github.com/facebook/create-react-app).

## Antes de Empezar
Debes realizar la instalación de todos los paquetes de NODE, puedes ejecutar:
```bash 
npm install
```

## Puesta en Marcha

Dentro del proyecto puedes lanzar los siguientes comandos

Para ejecutar la aplicación en modo dev:

```bash 
npm run start
```
También puedes ejecutar la aplicacion en modo producción de la siguiente forma:

```bash 
npm run build
```

Se generara una version de produccion en una capeta llamada **build** en la raíz del proyecto. Se puede ejecutar directamente en un servidor web, o utilizar un servidor local.

Para instalar el servidor local:
```bash 
npm install -g serve
```
Una vez instalado el paquete, ejecutar:
```bash 
serve -s build
```

## Obtención de Datos

Se utiliza la API de iTunes (Apple) para obtener datos de los mejores podcast a traves del siguiente endpoint: [https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json](https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json).

Para conseguir los episodios y sus atributos se utiliza el siguiente endpoint: [https://itunes.apple.com/lookup?id=934552872&media=podcast&entity=podcastEpisode&limit=20](https://itunes.apple.com/lookup?id=934552872&media=podcast&entity=podcastEpisode&limit=20).

## Problema CORS
Se ha utilizado el siguiente servicio: [https://allorigins.win](https://allorigins.win).