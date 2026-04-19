---
title: Décembre 2019
date: "2019-12-02"
---

## Quelques outils

## Work with yarn/npm packages locally like a boss

**[Yalc][]** est un outil pour la ligne de
commande qui se porpose comme une alternative à `npm link` lorsqu'on développe
plusieurs *packages* dépendants les uns des autres.
Il permet notemment de *publier* localement un paquet pour pouvoir le consommer
dans un autre projet local, sans avoir passer par npmjs.org.

[Yalc]: https://github.com/whitecolor/yalc

## XState: JavaScript state machines and statecharts

Proposé par [un développeur][] de chez Microsoft, **[XState][]** est un package
proposant d'un côté, un moyen de concevoir et rendre fonctionnel des
[machines à états][] et de l'autre, un moyen de visualiser ces automates et leur
fonctionnement.

Il propose en plus un certain nombre d'[outils][] permettant d'exploiter
cette mécanique par exemple comme un hook de [composant React][], ou bien d'y
faire une [résolution de chemin][].

[XState]: https://xstate.js.org/
[un développeur]: https://twitter.com/DavidKPiano
[machines à états]: https://fr.wikipedia.org/wiki/Automate_fini
[outils]: https://xstate.js.org/docs/#packages
[composant React]: https://www.npmjs.com/package/@xstate/react
[résolution de chemin]: https://www.npmjs.com/package/@xstate/graph
