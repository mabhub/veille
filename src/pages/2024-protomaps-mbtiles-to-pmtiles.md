---
title: Générer un fichier PMTiles à partir d'un MBTiles
date: "2024-04-24"
---

*Article publié initialement [sur le blog de Makina
Corpus](https://makina-corpus.com/sig-cartographie/generer-fichier-pmtiles-partir-mbtiles).*

## Télécharger les données mbtiles

On commence par télécharger le _Plan Cadastral Informatisé_ au format `mbtiles` depuis [la page dédiée d’Etalab](https://cadastre.data.gouv.fr/datasets/cadastre-etalab "la page dédiée d'Etalab").

[![Capture d'écran du site d'Etalab dédiée au Plan Cadastral Informatisé](https://makina-corpus.com/sites/default/files/styles/to_webp/public/2024-02/Capture%20d%E2%80%99%C3%A9cran%20du%202024-02-14%2013-30-45.png.webp?itok=rJkzv-qy)](https://cadastre.data.gouv.fr/datasets/cadastre-etalab)

[![Capture d'écran de la partie téléchargement du site d'Etalab dédiée au Plan Cadastral Informatisé](https://makina-corpus.com/sites/default/files/styles/to_webp/public/2024-02/Capture%20d%E2%80%99%C3%A9cran%20du%202024-02-14%2013-33-02.png.webp?itok=TcNgnFDM)](https://cadastre.data.gouv.fr/datasets/cadastre-etalab)

```bash
wget https://cadastre.data.gouv.fr/data/etalab-cadastre/latest/mbtiles/france/cadastre.mbtiles
```

## L’outil

Pour la suite, il est nécessaire d’avoir l’utilitaire `go-pmtiles` et de pouvoir
le lancer.

Pour cela, vous avez comme première possibilité de télécharger directement le
binaire depuis la [page Releases du dépôt
Github](https://github.com/protomaps/go-pmtiles/releases).  
Vous pouvez ensuite le lancer avec la commande `./pmtiles`.

Une seconde possibilité, si vous avez Docker dans votre environnement, est de
lancer `go-pmtiles` depuis un conteneur :  

```shell
docker run -u $UID:$GID -it --rm -v .:/app -v /tmp:/tmp protomaps/go-pmtiles:latest
```

Dans ces deux cas, lancer la commande sans plus de paramètre doit vous afficher
l’aide de l’outil qui commence comme ceci :

```bash
  Usage: go-pmtiles

  Flags:
    -h, --help    Show context-sensitive help.

  Commands:
    convert
      Convert an MBTiles or older spec version to PMTiles.

    show
      Inspect a local or remote archive.
  …
```

## La conversion

Pour lancer la conversion proprement dite, il suffit de reprendre cette
précédente commande et d’ajouter comme paramètres :  
```
convert cadastre.mbtiles cadastre.pmtiles
```

Les commandes complètes sont donc les suivantes :

```bash
# Avec le binaire téléchargé :
./pmtiles convert cadastre.mbtiles cadastre.pmtiles

# Ou bien avec le conteneur Docker :
docker run -u $UID:$GID -it --rm -v .:/data -v /tmp:/tmp protomaps/go-pmtiles:latest \
    convert /data/cadastre.mbtiles /data/cadastre.pmtiles
```

Le résultat de cette commande sera donc la création d’une version `.pmtiles` du
fichier `.mbtiles` téléchargé précédemment.

## Vérifier le résultat

Vous pouvez très facilement vérifier la validité du fichier générer en vous
rendant sur la page
[https://protomaps.github.io/PMTiles/](https://protomaps.github.io/PMTiles/).  
En cliquant sur *« Drag + drop a file here, or click to select »,* vous pouvez
sélectionner votre fichier PMTiles tout juste créé.

*À noter : votre fichier ne va pas être transféré. Il est lu directement depuis
votre machine et uniquement par votre navigateur web.*

![Capture d'écran de PMTiles Viewer](https://makina-corpus.com/sites/default/files/styles/to_webp/public/2024-02/Capture%20d%E2%80%99%C3%A9cran%202024-02-14%20%C3%A0%2016.53.23.png.webp?itok=rBlg-R-q)

L’interface vous affiche alors un fond de carte sombre par dessus lequel les
données de votre fichier PMTiles sont chargées.

Au niveau de zoom par défaut, aucune donnée n’est visible.

*À noter : vous pouvez visualiser le niveau de zoom courant qui se met à jour
dans la barre d’adresse de votre navigateur :  
protomaps.github.io/PMTiles/#map=<b>11.54</b>/43.6041/1.4702*

![Capture d'écran de PMTiles Viewer sur une carte vide](https://makina-corpus.com/sites/default/files/styles/to_webp/public/2024-02/Capture%20d%E2%80%99%C3%A9cran%202024-02-14%20%C3%A0%2016.54.42.png.webp?itok=TmOwORmw)

Il faut zoomer jusqu’au niveau 11 pour voir apparaître les premières données.

![Capture d'écran de PMTiles Viewer avec une carte chargée](https://makina-corpus.com/sites/default/files/styles/to_webp/public/2024-02/Capture%20d%E2%80%99%C3%A9cran%202024-02-14%20%C3%A0%2016.58.52.png.webp?itok=u6KaVDTn)

Au delà du rendu visuel des données, cet outil vous donne également des
informations techniques sur le contenu du fichier PMTiles.

Des informations associées à chacune des géométries peuvent être consultées en
cochant la case « show attributes » : les données des éléments placés sous votre
curseur de souris s’afficheront alors au survol.

Les informations plus générales sur l’ensemble des données sont visibles en
allant sur l’onglet « Metadata »

![Capture d'écran de PMTiles Viewer à l'onglet Metadata](https://makina-corpus.com/sites/default/files/styles/to_webp/public/2024-02/Capture%20d%E2%80%99%C3%A9cran%202024-02-14%20%C3%A0%2017.02.48.png.webp?itok=WdyKtXOj)

Vous obtenez alors de détails sur, par exemples :

- Les niveaux de zoom pour lesquels des données sont disponibles, ici de 11 à 16
- Ou encore l’ensemble des couches vectorielles disponibles, ici `batiments`,
  `parcelles` et `sections`

Vous pouvez également voir les paramètres `generator` et `generator_options`.
Nous pouvons en déduire ici que le fichier MBTiles original que nous avons
téléchargé puis converti en PMTiles a été créé initialement en utilisant
[Tippecanoe](https://github.com/mapbox/tippecanoe).
