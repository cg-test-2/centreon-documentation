---
id: glossary
title: Glossaire des concepts Centreon
---

## Acquittement

Un utilisateur acquitte une ressource pour signifier à son équipe qu'il est au courant de l'incident et qu'il s'en occupe.

Lorsqu'une ressource est acquittée, les [notifications](#notification) sont suspendues et la ressource acquittée est surlignée en jaune dans les écrans de supervision.

Acquitter une ressource ne signifie pas que l'incident est résolu : il le sera lorsque la ressource sera revenue dans son état nominal (**OK** ou **DISPONIBLE**).

**Voir aussi** : [Acquitter un problème](../alerts-notifications/acknowledge.md).

## Action de supervision

Toute action exécutée depuis l’interface permettant d’agir sur votre supervision en temps réel. Par exemple, [faire un acquittement](#acquittement), planifier une [plage de maintenance](#plage-de-maintenance), forcer un contrôle, etc. 

## Collecteur

Un collecteur est un serveur de supervision installé dans votre infrastructure, qui supervise vos resources. Un collecteur est rattaché à un [serveur central](#serveur-central).

- Un collecteur Centreon supervise des [ressources](#ressource). Il possède un [moteur de supervision](#moteur-de-supervision).

- Il n’a pas d’interface graphique : les ressources qu’il supervise s’affichent dans l’interface du serveur central auquel il est rattaché.

On appelle aussi “collecteur” le moteur de supervision présent dans un serveur central ou un collecteur.

## Donnée de performance

Voir [**Métrique**](#métrique).

## Engine

Voir [**Moteur de supervision**](#moteur-de-supervision).

## État du problème

Non traité, acquitté, en maintenance.

## FQDN

Fully Qualified Domain Name : correspond au nom d’hôte et de domaine d’un serveur. Ex : demo.centreon.com (nom d’hôte : demo, nom de domaine : centreon.com).

## Graphique

Les graphiques sont générés à partir des [métriques](#métrique) des [services](#service). Ils permettent de représenter l'évolution dans le temps de ces métriques.

**Voir aussi** : [Gestion des graphiques](../metrology/chart-management.md) et les autres topics de cette section.

## Héritage

Principe qui permet qu’un paramètre d’un [modèle](#modèle) soit appliqué sur la ressource qui hérite de ce modèle.

## Hôte

Équipement possédant une adresse IP ou un FQDN, et que l’on veut superviser. Exemples : un serveur Linux, une box internet, un site web, une imprimante 3D, une instance EC2, un hôte docker, une caisse enregistreuse, etc. L’hôte peut avoir un ou plusieurs [services](#service) associés.

Un hôte peut avoir les [statuts](#statut) suivants : DISPONIBLE, INDISPONIBLE et INJOIGNABLE.

**Voir aussi** : [Mettre un hôte en supervision](../monitoring/basic-objects/hosts-create.md) et les autres topics de cette section.

## Métrique

Une métrique ou donnée de performance est rattachée à un [service](#service). Cette donnée permet d’obtenir des graphiques et de positionner des seuils pour être alerté. Ces seuils définissent le [statut](#statut) du service associé à la métrique.

Lorsqu’un service comprend plusieurs métriques, le statut du service est celui de la plus mauvaise métrique.

Vous pouvez voir les métriques associées à un service dans le panneau de détails de celui-ci.

## Modèle

Squelette préconfiguré d’une [ressource](#ressource) qui permet que les paramètres définis sur le squelette soient appliqués sur la ressource qui en hérite automatiquement.

Il existe des modèles d’hôtes et de services.

**Voir aussi** :

- [Utiliser des modèles d'hôtes](../monitoring/basic-objects/hosts-templates.md),
- [Utiliser des modèles de services](../monitoring/basic-objects/services-templates.md),

## Moteur de supervision

Centreon Engine est le composant logiciel qui planifie les contrôles, les exécute et [notifie](#notification) les utilisateurs en cas d’incident.
Il est présent sur les [collecteurs](#collecteur) et le [serveur central](#serveur-central).

## Notification

Message avertissant l’utilisateur d’un incident. Il est possible de paramétrer des notifications sur différents [statuts](#statut).

## Ordonnanceur

Voir [**Moteur de supervision**](#moteur-de-supervision).

## Période temporelle

Une période temporelle définit un intervalle de temps pour chacun des jours de la semaine. Ces périodes temporelles servent à activer les fonctionnalités du [moteur de supervision](#moteur-de-supervision) sur des plages horaires données. Elles permettent de définir :

- quand les commandes de vérification seront exécutées, c’est-à-dire la période de temps durant laquelle on supervise,

- quand des [notifications](#notification) seront envoyées.

**Voir aussi** : [Les périodes temporelles](../monitoring/basic-objects/timeperiods.md).

## Plage de maintenance

Une plage de maintenance ou temps d’arrêt est une période de temps durant laquelle les [notifications](#notification) sont désactivées pour une ressource. Les plages de maintenance sont utilisées lors d'opérations de maintenance programmée ; elles permettent d'éviter de recevoir des alertes de type faux-positif.

**Voir aussi** : [Planifier un temps d'arrêt](../alerts-notifications/downtimes.md).

## Plage de maintenance récurrente

Les temps d'arrêts récurrents sont des temps d'arrêts qui reviennent de manière répétitive.

**Voir aussi** : [Les temps d'arrêt récurrents](../alerts-notifications/downtimes.md#les-temps-darrêt-récurrents).

## Plugin

Est appelé "plugin" une sonde de supervision, c'est-à-dire un binaire exécutable ou un script qui est appelé par le [moteur de supervision](#moteur-de-supervision) pour effectuer un contrôle sur un [hôte](#hôte) ou un [service](#service). Le plugin va déterminer le statut à renvoyer au moteur de supervision à partir des vérifications qu'il fait et des seuils qui ont été définis dans la configuration de l'hôte ou du service.

## Plugin Pack

L'expression "Plugin pack" désigne un [plugin](#plugin) et son pack :

Le pack contient la configuration associée au plugin dans Centreon (commandes, [modèles](#modèle), seuils) ainsi que des éléments nécessaires à la mise en œuvre de la découverte automatique.

**Voir aussi** :

- [Utiliser des Plugin Packs](../monitoring/pluginpacks.md),
- [Introduction aux Plugin Packs](/pp/integrations/plugin-packs/getting-started/introduction).

## Ressource

Objet supervisé par une plateforme Centreon (hôtes, services, métaservices).

## Serveur central

Dans Centreon, le serveur central est la console principale de votre supervision. Il permet :

- de configurer toute la supervision de votre infrastructure,
- des superviser des ressources,
- de consulter la supervision de tous les serveurs Centreon (tous les [collecteurs](#collecteur)) dans son interface web.

## Service

Un service est attaché à un [hôte](#hôte). Il correspond à un point de contrôle de cet hôte. Ce point de contrôle peut être un contrôle : 

- sur le statut d’un composant : est-ce que mon alimentation est branchée ? Est-ce que mon instance est démarrée ?

- sur la performance d’un composant : est-ce que mon site Web est accessible en moins de 0,5s ? Quel est mon niveau d’encre ? Quelle est l’utilisation de la mémoire sur mon serveur ?

Un service peut avoir une ou plusieurs [métriques](#métrique) associées.

Un service peut avoir les [statuts](#statut) suivants : OK, ALERTE, CRITIQUE, INCONNU.

**Voir aussi** : [Mettre un service en supervision](../monitoring/basic-objects/services-create.md) et les autres topics de cette section.

## Statut

Indique :

- la disponibilité d'un [hôte](#hôte) (DISPONIBLE, INDISPONIBLE, INJOIGNABLE),
- la disponibilité ou la performance d'un [service](#service) (OK, ALERTE, CRITIQUE, INCONNU).

EN ATTENTE n’est pas un statut: les ressources sont "en attente" lorsqu'elles viennent d'être créées et n'ont pas encore été contrôlées.

**Voir aussi** : [Statuts possibles d'une ressource](../alerts-notifications/concepts.md).

## Temps d’arrêt

Voir [**Plage de maintenance**](#plage-de-maintenance).

## Type de statut

Indique si un changement de [statut](#statut) est confirmé (HARD) ou non-confirmé (SOFT). Par exemple, l’envoi de notifications ne se déclenche que lors du passage à un statut de type HARD.

**Voir aussi** : [Types de statuts](../alerts-notifications/concepts.md#types-de-statuts).

## Widget

Élément visuel configurable permettant d’afficher des données dans une vue personnalisée.

**Voir aussi** : [Vues personnalisées](../alerts-notifications/custom-views.md).
