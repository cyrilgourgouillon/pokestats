# PokeStats
Outil d’analyse et de statistiques sur les Pokémons

## Le principe du projet
On souhaite développer une application web utilisant l’Open Data et plus précisément la technologie RDF (SparQL). Notre sujet se centre sur les Pokémons et leurs caractéristiques.
## Notre idée
L’idée est de permettre à l’utilisateur de créer des analyses statistiques visuelles sur les Pokémons. À partir de plusieurs critères de sélection et de paramètres de sortie, l’utilisateur pourra visualiser des tableaux et des graphiques sur les Pokémons correspondant.

## Critères de recherche :
Les critères de recherche sont générés dynamiquement grâce aux données de Wikidata, on y trouve par exemple :
* N°Dex (Toujours)
* Nom (Toujours)
* Type (Toujours)
* Part of (Toujours)
* Color (Souvent)
* Mass / Height (Souvent)
* Present In Work (Rare)
* Based on (Rare)

### Exemples :
Afficher un tableau listant tous les pokémons de couleur Rose et de type Électrik .
Graphique sur la couleur des pokémons.
## Les technologies utilisée
### Front
* HTML
* CSS
* JS
* JQuery

### Back
* C#
### Traitement de données
* RDF
* SparQL

### Divers
* Tableau interactif :
https://github.com/ag-grid/ag-grid
* Graphiques et Stats :
https://github.com/chartjs
* Requête sparQL en C# :
https://github.com/dotnetrdf

## D’où viennent les sources de données ?
* Wikidata (Espèces) :
https://www.wikidata.org/wiki/Q3966183
* PokeAPI (Sprites) :
```https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/ + numDex.png```

## Comment essayer Pokéstats ?
Prérequis :
* Git
* Dotnet core 3.0
* Nodejs (npm)

Installation (depuis un terminal):
* Cloner le projet github:
```` git clone https://github.com/cyrilgourgouillon/pokestats.git ````
* Se rendre dans le réperoire:
```` cd pokestat ````
* Installer les dépendances:
```` npm install ````
* Lancer le serveur C#:
```` dotnet run ````
