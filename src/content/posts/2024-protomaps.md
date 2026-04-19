---
title: Protomaps, stockez vos pyramides de tuiles plus simplement
date: "2024-02-14"
---

*Article publié initialement [sur le blog de Makina
Corpus](https://makina-corpus.com/sig-cartographie/protomaps).*

Si vous suivez l'actualité de la cartographie web, vous avez peut-être entendu
parler d'un **nouveau format** pour le **stockage des tuiles :
[Protomaps](https://protomaps.com)**. Je vais tenter de vous expliquer son
fonctionnement et les usages que je lui vois déjà.

## Traditionnellement, une pyramide de tuiles

![](https://makina-corpus.com/sites/default/files/import/blog_posts/tuiles.png)

Le plus souvent aujourd'hui, pour présenter une carte dans un navigateur web, on
juxtapose les unes aux autres des **tuiles**. Les tuiles correspondent à une
zone carrée de 256 pixels de côté. Collées les unes aux autres, les tuiles
permettent d'afficher une carte de n'importe quelle taille, à différents niveaux
de zoom. Le navigateur web doit donc avant tout télécharger une à une les tuiles
nécessaires.

Pour chaque tuile, le navigateur exécute donc une requête HTTP(S) avec les
coordonnées de la tuile :

```http
https://makinamaps.makina-corpus.net/tuiles/{Z}/{X}/{Y}.png
```

### Le serveur peut répondre avec…

- **Le résultat d'un traitement** : requête à une base de données puis
  génération d'une image ou de données vectorielles.
- **Le contenu d'un cache** : créé au moment d'une précédente requête identique.

Ces deux premiers cas sont adaptés à des données qui changent souvent, ou bien
couvrent une zone suffisamment étendue pour que, (pré)générer l'ensemble des
tuiles, requiert un espace disque trop important. Cela nécessite ce qu'on
appelle habituellement une _"stack carto"_ complète, c'est à dire plusieurs
applicatifs pour la base de données, les traitements à effectuer et la mise à
disposition des tuiles.

### Ou bien avec…

- **Le résultat d'une requête de base de données** : lorsque ce résultat est
  déjà une image ou des données vectorielles (mbtiles)
- **Un simple fichier**, image ou \`pbf\`, stocké sur le disque dur.

  ```http
  ./Z/X/Y.jpg
  ```

Ces deux solutions sont généralement préférées lorsque les données vont peu ou
pas changer, et/ou que la zone géographique à stocker reste _raisonnable_.

Dans le premier cas, on héberge un simple fichier _`mbtiles`_ (qui est,
techniquement, une base SQLite) et un applicatif _léger/simple_ qui à chaque
requête Z/X/Y depuis un navigateur, va interroger la base et renvoyer le
résultat au navigateur.

Dans le second, à chaque requête depuis le navigateur, le serveur va simplement
renvoyer le fichier correspondant : jpg, png, pbf,…  
Côté serveur, on n'a besoin de rien d'autre qu'un simple serveur HTTP.

**Mais,** si la surface à représenter est importante, cela fait beauuucoup de
fichiers :  
Représenter la terre entière implique la mise à disposition de **plus de 366
milliards** de fichiers : cumul des [zooms 1 à
19](https://wiki.openstreetmap.org/wiki/Tile_disk_usage "zooms 1 à 19"). Le
niveau de zoom 20 nécessiterait 4²⁰ tuiles, soit mille milliards, à lui tout
seul.

## Protomaps

Avec Protomaps, toutes les tuiles sont stockées dans un **unique fichier** !  
Pour chaque tuile à afficher / télécharger, le navigateur appelle donc la même
adresse :

```http
https://makinamaps.makina-corpus.net/tuiles.pmtiles
```

### Mais comment savoir quelle tuile envoyer ?

Le navigateur doit envoyer chaque requête de tuile en précisant au serveur
quelle partie du fichier il souhaite obtenir, grâce à l'[en-tête HTTP
_Range_](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Range
"en-tête HTTP Range")_._ Cette portion du fichier est alors tout simplement
l'équivalent d'un fichier image ou d'un fichier pbf contenant les données d'une
tuile.

Les bibliothèques d'affichage de cartes comme MapLibreGL, Leaflet ou OpenLayers
ne savent initialement pas comment formuler cette entête _Range_, mais il est
très simple de leur indiquer comment grâce à [un
complément](https://www.npmjs.com/package/pmtiles "complement pmtiles")
JavaScript dédié.

Au sein du fichier pmtiles, les données sont organisées de manière à optimiser
le temps d'accès.

### Tout devient simple, basique

- Côté serveur, il n'y a alors besoin de rien d'autre qu'un simple serveur HTTP
  (Nginx, Apache, S3…), ou n'importe quel hébergement de fichiers statiques
  capable de prendre en compte les entêtes _Range_.
- Pour chaque jeu de tuiles, plutôt qu'une arborescence de plusieurs milliers,
  millions ou milliards de fichiers : un unique fichier `.pmtiles` contient
  toute notre pyramide de tuiles.
- La conversion de mbtiles vers pmtiles est très simple.  
  Donc tous les flux de production de tuiles, fichiers ou mbtiles, peuvent très
  simplement aboutir à un pmtiles.
- L'outillage disponible permet de travailler aussi bien en local qu'avec un
  serveur.

## Les usages

Protomaps trouve sa place partout où l'on souhaite mettre à disposition un
ensemble de **données cartographiques vectorielles** ou images en évitant le
déploiement et l'hébergement d'une _stack SIG_. On économise donc en terme
de moyens - techniques, technologiques, énergétiques, etc. - à mettre en œuvre
et donc également en coûts d'hébergement.

Protomaps a par exemple été mis en place pour les tuiles de [cartes historiques
de
Toulouse](https://makina-corpus.com/sig-cartographie/cartes-historiques-de-toulouse-avec-tilemill
"Blog Makina Corpus : cartes historiques de Toulouse") :
[tolosa1680.makina-corpus.com](https://tolosa1680.makina-corpus.com/ "Carte web
Makina Corpus : tolosa1680.makina-corpus.com") et
[tolosa.makina-corpus.com](https://tolosa.makina-corpus.com/ "Carte web Makina
Corpus : tolosa.makina-corpus.com") ainsi que pour
[dessine-moi-une-ville.makina-corpus.net](https://dessine-moi-une-ville.makina-corpus.net/).
Cela permet de proposer simplement des fonds de cartes tuilés, hébergés sur un
simple serveur de contenus statiques.

Plus simplement, lorsqu'un site vitrine, par exemple d'un commerce, souhaite
afficher un plan "local" (rue, quartier, villes, alentours), produire un fond de
plan et le servir sous forme d'un fichier pmtiles permet de ne dépendre d'aucun
service externe.

----

La dernière version de la [spécification de
Protomaps](https://github.com/protomaps/PMTiles/blob/main/spec/v3/spec.md
"spécification de Protomaps") est relativement récente (v3 fin 2022, v3.4 fin
2023), mais semble suffisamment robuste et utile pour une utilisation en
production.

Ce format rend un service important lorsqu'il s'agit de mettre en œuvre un fond
tuilé ou des données vectorielles sur un carte à afficher dans un navigateur
web.

Je vous encourage à expérimenter aussi bien la [production de fichiers
pmtiles](https://makina-corpus.com/sig-cartographie/servir-couche-raster-qgis-en-tuiles-format-pmtiles)
que leur exploitation. Si vous avez des jeux de tuiles stockés en mbtiles et
servis grâce à TileServer, Openmaptiles ou bien par un service comme Mapbox ou
MapTiler, essayez de convertir votre fichier en pmtiles !

```shell
pmtiles convert tileset.mbtiles tileset.pmtiles
```

J'allait oublier de préciser, même si c'est presque une évidence : la
spécification et les implémentations sont [libres et open
source](https://protomaps.com/faq#is-protomaps-open-source "Potomaps libre et
open source").

## Liens utiles

- Le site officiel [protomaps.com](https://protomaps.com/ "protomaps.com") et
  [docs.protomaps.com](https://docs.protomaps.com/)
- L'outil [protomaps.github.io/PMTiles](https://protomaps.github.io/PMTiles/) :
  visualiser rapidement le contenu d'un fichier pmtiles, local ou distant.
- L'outil [Tippecanoe](https://github.com/felt/tippecanoe) : produire une
  pyramide de tuiles notamment en pmtiles à partir de diverses données
  vectorielles
- Le paquet JavaScript
  [npmjs.com/package/pmtiles](https://www.npmjs.com/package/pmtiles) avec
  l'outillage pour MapLibre GL JS
