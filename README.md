# dexfreight-test
Prueba técnica para puesto de desarrollador backend de la compañia dexFreight.

# Tecnologias usadas
### Dependencias de Node
- express
- cors
- pg
- validatorjs
- dotenv

### Motor de base de datos
Se hace uso de PostgreSQL como motor de bases de datos. Se implementan procedimientos almacenados y disparadores para automatizar tareas.

# ¿Como ejecutar la aplicación?
- Para ejecutar la aplicación es necesario tener Postgres instalado previamente. Crear la base de datos con el nombre que se desee. Una vez hecho esto, ejecutar el script ubicado en: 
		db/script/script-dexfreight-bd.sql
- Crear el archivo .env para cargar las variables de entorno con la siguiente estructura:
		PORT=3000
		PGHOST=<your-host>
		PGUSER=<your-pguser>
		PGDATABASE=<your-db-name>
		PGPASSWORD=<your-pass>
		PGPORT=5432
	
- Puede iniciar la aplicacion con el comando 
		npm start
- A divertirse! :)