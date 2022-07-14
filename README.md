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