---
id: cloud-microsoft-office365-sharepoint
title: Office365 SharePoint
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Vue d'ensemble

La suite Microsoft Office 365 inclut Sharepoint, un service de gestion de 
document et d'hébergement de fichier.

Les informations de supervision de la suite Office sont mises à disposition par
Microsoft au travers d'une API de gestion Office 365.

> Les données mises à disposition par l'API de gestion Office 365 ne sont pas en temps réel et sont basées sur une période de 7 jou

## Contenu du Plugin-Pack

### Objets supervisés

* Activité du site sharepoint site usage
* Activité des utilisateurs

### Métriques collectées

Plus d'informations sur les métriques collectées sur la documentation officielle
de Microsoft :  

* https://docs.microsoft.com/fr-fr/microsoft-365/admin/activity-reports/sharepoint-site-usage?view=o365-worldwide
* https://docs.microsoft.com/fr-fr/microsoft-365/admin/activity-reports/sharepoint-activity?view=o365-worldwide

<Tabs groupId="sync">
<TabItem value="Site-Usage" label="Site-Usage">

| Metric name                                    | Description                              | Unit   |
| :--------------------------------------------- | :--------------------------------------- | :----- |
| sharepoint.sites.active.count                  | Number of active sites                   | Count  |
| sharepoint.sites.active.usage.total.bytes      | Total usage space (active sites)         | Bytes  | 
| sharepoint.sites.inactive.usage.total.bytes    | Total usage space (inactive sites)       | Bytes  |
| sharepoint.sites.active.files.total.count      | Total number of files (active sites)     | Count  |
| sharepoint.sites.inactive.files.total.count    | Total number of files (inactive sites )  | Count  |
| sharepoint.sites.files.active.total.count      | Total number of active files             | Count  |
| sharepoint.sites.pages.visited.total.count     | Total number of visited pages            | Count  |  
| sharepoint.sites.pages.viewed.total.count      | Total numver of viewed pages             | Count  |

</TabItem>
<TabItem value="User-Activity" label="User-Activity">

| Metric name                                           | Description                                    | Unit   |
| :---------------------------------------------------- | :--------------------------------------------- | :----- |
| sharepoint.users.active.count                         | Total number of active users                   | Count  |
| sharepoint.users.files.viewed.total.count             | Total number of viewed or edited files         | Count  | 
| sharepoint.users.files.synced.total.count             | Total number of files synced                   | Count  |
| sharepoint.users.files.shared.internally.total.count  | Total number of files share internally         | Count  |
| sharepoint.users.files.shared.externally.total.count  | Total number of files share externally         | Count  |
| sharepoint.users.pages.visited.total.count            | Total number of visited pages (active sites)   | Count  |

</TabItem>
</Tabs>

Une fois l'hôte crée, les macros de services peuvent être configurées pour
filtrer les métriques par utilisateurs ou par boites mail. Plus d'informations
dans la section [Configuration](#Configuration).

## Prérequis

Si vous n'avez pas encore créé votre compte sous Office 365, reportez-vous à la
documentation d'Office 365 Management ou suivez le lien dans la partie
'Aide supplémentaire'.

### Enregistrez une application

Les API de gestion Office 365 utilisent Azure AD pour assurer l’authentification
sécurisée des données dans Office 365. Pour accéder aux API de gestion
Office 365, vous devez enregistrer votre application dans Azure AD. Le terme
*Application* est utilisé comme concept, faisant référence non seulement au
programme d’application, mais également à son inscription Azure AD et à son rôle
lors des « dialogues » d’authentification/autorisation au moment de l’exécution.
(https://docs.microsoft.com/fr-fr/azure/active-directory/develop/app-objects-and-service-principals)

### Spécifiez les autorisations dont votre application a besoin pour accéder aux API de gestion Office 365

Afin de récupérer les données d'Sharepoint Online, vous devez spécifier les
autorisations que votre application requiert: 
dans le Portail de gestion Azure :

* Microsoft Graph :
    * Reports.Read.All (Type : Application)
    * User.Read (Type : Delegated)
* Office365 Management APIs :
    * ServiceHealth.Read (Type : Application)
    * ActivityFeed.Read (Type : Application)

### Aide supplémentaire

Suivez le guide pratique pour obtenir une explication complète sur la façon d’enregistrer une demande et d’obtenir un *ID client* et un *ID secret* :
https://docs.microsoft.com/fr-fr/office/office-365-management-api/get-started-with-office-365-management-apis

## Installation

<Tabs groupId="sync">
<TabItem value="Online License" label="Online License">

1. Installer le Plugin sur l'ensemble des collecteurs Centreon supervisant des ressources Office 365 Sharepoint :

```bash
yum install centreon-plugin-Cloud-Microsoft-Office365-Sharepoint-Api
```

2. Depuis l'interface Web de Centreon, installer le Plugin-Pack *Office365 Sharepoint* depuis la page "Configuration > Plugin packs > Manager" 

</TabItem>
<TabItem value="Offline License" label="Offline License">

1. Installer le Plugin sur l'ensemble des collecteurs Centreon supervisant des ressources Office 365 Sharepoint :

```bash
yum install centreon-plugin-Cloud-Microsoft-Office365-Sharepoint-Api
```

2. Sur le serveur Central Centreon, installer le RPM du Plugin-Pack 'Office365 Sharepoint' :

```bash
yum install centreon-pack-cloud-microsoft-office365-sharepoint
```

3. Depuis l'interface Web de Centreon, installer le Plugin-Pack *Office365 Sharepoint* depuis la page "Configuration > Plugin packs > Manager"

</TabItem>
</Tabs>

## Configuration

Lors de la création de votre Hôte dans Centreon, choisissez le modèle
*Cloud-Microsoft-Office365-Sharepoint-Api-custom*. Une fois celui-ci appliqué, 
certaines Macros liées à l'Hôte doivent être renseignées :

| Mandatory | Name                  | Description                                                                |
| :-------- | :-------------------- | :------------------------------------------------------------------------- |
| X         | OFFICE365CUSTOMMODE   | Access mode for the Plugin (default: 'graphapi')                           |
| X         | OFFICE365TENANT       | Tenant-id of your Office365 organization                                   |
| X         | OFFICE365CLIENTID     | Client-id of your registered application                                   |
| X         | OFFICE365CLIENTSECRET | Secret-if of your registered application                                   |
|           | OFFICE365EXTRAOPTIONS | Any extra option you may want to add to the command (eg. a --verbose flag) |

La métrique *perfdate* enrengistre la date à laquelle celle-ci a été collectée. 
Vous pouvez la filter en paramétrant la macro *OFFICE365EXTRAOPTIONS* avec 
l'option ```--filter-perfdata='^(?!.*perfdate).*$'```

Une fois l'hôte créé, il est également possible de paramétrer un ensemble de
macros de service selon la configuration souhaitée :

| Mandatory | Name          | Description                                        |
| :-------- | :------------ | :------------------------------------------------- |
|           | FILTERURL     | Filter specific sites by URLs                      |
|           | FILTERID      | Filter specific sites by ID                        |
|           | FILTERUSERS   | Filter by specific users                           |
|           | FILTERCOUNTER | Filter specific counters (default:'active\|total') |

## FAQ

### Comment tester le Plugin Office 365 Onedrive en ligne de commande et que signifient les options principales ?

Une fois le Plugin installé, vous pouvez tester directement celui-ci en ligne de
commande depuis votre collecteur Centreon avec l'utilisateur *centreon-engine* :

```bash
/usr/lib/centreon/plugins//centreon_office365_sharepoint_api.pl \
  --plugin=cloud::microsoft::office365::sharepoint::plugin \
  --mode=site-usage \
  --tenant='abcd1234-5678-90ab-cd12-34567890abcd' \
  --client-id='9876dcba-5432-10dc-ba98-76543210dcba' \
  --client-secret='8/RON4vUGhAcg6DRmSxc4AwgxSRoNfKg4d8xNizIMnwg='
```

Résultat attendu :

```bash
OK: Active sites on 2020-09-27 : 3/1031 (0.29%) - Total Usage (active sites)
893.84 MB, Usage (inactive sites): 149.03 GB, File Count (active sites): 154,
File Count (inactive sites): 26643, Active File Count (active sites): 5 |
'active_sites'=3sites;;;0;1031
'total_usage_active'=937260440B;;;0;
'total_usage_inactive'=160024822615B;;;0;
'total_file_count_active'=154;;;0;
'total_file_count_inactive'=26643;;;0;
'total_active_file_count'=5;;;0;
```

The available thresholds as well as all of the options that can be used with
this Plugin can be displayed by adding the ```--help``` parameter to the command:

```bash
/usr/lib/centreon/plugins//centreon_office365_sharepoint_api.pl \
  --plugin=cloud::microsoft::office365::sharepoint::plugin \
  --mode=site-usage \
  --custommode='graphapi'\
  --help
```

Tous les modes disponibles dans le Plugin peuvent être listés via la commande
suivante :

```bash
/usr/lib/centreon/plugins//centreon_office365_sharepoint_api.pl \
  --plugin=cloud::microsoft::office365::sharepoint::plugin \
  --list-mode
```

### Le Plugin renvoie les erreurs suivantes :

#### ```UNKNOWN: 500 Can't connect to ...:443```

Cette erreur signifie que le Plugin Centreon n'a pas pu se connecter à l'API de 
gestion Office 365. Vérifiez que la requête n'a pas bloquée par un outil externe
(un pare-feu par exemple). Si vous utilisez un proxy, renseignez son URL dans 
les macros *EXTRAOPTIONS* des services correspondants ou directement dans la 
commande avec l'option ```--proxyurl```.

#### ```UNKNOWN: 501 Protocol scheme 'connect' is not supported |```

Dans certains cas, et plus spécifiquement lors de l'usage d'un proxy
d'entreprise, le protocole de connexion n'est pas supporté par la libraire *lwp*
utlisée par défaut par le Plugin Centreon.

Cette erreur peut être résolue en utilisant le backend HTTP *curl*.
Pour ce faire, ajoutez l'option ```--http-backend='curl'``` à la commande.
