---
title: FAQ pour un·e futur·e dev web
date: "2020-04-28"
---

<!-- markdownlint-disable MD026 -->

*Une amie en pleine reconversion professionnelle suit actuellement un cursus
[Développeuse Web][DW] dispensé par [Web Force 3][] et [SocialBuilder][]. Elle a
débuté cette formation il ya quelques semaines et s'est adressée à moi avec
quelques questions.*

*Il ne m'a pas semblé évident de répondre rapidement à ses interrogations. J'ai
donc pris le temps d'en contextualiser certaines.*

*Ces réponses et suggestions sont formulées à partir de la perception et de la
compréhension que j'ai de mon environnement professionnel. Elles sont donc sans
aucun doute subjectives, partiales et partielles, et ne se veulent donc pas être
des vérités incontestables. Il est probable que j'aurais eu par le passé, et
aurait à l'avenir, des réponses très différentes.*

[DW]: https://socialbuilder.org/formation-developpeuse-web/
[Web Force 3]: https://www.wf3.fr/
[SocialBuilder]: https://socialbuilder.org/

> 1/ quels sont les langages les plus utilisés par les développeurs?  
> 2/ idem pour les frameworks?  
> 3/ Quel est ton métier exactement?  
> 4/ insères tu de l’AI dans tes projets?  
> 5/ si tu développes, utilises tu plutôt deux écrans?  
> 6/ pc? Mac? Linux? Qu’est ce qui est le plus convenable?

----

## Quels sont les langages les plus utilisés par les développeurs ?

Dans le développement web, il y a une distinction courante (mais perméable)
entre le développement front-end et le développement back-end. Certain·e·s ne
font que l'un ou que l'autre. Et d'autres font les deux (full stack).

Tu trouveras en ligne avec quelques recherches Google tout un tas de résultats
et débats (stériles ?) à ce propos. Certains plus partiaux que d'autres, mais
pour résumer (et de mon point de vu, également partial) aujourd'hui les deux
langages de développement dominants (dans le web) sont le Python et le
JavaScript.

### Les outils et langages des développeur·euse·s front-end

Aujourd'hui le terme *développeur·euse front-end* est parfois un peu
fourre-tout, ou utilisé par "mode". Dans l'usage dont j'ai l'habitude, il y a
une différence, non pas en termes de niveau compétence, mais de domaine
d'expertise, entre un·e **intégrateur·trice** web et un·e **développeur·euse**
front-end.

*Cette distinction est beaucoup moins faite (ou faite différemment) dans le
monde anglo-saxon.*

#### Intégrateur·trice web

Son rôle est, à partir d'une maquette graphique, d'une charte graphique, d'un
modèle, de créer/construire la partie visible d'une interface web. Ses outils
sont généralement Photoshop, [Sketch][], [Figma][],… (ou autre applications de
traitement d'images), et surtout le HTML et le CSS. Le JavaScript fait également
partie de sa panoplie, mais n'est pas son langage principal.  
En plus de l'aspect graphique, le respect des standards web, le [SEO][], le
référencement, l'accessibilité font partie de ses préoccupations principales.

Voici quelques articles qui étayeront ce propos :

- [Je suis intégratrice web et, non, le métier d’intégrateur n’est pas voué à
  disparaître][lelutinduweb]
- [Les mots qui fâchent (2) : intégrateur web vs. développeur
  front-end][marieguillaumet]
- [Je ne suis pas développeur][stpo]

*De 2006 à 2016, l'intégration web était mon cœur de métier.*

[Sketch]: https://fr.wikipedia.org/wiki/Sketch_(logiciel)
[Figma]: https://www.figma.com/
[SEO]: https://fr.wikipedia.org/wiki/Optimisation_pour_les_moteurs_de_recherche

[lelutinduweb]: https://www.lelutinduweb.fr/je-suis-integrateur-web/
[marieguillaumet]: https://marieguillaumet.com/les-mots-qui-fachent-2-integrateur-web-vs-developpeur-front-end/
[stpo]: https://www.stpo.fr/blog/je-ne-suis-pas-developpeur/

#### Développeur·euse front-end

Son travail est beaucoup plus proche de celui de son équivalent back-end. Son
objectif principal est de concevoir et réaliser l'ensemble des fonctionnalités
qui seront exécutées et rendues possibles dans la navigateur web. Le JavaScript
est son langage principal (Le [TypeScript][] détient également une certaine
popularité).

Voici une [feuille de route du développement front-end][roadmap-front] qui offre
une bonne vue d'ensemble des technologies de cette partie du web.

*À partir de  2016, j'ai mis l'intégration web de côté pour me concentrer plus
spécifiquement sur le développement front-end.*

[TypeScript]: https://fr.wikipedia.org/wiki/TypeScript
[roadmap-front]: https://roadmap.sh/frontend

### Les outils et langages des développeur·euse·s back-end

Le Python est probablement aujourd'hui le langage de développement back-end le
plus populaire, mais pas nécessairement le plus courant. Le PHP était il y a peu
encore le leader. De ce fait, il existe un nombre considérable de sites et
d'outils exploitant encore ce langage, et il a encore de l'avenir devant lui.

N'étant pas moi même développer back-end, j'ignore s'il est possible aujourd'hui
d'être expert à la fois sur le PHP et le Python. Il est probable qu'à un moment
ou un autre (après quelques années d'experience), il faille faire un choix.

Pour finir, dans certaines branches industrielles, le [Java][] reste encore très
présent. Souvent le cœur de métier de ces développeurs n'est plus nécessairement
le *web*, mais est dédié à des applications particulières. Lorsqu'il s'agit d'y
ajouter un pendant *web*, ils conservent cet environnement.

Pour un panorama complet, il faut également aller jeter un œil du côté du
[C#][], de [Ruby][], [Rust][], et [Go][].

Sans oublier **les bases de données**.  
Sans forcement chercher à connaître complètement le SQL, il est nécessaire de
comprendre la logique des principaux [types de base de donnée][SGBD]
(relationnelle, orientée document,…) qu'on utilisera le plus souvent à travers
des [ORM][] ou des [API][].

Voici une [feuille de route du développement back-end][roadmap-back]. Comme
celle du front-end, c'est un bon moyen d'identifier les technologies et
priorités.

[SGBD]: https://fr.wikipedia.org/wiki/Syst%C3%A8me_de_gestion_de_base_de_donn%C3%A9es
[ORM]: https://fr.wikipedia.org/wiki/Mapping_objet-relationnel
[API]: https://fr.wikipedia.org/wiki/Interface_de_programmation
[roadmap-back]: https://roadmap.sh/backend

[Java]: https://fr.wikipedia.org/wiki/Java_(technique)
[C#]: https://fr.wikipedia.org/wiki/C_sharp
[Ruby]: https://fr.wikipedia.org/wiki/Ruby
[Rust]: https://fr.wikipedia.org/wiki/Rust_(langage)
[Go]: https://fr.wikipedia.org/wiki/Go_(langage)

----

## Quels sont les frameworks les plus utilisés ?

Arbitrairement, je dirais [React][]/[Angular][]/[Vue][] pour le front-end,
[Django][] pour le back-end Python, et [Symfony][] ou [Laravel][] côté PHP. Mais
c'est sans doute pas aussi marqué partout.

Côté front-end, pour avoir plus de détails sur la popularité des différents
outils, je recommande de lire les résultats du dernier [StateOfJS][]. Ce sondage
est loin d'être une représentation parfaite et universelle de l'utilisation du
JavaScript, il faut tenir compte des biais induits par le mode de diffusion et
les participants. Néanmoins ça permet d'avoir un ordre d'idée des tendances.

[React]: https://reactjs.org/
[Angular]: https://angular.io/
[Vue]: https://vuejs.org/
[Django]: https://www.djangoproject.com/
[Symfony]: https://symfony.com/
[Laravel]: https://laravel.com/
[StateOfJS]: https://2019.stateofjs.com/

### Il n'y a pas que les framework dans la vie

D'autres plateformes ont aussi beaucoup d'importances. Notamment les CMS ou les
plateformes e-commerce : Drupal, Magento, Wordpress, Wagtail, DjangoCMS, Plone…

Il y a aussi les bibliothèques (libraries) dont par exemple jQuery fait partie,
mais il y en a beaucoup d'autres, et elles sont parfois complémentaires les unes
avec les autres.

----

## Quel est ton métier exactement ?

Aujourd'hui je suis développeur (web) front-end.

La majeure partie de mon temps consiste à concevoir et développer des
applications ou morceaux d'applications qui seront exécutés par un navigateur
web. L'essentiel de ce travail est en JavaScript et implique React, NodeJS,
MapboxGL et plein d'outils et modules disponibles en ligne.

Mais pas que.

Cela implique également beaucoup d'échanges avec mes collègues sur le travail
que nous faisons. Nous nous relisons les uns les autres, et ainsi améliorons nos
façons de faire et pratiques tant individuelles que collectives.

Les métiers du web, et particulièrement ceux du développement web évoluent
constamment, et excessivement vite. La veille technologique fait donc partie
intégrante de mon métier, et est indispensable pour ne pas se retrouver
complètement dépassé au bout de cinq ans.

----

## Insères-tu de l’AI dans tes projets ?

Aujourd'hui non, absolument pas.

Je préfère parler de machine learning *[(et on devrait parler plus de deep
learning)][machine-learning]*. L'IA est un domaine beaucoup plus large qui est
peu mis en application pratique. L'IA reste essentiellement un *buzzword* pour
vendre.

En front-end, le *machine learning* est marginal, même si certains modèles sont
exploitables, la plupart de ce qui se fait aujourd'hui en développement IA est
plutôt du côté de l'analyse ou de l'enrichissement de données, et donc soit du
côté des développeurs back-end, soit même le plus souvent du côté des *data
scientists*.

Il est d'ailleurs par contre de plus en plus courant de travailler **avec** des
spécialistes du *deep learning* qui interviennent sur les projets web.

[machine-learning]: https://fr.wikipedia.org/wiki/Intelligence_artificielle#Distinction_entre_intelligence_artificielle,_machine_learning_et_deep_learning

----

## Si tu développes, utilises-tu plutôt deux écrans ?

Non, plus maintenant.

Au bureau et chez moi, je dispose d'écrans fixes *larges* (21/9). Ça offre plus
de largeur et permet de juxtaposer plusieurs fenêtres. Donc ça apporte un
certain confort lorsqu'on a beaucoup de choses à afficher.

L'écran large est une alternative plutôt intéressante au *dual screen*. Beaucoup
de mes collègues utilisent un écran externe (22 / 24 / 27 pouces) en plus de
l'écran de leur ordi portable. Ils utilisent donc deux écrans.

Je préfère toujours fonctionner sur un seul écran pour essentiellement deux
raisons. **La première**, moins importante mais qui mérite d'être évoquée : la
santé. À chaque visite médical à la médecine du travail, et depuis toujours pour
les emplois de bureau, on met en garde contre les [TMS][]. Deux écrans
impliquent la plupart du temps une dégradation subtile mais importante de la
position de travail. **La seconde** et la plus importante : la mobilité. Si on
travaille l'essentiel de son temps avec un poste de travail fortement
*personnalisé*, on se retrouve handicapé et dans une situation d'inconfort dès
lors qu'on ne dispose plus de ces paramètres de confort. Être habitué à
travailler sur un seul écran permet d'être capable de concentration et de rester
efficace même lorsqu'on est pas à son bureau habituel *(en conférence, en
atelier, en réunion, chez le client, etc.)*.

[TMS]: https://fr.wikipedia.org/wiki/Trouble_musculo-squelettique_(maladie_professionnelle)

----

## PC ? Mac ? Linux ? Qu’est ce qui est le plus convenable ?

Si on veut faire simple : on s'en fout. Tant que tu parviens à maîtriser tes
outils et ton environnement de travail.

Une fois ceci dit, le milieu du développement web est clairement beaucoup plus
porté sur l'environnement Linux. Si tu as déjà fait un peu de ligne de commande,
Ubuntu est certainement le choix le plus pertinent.

Un Mac peut être un juste milieu dans le sens où, il offre un environnement
plus simple et plus commun à l'utilisation, tout en étant (puisque que basé sur
Unix) capable de choses très équivalentes à ce qui serait fait avec un Linux.

Une machine sous Windows risque d'être plus handicapante qu'autre chose, mais
cela reste tout à fait possible, notamment depuis que Microsoft a introduit
[WSL][] qui permet de faire tourner un système Linux *en même temps* que
Windows.

Du côté des coûts, Linux sera certainement celui qui permettra à résultat et
performances équivalentes, le plus d'économies. À l'opposé, un MacBook sera
certainement beaucoup plus coûteux (en gros le double pour des caractéristiques
équivalentes) mais aura peut-être l'avantage d'une durabilité supérieure (et
encore, ça me semble de moins en moins vrai malheureusement). Par contre, à la
moindre panne, c'est à un revendeur agréé Apple qu'il faudra renvoyer la
machine. Impossible aujourd'hui d'intervenir soit même sur un Mac, alors que bon
nombre de PC permettent encore de changer / étendre mémoire vive et/ou mémoire
de stockage (disque dur).

[WSL]: https://fr.wikipedia.org/wiki/Windows_Subsystem_for_Linux

### Un critère à prendre en compte :

La plupart des outils de développement web sont aujourd'hui disponibles pour ces
trois environnement. Ce n'est par contre pas le cas de **tous** les outils. Par
exemple, la suite Adobe ne pourra être utilisée que sur OS-X et Windows. Sous
Linux, il faudra passer par une machine virtuelle à l'intérieure de laquelle un
Windows exécutera les logiciels Adobe. Ce n'est pas infaisable, mais c'est une
contrainte supplémentaire.

----

# Quelques recommandations

- Après ta formation, fais toi financer la certification [OpQuaSt][] *(je crois
  qu'il y a moyen de se la faire financer par Pôle Emploi par exemple)*. Elle
  n'est pas *capitale* en terme de recrutement *(elle est encore sous-estimée)*,
  mais son contenu et sa qualité en font un excellent moyen de comprendre un
  grand nombre d'aspects de la qualité web.  

- Soit (très) à l'aise avec [Git][]. C'est un outil incontournable et
  indispensable pour tout développeur·euse aujourd'hui. Ne pas le maîtriser peut
  être un vrai handicap. Cela demande un peu de temps à prendre en main, mais
  c'est une compétence cruciale aujourd'hui.  
  ***Par exemple***, *il est utile de comprendre rapidement (tout de suite !) la
  différence entre Git (qui est un outil en ligne de commande, essentiellement
  sur une machine en local), et Github ou Gitlab (qui sont des plateformes web
  offrant un grand nombre de services autour d'un dépôt Git).*  

- Maîtriser l'anglais est un atout indéniable. Ayant cet avantage, profites-en :
  un grand nombre de ressources technologiques (articles de blog, documentations
  d'outils, contributions communautaires) sont exclusivement en anglais.  

- Fait des MOOC : [OpenClassRoom][], [KhanAcademy][] (et d'autres) ont un grand
  nombre de ressources dédiées au web accessibles gratuitement. Ce sera
  certainement un bon complément à la formation.  

- Lis du code, beaucoup de code, simple ou compliqué. Le but est d'apprendre à
  reconnaître certaines structures, certaines façons de faire qu'on appelle des
  [patrons de conception][] ou *design patterns*. La plupart de ces *patrons*
  sont communs à de nombreux langages. Comprendre ces structures et leurs
  intérêts est une étape importante dans l'expérience du développement.  

[OpQuaSt]: https://www.opquast.com/
[Git]: https://git-scm.com/book/en/v2
[KhanAcademy]: https://fr.khanacademy.org/
[OpenClassRoom]: https://openclassrooms.com/fr/dashboard/courses
[patrons de conception]: https://fr.wikipedia.org/wiki/Patron_de_conception
