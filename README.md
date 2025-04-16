# GithubIssuesApp

##############################################

                    README

##############################################

- Primer paso, vamos a ir a la raiz, y vamos a hacer un "npm i" para instalar todas las dependencias, ha priori, al estar montando mediante NX, tendría que ser suficiente, en caso de que falle algo, ir a la raiz de cada proyecto y volver a lanzar "npm i"

- Para levantar el primer proyecto, vamos a utilizar el comando "npx nx serve web"

- Para lanzar las pruebas unitarias de este mismo proyecto, vamos a lanzar el comando "npx nx test web"

- Para ejecutar el segundo proyecto, y al estar separado el strapi de la parte del angular, he instalado la dependencia de "concurrently", por lo que he comando que vamos a utilizar para poder probarlo todo a la vez, sera "npm run start:all"
