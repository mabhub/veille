---
title: Octobre 2018
date: "2018-12-01"
---

Beaucoup de JavaScript, un soupson de Git, et des outils bien pratiques.

### SVGO

**[SVGO][]** est un outils, installable via [npm][] permettant de
traiter les fichiers SVG en leur appliquant différents traitements et
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

### Removing jQuery from Github.com front-end

Dans **[cet article][github jquery]**, des membres du staff de Github
reviennent sur les raisons de l'utilisation de jQuery, à partir de
2007&nbsp;: ce que la bibliothèque à apporté, facilité et permis.

Puis, avec l'évolution des standards du web et de leurs besoins, ils ont
petit à petit réduit l'utilisation de jQuery pour le remplacer par du
JavaScript "standard" et notamment en mettant en œuvre des
[customElements][].

De nombreux [polyfills][] les ont également aidé à ne pas complètement
abandonner les navigateurs vieillissants.

[github jquery]: https://githubengineering.com/removing-jquery-from-github-frontend/
[customElements]: https://developer.mozilla.org/fr/docs/Web/API/Window/customElements
[polyfills]: https://fr.wikipedia.org/wiki/Polyfill	"prothèse d'émulation"

### You don't (may not) need Moment.js

Au delà de sa popularité, [Moment.js][] est un fantastique outil pour
manipuler les dates et durées en JavaScript. Mais lorsqu'on aborde la
question des performances ou de la taille, la bibliothèque semble
parfois requérir les ressources de manière démesurée.

Lorsque, donc, la manipulation des dates n'est pas le cœur de
l'application ou du site, il peut être pertinent de se passer de
Moment.js pour privilégier d'autres solutions. Soit en utilisant une
bibliothèque alternative plus légère, qui n'aura peut-être pas le même
*scope* fonctionnel, soit en restant sur du code natif.

**[You don't (may not) need Moment.js][YDNM]** propose de comparer de
multiples situations, les différentes manières de les aborder et les
conséquences sur les performances.

[Moment.js]: https://momentjs.com/
[YDNM]: https://github.com/you-dont-need/You-Dont-Need-Momentjs

### Trix & Quill

**[Trix][]**, proposé par [Basecamp][], et **[Quill][]** mis en œuvre
par [LinkedIn][] ou [slack][] par exemple, sont deux éditeurs de texte
riches, et open source bien sûr. Ils permettront de proposer aux
contributeurs de contenus d'un site, une interface intuitive se
rapprochant de l’expérience de traitement de texte à laquelle beaucoup
d'utilisateurs sont accoutumés.

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

---

"Et c'est pas fini…"
