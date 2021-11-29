Explicación de la app; tenemos 4 vistas.
Home: Primera pagina con un boton, dando la bienvenida a todos los usuarios
Favorites: Guarda todas los climas que le gustó al usuario o que requiera el mismo
Clima: Barra de búsqueda, pueden buscar cualquier clima de cualquier ciduad / pais y se los muestra. Ahí mismo van a poder guardar esos datos en favoritos.
Nosotros: Información sobre nosotros

Dependencias a instalar:
react-native-elements
@react-navigation/native
expo install react-native-screens
react-native-safe-area-context
@react-native-async-storage/async-storage

Uso:
Home: Boton que da la bienvenida
Favorites:
Clima: Damos alguna ciudad para saber el clima (como recarga la pagina, tenemos que volver a la ventana)
Nosotros: Info sobre nosotros

+Lo que me faltó hacer
Home: Boton que no hace nada pero queria agregarle una "redireccion a la ventana Clima"
Favorites: solucionar el error de consola (key), arreglar el tema de recarga de pagina y mejorar visualmente todo.
Clima: arreglar el tema de recarga de pagina y mejorar visualmente, ademas de que en web si se puede utilizar, pero en android No (por un tema de tiempos, el fetch no llega a mandar los datos porque no obitene a tiempo el nombre de la ciudad, osea del input)
Nosotros: mejorar visualmente

Para inicializarlo:
En el CMD tienen que poner:
cd "destino de la carpeta donde lo tienen"
yarn start

Apretar W para que se les abra en WEB
y navegar!
