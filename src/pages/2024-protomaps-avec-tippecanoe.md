---
title: Géné­rer un fichier PMTiles avec Tippe­ca­noe
date: "2024-02-28"
---

*Article publié initialement [sur le blog de Makina
Corpus](https://makina-corpus.com/sig-cartographie/generer-fichier-pmtiles-avec-tippecanoe).*

## Prérequis techniques

Pour ne pas avoir à installer des dépendances complexes, nous utilisons
Tippecanoe à travers Docker et des [conteneurs
éphémères](https://docs.docker.com/engine/reference/commandline/container_run/#rm).  
Nous avons donc besoin d’avoir une *image* Docker de Tippecanoe que nous pouvons
générer nous même à partir des sources :

```bash
git clone https://github.com/felt/tippecanoe
cd tippecanoe
docker build -t tippecanoe:latest .
```

Après le traitement qui dure quelques minutes, vous pouvez vérifier la présence
d’une image de Tippecanoe avec la commande : docker images

## Récupérer et préparer les données

Le jeu de données qui est utilisé pour cet exemple est une base des
[aménagements cyclables de France
Métropolitaine](https://www.data.gouv.fr/fr/datasets/amenagements-cyclables-france-metropolitaine/
"Aménagements cyclables de France Métropolitaine"), numérisés dans
[OpenStreetMap](https://www.openstreetmap.fr/) et traités par
[Geovelo](https://geovelo.app/fr/).

On télécharge le [jeu de données au format
*GeoJSON*](https://www.data.gouv.fr/fr/datasets/r/d03abb03-9197-4a4f-b758-5062595eb9ce) :

```bash
wget https://www.data.gouv.fr/fr/datasets/r/d03abb03-9197-4a4f-b758-5062595eb9ce -O amenagements.geojson
```

*À noter : nous utilisons ici des données GeoJSON pour produire les tuiles, mais
[Tippecanoe accepte aussi des données CSV ou
FlatGeobuf](https://github.com/felt/tippecanoe?tab=readme-ov-file#input-files-and-layer-names).*

Pour faciliter le traitement de la source de données, nous allons convertir le
*GeoJSON* original en un fichier
[GeoJSON-NL](https://stevage.github.io/ndgeojson/) : au lieu d’un
objet racine unique de type *FeatureCollection* contenant ensuite toutes les
*Features*, nous aurons un fichier dont chaque ligne est une *Feature*. Cela
permettra à Tippecanoe de [paralléliser ses
traitements](https://github.com/felt/tippecanoe?tab=readme-ov-file#parallel-processing-of-input
"Tippecanoe de paralléliser ses traitements").

```bash
docker run -it --rm -v .:/app tippecanoe:latest \
  tippecanoe-json-tool amenagements.geojson > amenagements.geojson-nl
```

GeoJSON :

![Capture d'écran d'un exemple de fichier GeoJSON](https://makina-corpus.com/sites/default/files/styles/to_webp/public/2024-02/geojson.png.webp?itok=Ys-D6rR8)

GeoJSON-NL :

![Capture d'écran d'un exemple de fichier GeoJSON-NL](https://makina-corpus.com/sites/default/files/styles/to_webp/public/2024-02/geojson-nl.png.webp?itok=m1tNFWUk)

D’autres possibilités pour faire cette même conversion :

```bash
# Avec jq : https://jqlang.github.io/jq/
cat amenagements.geojson | jq -c ".features[]" > amenagements.geojson-nl

# Avec GDAL : https://gdal.org/programs/ogr2ogr.html
ogr2ogr -f GeoJSONSeq amenagements.geojson-nl amenagements.geojson
```

## Générer la pyramide de tuiles en PMTiles

On peut ensuite produire notre fichier PMTiles :

```bash
docker run -u $UID:$GID -it --rm -v .:/app tippecanoe:latest \
  tippecanoe --read-parallel \
  --maximum-zoom=g --drop-densest-as-needed --extend-zooms-if-still-dropping \
  --output=amenagements.pmtiles \
  amenagements.geojson-nl
```

*À noter : Il est important paramétrer Tippecanoe avec des options de
simplification [adaptées au type des
données](https://github.com/felt/tippecanoe?tab=readme-ov-file#cookbook) :
réseau de linéaires, géométries de zones, ensemble de points, …*

Après quelques minutes, le fichier .pmtiles est créé, et on peut visualiser le
résultat en le faisant glisser sur https://protomaps.github.io/PMTiles.

Pour un GeoJSON initial de 235 Mo, nous obtenons ici une pyramide complète de
tuiles de 40 Mo !

## Afficher le fichier PMTiles

Nous partons d’un simple fichier `carte.html`, dans lequel on va charger
MapLibre GL JS et un petit complément pour le rendre capable d’utiliser le
fichier PMTiles :

```html
<script src="https://unpkg.com/maplibre-gl@4/dist/maplibre-gl.js"></script>
<script src="https://unpkg.com/pmtiles@3/dist/pmtiles.js"></script>
<link href="https://unpkg.com/maplibre-gl@4/dist/maplibre-gl.css" rel="stylesheet" />
```

Pour anticiper un peu le rendu, on ajoute un peu de CSS :

```html
<style>
  html { box-sizing: border-box; font-size: 16px; }
  *, *:before, *:after { box-sizing: inherit; }
  html, body { margin: 0; padding: 0; }
  pre { white-space: pre-wrap; }
</style>
```

Dans le corps de la page, on place la balise où se chargera la carte :

```html
<div id="map" style="height: 100vh;"></div>
```

Puis enfin, le script qui va permettre de créer la carte :

```html
<script>
  // Ajoute à MapLibre la gestion des PMTiles
  const protocol = new pmtiles.Protocol();
  maplibregl.addProtocol('pmtiles', protocol.tile);

  // Instancie la carte avec un fond de démo (coloré)
  const map = new maplibregl.Map({
    container: 'map',
    style: 'https://demotiles.maplibre.org/style.json',
    center: [1.5, 47],
    zoom: 6,
  });

  // Crée une Popup qu'on affichera au survol des Features
  const popup = new maplibregl.Popup({ closeButton: false, closeOnClick: false });

  // Une fois que la carte est instanciée…
  map.on('load', () => {

    // Ajoute notre fichier PMTiles en tant que source vectorielle
    map.addSource('id-de-ma-source', {
      type: 'vector',
      // La syntaxe ici est "pmtiles://" puis le chemin d'accès au fichier.
      // Ce chemin peut-être relatif ("./fichier", "fichier", "dossier/fichier"),
      //  absolu ("/fichier", "/fichier", "/dossier/fichier")
      //  ou distant ('https://domaine.tld/cheminfichier")
      url: 'pmtiles://amenagements.pmtiles',
    });

    // Ajoute à la carte une couche linéaire utilisant notre source PMTiles
    map.addLayer({
      id: 'id-de-ma-couche',
      source: 'id-de-ma-source',
      // "source-layer" est le nom de notre couche "dans" le fichier PMTiles
      //   Si on ne l'a pas précisé à la création du PMTiles, Tippecanoe génère
      //   un identifiant à partir du fichier source.
      //   Il est facile de vérifier les couches d'un PMtiles en le chargeant
      //   sur https://protomaps.github.io/PMTiles
      'source-layer': 'amenagementsgeojsonnl',
      type: 'line',
      paint: {
        'line-color': '#198EC8',
        'line-width': 3,
        'line-opacity': 0.7,
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
    });

    // Au survol de notre couche, affiche une Popup
    map.on('mouseenter', 'id-de-ma-couche', ({ lngLat, features } = {}) => {
      map.getCanvas().style.cursor = 'pointer';
      popup
        .setHTML(
          features.map(feature => '<pre>' + JSON.stringify(feature.properties, null, 2) + '</pre>').join('</br >')
        )
        .setLngLat(lngLat)
        .addTo(map);
    });
    map.on('mouseleave', 'id-de-ma-couche', () => {
      map.getCanvas().style.cursor = '';
      popup.remove();
    });
  });
</script>
```

Pour afficher votre page HTML avec la carte, il sera nécessaire d’utiliser un
serveur http supportant les **entêtes HTTP Range**.

*À noter : charger le fichier html directement dans le navigateur ne
fonctionnera pas.*

Par exemple :

```bash
# Avec Nodejs :
npx serve

# ou bien
npx http-server
```

![Capture d'écran d'une portail de la carte générée avec ce tutoriel.](https://makina-corpus.com/sites/default/files/styles/to_webp/public/2024-02/protomaps-demo.png.webp?itok=HBdBPOnu)

## Liens utiles

- L’outil [protomaps.github.io/PMTiles](https://protomaps.github.io/PMTiles/) :
  visualiser rapidement le contenu d’un fichier PMTiles, local ou distant.
- L’outil [Tippecanoe](https://github.com/felt/tippecanoe) : utilisé ici pour
  générer la pyramide de tuiles à partir de données géographiques
- La documentation de MapLibre GL JS :
  [maplibre.org/maplibre-gl-js/docs](https://maplibre.org/maplibre-gl-js/docs/)
- Le paquet JavaScript
  [npmjs.com/package/pmtiles](https://www.npmjs.com/package/pmtiles) : pour la
  prise en charge de pmtiles:// dans MapLibre
