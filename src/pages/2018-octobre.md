---
title: Octobre 2018
date: "2018-12-01"
---

Beaucoup de JavaScript, un soupçon de Git, et des outils bien pratiques.

## SVGO

**[SVGO][]** est un outils, installable via [npm][] permettant de
**traiter les fichiers SVG** en leur appliquant différents filtres ou
optimisations. Il peut être utilisé aussi bien en *one shot* pour
quelques fichiers, que dans un *workflow* plus complet, avec par
exemple les [scripts NPM][] ou Webpack.

Parmi ses avantages, on retrouve le nettoyage sur SVG en supprimant
les méta-données et attributs superflus, mais aussi la
simplification des géométries constituant les différents objets.

L'option indispensable : `--pretty` qui formate et indente
correctement la source XML du SVG.

[SVGO]: https://github.com/svg/svgo
[npm]: https://www.npmjs.com/package/svgo
[scripts NPM]: https://docs.npmjs.com/cli/run-script

## Removing jQuery from Github.com front-end

Dans **[cet article][github jquery]**, des membres du staff de Github
reviennent sur les raisons de l'utilisation de jQuery, à partir de
2007&nbsp;: ce que la bibliothèque à apporté, facilité et permis.

Puis, avec l'évolution des standards du web et de leurs besoins, ils ont
petit à petit **réduit l'utilisation de jQuery** pour le remplacer par
du JavaScript "standard" et notamment en mettant en œuvre des
[customElements][].

De nombreux [polyfills][] les ont également aidé à ne pas complètement
abandonner les navigateurs vieillissants.

[github jquery]: https://githubengineering.com/removing-jquery-from-github-frontend/
[customElements]: https://developer.mozilla.org/fr/docs/Web/API/Window/customElements
[polyfills]: https://fr.wikipedia.org/wiki/Polyfill "prothèse d'émulation"

## You don't (may not) need Moment.js

Au delà de sa popularité, [Moment.js][] est un fantastique outil pour
manipuler les dates et durées en JavaScript. Mais lorsqu'on aborde la
question des performances ou de la taille, la bibliothèque semble
parfois requérir des ressources disproportionnées.

Lorsque, donc, la manipulation des dates n'est pas le cœur de
l'application ou du site, il peut être pertinent de **se passer de**
**Moment.js** pour privilégier d'autres solutions. Soit en utilisant une
bibliothèque alternative plus légère, qui n'aura peut-être pas le même
*scope* fonctionnel, soit en restant sur du code natif.

**[You don't (may not) need Moment.js][YDNM]** propose de comparer de
multiples situations, les différentes manières de les aborder et les
conséquences sur les performances.

[Moment.js]: https://momentjs.com/
[YDNM]: https://github.com/you-dont-need/You-Dont-Need-Momentjs

## Trix & Quill

**[Trix][]**, proposé par [Basecamp][], et **[Quill][]** mis en œuvre
par [LinkedIn][] ou [slack][] par exemple, sont deux
**éditeurs de texte riches**, et open source bien sûr. Ils permettront
de proposer aux contributeurs de contenus d'un site, une interface
intuitive se rapprochant de l’expérience de traitement de texte à
laquelle beaucoup d'utilisateurs sont accoutumés.

Ces deux outils sont aussi intéressants pour les mainteneurs du site
car ils permettent de gérer l'ajout de médias ou encore de composants
spécifiques, beaucoup plus compliqués à intégrer dans les
<abbr title="Rich-Text Editors, ou éditeurs de texte formaté">RTE</abbr>
traditionnels sans perdre l'utilisateur.

[Trix]: https://github.com/basecamp/trix
[Quill]: https://basecamp.com/
[Basecamp]: https://github.com/quilljs/quill/
[LinkedIn]: http://linkedin.com/
[slack]: https://slack.com/

## Debug

**[Debug][]** comme son nom l'indique est ou **outil de débogage**,
utilisable autant côté navigateur qu'avec NodeJS. Il fonctionne un peu
comme un `console.log()`, mais avec la possibilité de définir des
*<abbr title="espaces de nommage">namespaces</abbr>* et donc de filtrer
les sorties en fonction des besoins.

De plus, contrairement au `console.log()`, les appels à *debug* peuvent
être laisser dans le code de production et permettent donc au besoin
d'avoir ces informations directement. Il suffit d'ajouter manuellement
en `localStorage` le ou les *namespaces* que l'ont souhaite voir, et les
messages de débogage défileront dans la console du navigateur.

[Debug]: https://github.com/visionmedia/debug

## Js13kGames 2018

**[Js13kGames][]** est une compétition annuelle de
**développement de jeux HTML5** avec une contrainte de taille : le poids
total ne doit pas excéder 13 kilooctets.

À la fin de l'édition 2018, Github a publié sur son blog
[une sélection de quelques jeux][Github Js13k] parmi les 274
participants.

[Js13kGames]: http://js13kgames.com/
[Github Js13k]: https://blog.github.com/2018-10-05-js13kgames-highlights-2018/

## Death by a thousand cuts

En décrivant de manière didactique la manière donc les rendus de
composants s'articulent, **[cet article][Death by a thousand cuts]**
propose une *checklist* de contrôle pour éliminer les principaux écueils
de performance d'une application [React][].

[Death by a thousand cuts]: https://logrocket-blog.ghost.io/death-by-a-thousand-cuts-a-checklist-for-eliminating-common-react-performance-issues/ "Death by a thousand cuts - a checklist for eliminating common React performance issues"
[React]: https://reactjs.org/

## Pepper

Lorsqu'on travaille avec de multiples dépôt sur [Github][], on se
retrouve parfois à devoir accomplir certaines actions de manière
répétitives sur plusieurs d'entre eux : Ajouter un utilisateur comme
collaborateur, changer le
[mode de *merge* par défaut](https://help.github.com/articles/about-pull-request-merges/),
protéger une branche, enlever un administrateur…

C'est à cela que sert **[Pepper][]**, outils en ligne de commande écrit
en [go][], qui grâce à l'API d Github permet d'effectuer un tas
d'opération sur un ou plusieurs dépôt.

[Github]: https://github.com
[Pepper]: https://github.com/genuinetools/pepper/
[go]: https://golang.org/

## Git Submodule Vulnerability Announced

Le 5 octobre dernier, une [vulnérabilité][Git CVE] dans la gestion des
sous-modules de Git a été dévoilée.
**[Cet article][Git Submodule Vulnerability Announced]** sur le blog de
Github la présence succinctement, et explique l'impact éventuels sur
leurs produits [Atom][] et [Github Desktop][].

[Git CVE]: https://nvd.nist.gov/vuln/detail/CVE-2018-17456 "CVE-2018-17456"
[Git Submodule Vulnerability Announced]: https://blog.github.com/2018-10-05-git-submodule-vulnerability/
[Atom]: https://atom.io/
[Github Desktop]: https://desktop.github.com/

## Inria Sans & Inria Serif

L'<abbr title="Institut national de recherche en informatique et en automatique">Inria</abbr>
pour sa communication et son image a fait créer par le fondeur
[Black&#91;Foundry&#93;][BlackFoundry] une famille de
**polices de caractères**, constituée de membres  **Inria Sans** et de
**Inria Serif**.

Chacune d'entre elle dispose de 3 graisses différentes, et des variantes
italiques correspondantes.

Conformément à ses valeurs, l'[Inria][] a placé cette famille de polices
sous [licence libre][Licence SIL].  Vous pouvez donc utiliser ces
polices sans modération !

[BlackFoundry]: https://black-foundry.com/ "Black Foundry"
[Inria]: https://www.inria.fr/ "Institut national de recherche en informatique et en automatique"
[Licence SIL]: https://github.com/BlackFoundry/InriaFonts/blob/master/LICENSE.txt

## math-as-code

[math-as-code][] est un article unique, *cheatsheet*, ou une forme de
monographie, présentant de manière simple et claire grâce à quelques
lignes de JavaScript, des notions et **notations mathématiques** parfois
complexes à aborder.

[math-as-code]: https://github.com/Jam3/math-as-code

















