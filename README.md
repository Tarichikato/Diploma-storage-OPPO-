Tenter de faire un petit site joli :

## Créer un project React 

>npm init react-app my-app

Puis aller dans my-app 

## Lancer l'application 

> npm start 

## Installer les dépendances 

> npm install "nom_de_la_dépendance" 

EX : >npm install react-script 

Voici la listes des dépendances que j'utilise : 

    "react-bootstrap":
    "react-dom": 
    "react-router-dom"
    "react-scripts"
    "styled-components"
    "web3" => Seulement si on veut faire le lien avec le contrat. 

=> Certaines sont dékà installé par défaut, il faut vérifier ça dans package.json 

IMPORTANT: C'est dépendances sont nécessaires pour l'utilisation des différents Composants que l'on va utiliser 

NB: On peut rajouter autant de dépendances que l'on souhaite, je peux également recommander 'semantic-ui-react' qui peut être utile pour le template. 

## Sites des composants 

=> React-Bootstrap: https://react-bootstrap.github.io/
                    https://getbootstrap.com/
=> Semantic-ui-react: https://react.semantic-ui.com/

CES SITES PERMETTENT DE VISUALISER DES EXEMPLES DE TEMPLATES POUR CERTAINS COMPOSANTS, IL SUFFIT DE COPIER/COLLER LES CODES. 

## Comment les utiliser? 

Il y a plusieurs manières d'utiliser un Composant, par exemple : 
  - soit l'ajouter directement dans le corps de notre fonction 
  - soit l'ajouter dans un 'assets', comme je l'ai fais pour 'NavBar' puis ensuite l'importer où l'on veut l'utiliser
  
  //Extrait de code de Home.js 
  import NavBar from './../assets/NavBar';
  <header>
     <NavBar/>
   </header>
  
  Il me suffit à présent de l'appeler dans n'importe qu'elle fonction, et elle sera identique pareil. 
