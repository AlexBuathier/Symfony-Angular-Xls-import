# XlsBack

### Project requirements:
* Symfony 5.4
* php >=8.0

### Getting started
* Setup environment:
    * Setup BDD in .env.* file in the project root `DATABASE_URL="mysql://user:password@127.0.0.1:3306/db_name?serverVersion=8.0&charset=utf8mb4`)
    * Enter maker command:  `make first-install`
    * Open the browser and go to https://localhost:8000/
    * Et voilà !

### Unit test
* Run tests with `make tests`


### API endpoints
Access API Documentation at https://localhost:8000/api
<br>
You can find img with structure of the database at the end of the document
<br>

## Files
* Find bdd dump & xls file in ressources folder


# XlsFront
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.2.

### Getting started
* run command: `make first-install`
* Open the browser and go to http://localhost:4200/
* Et voilà !


## Request project

### Objectif

Réalisation d’un système d’import du fichier Excel en pièce jointe, avec une interface de gestion des données.


### Contexte

En tant qu’utilisateur

Je souhaite pouvoir importer le fichier Excel dans une base de données

Afin de pouvoir consulter, modifier ou supprimer les informations depuis une interface graphique


### Stack technique

La partie backoffice doit être réalisée avec Symfony.

La partie frontend doit être réalisée avec Angular

### MCD
![MCD](https://buathieralexandre.dev/img/MCD_xmlImport.png "MCD")
