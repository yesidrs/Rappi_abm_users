# ABM Users Rappi

## Introducción
Aplicación creada en NodeJS, cuenta con su propio frontend para realizar las pruebas sin necesidad de alguna herramienta de terceros (Postman o Insomnia)
para ver las respuestas a las peticiones http.

**Nota:** Aunque se haga mencion al sistema operativo Windows los pasos están pensados para linux, por lo que si se encuentra en un sistema windows recomiendo usar WSL2 en ayuda con Docker Desktop el cual ya viene con integración nativa para WSL2


### Instalaciones necesarias
- Docker y Docker Compose 

    *Usar Docker Desktop:* [windows](https://docs.docker.com/desktop/install/windows-install/), [linux](https://docs.docker.com/desktop/install/linux-install/)

- Python 3 (ver instalaciones con pip)

    *En linux se instala desde el gestor de paquetes de la distribucion (apt, yum, packman, etc).*


### Instalaciones con pip (Python)
*Nota: se recomienda usar sudo, ej: sudo pip install tu_paquete*
- ansible
- docker
- docker-compose

# Ejecutar el programa localmente
Cabe aclarar que el programa correrá localmente en el siguiente dominio: ***abmrappi.localhost***

- Unicamente tenemos que ejecutar el siguiente comando de ansible:

    ``` ansible-playbook ansible/playbook.yml -i ansible/hosts -K ``` 
    
    *Nota: la primera vez te pedira la clave del usuario root, despues de eso cada vez que ejecutes el comando podrás obviar escribir la contraseña y presionar enter cuando aparezca **BECOME password**:*


    el cual se encargará de levantar el docker-compose, el cual levanta 3 contenderes: base de datos(mysql), la aplicación y traefik, ademas de que tambien ansible se encarga de pasarle las configuraciones a traefik.


- para finalizar en el navegador ya solo agregamos el dominio anteriormente mencionado (**abmrappi.localhost**) y nos aparecera una pagina con dos vistas, la principal que lista los usuarios que estén en la base de datos y la segunda que es un formuliario para agregarlos, cuando el usuario ya ha sido agregado podremos tanto eliminarlos como editarlos.

### Detener el proyecto
 ``` docker-compose down ```


### Ver Logs
 ``` docker-compose logs -f ```


# Despliegue
<img src="abmrappi.drawio.png" alt="Despliegue"/>


La infra de la aplicación seria escrita en un **cloudformation**, ya que las ventajas que ofrece usar infraetructura como codigo es el versionamiento de esta, ademas que se deja definido por escrito todos los servicios necesarios y los recursos destinados a cada uno, esto ayuda a al mantenimiento y escalabilidad de la infraetructura.

Los servicios propuestos para está solución serian:

- **API Gateway**: se encargará de servir como enrutador entre las peticiones del cliente y nuestro servidor web.

- **VPC**: Nos brindara una red virtual privada en la cual lanzaremos los servicios que hospedaran la aplicación y la base de datos, ademas aprovecharemos uno de sus modulos que es el **Internet Gateway**, el cual servirá como proxy hacia peticiones del internet, integraciones con apis externas, etc.

- **EC2**: Usaremos una Instancia de esta maquina virtual hospedada en la nube, en la cual tendremos las instalaciones necesarios para que la aplicación pueda ser levantada (Docker y ansible).

- **RDS**: En este servicio subiremos la base de datos relacional mysql. este puede ser opcional ya que tambien la base de datos se puede trabajar como contenedor en la maquina EC2, pero la ventaja que proporciona es que facilita la manipulación y configuracion de la base de datos, ya que por EC2 todo se realizario por medio de consola.

- **Secret Manager**: Este servicio almacenará los secretos para la base de datos y los puertos que usará la aplicación.

- **CloudWatch**: Este servicio nos permitirá ver los logs, servirá como monitor tanto para nuestra maquina EC2, la base de datos RDS y las peticiones del API Gateway.