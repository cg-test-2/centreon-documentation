---
id: known-issues
title: Problèmes connus
---

Voici une liste de problèmes connus et/ou bugs que vous pouvez rencontrer.
Nous essayons ici de fournir des contournements.
Nous appliquons des correctifs lorsque cela est nécessaire et améliorons continuellement notre logiciel afin de résoudre les problèmes de prochaines versions.

## Centreon Web

### Résultats incohérents lors de la supervision d'un métaservice

Cet incident peut se produire lorsque vous créez un métaservice lié à des services supervisés tels que des services Ping par exemple. Alors que les services Ping renvoient des résultats corrects, les résultats reçus dans le panneau de détail pour le métaservice peuvent être incohérents et renvoyer le statut **inconnu** avec un message.

#### Contournement

Il n'existe actuellement pas de contournement.

### Environment variable not found: "hostCentreon"

Lors de l'installation d'un serveur central (ou d'un serveur distant), un message d'erreur apparaît pendant un court instant dans la barre de notification lors de l'accès à l'assistant pour terminer l'installation. Le message d'erreur est le suivant :

```sql
The controller for URI "/centreon/api/latest/platform/versions" is not callable: Environment variable not found: "hostCentreon".
```

#### Contournement

Il n'y a pas de solution de contournement et ce message n'empêche pas de finaliser l'installation.

### Vous avez atteint le nombre maximum d'id dans la table centreon_storage.index_data

#### Contournement

Exécutez les requêtes suivantes dans MariaDB :

Dans votre base de données temps réel :
```sql
ALTER TABLE index_data MODIFY id bigint unsigned AUTO_INCREMENT;
ALTER TABLE metrics MODIFY index_id bigint unsigned;
```

Dans votre base de données de configuration :
```sql
ALTER TABLE ods_view_details MODIFY index_id bigint unsigned;
ALTER TABLE virtual_metrics MODIFY index_id bigint unsigned;
```

> Selon la volumétrie de vos métriques, cette opération peut être plus ou moins longue.

### L'Autologin ne fonctionne pas avec certaines pages

#### Description

L'autologin n'est actuellement pas géré pour les pages suivantes :

* **Monitoring > Resources Status**
* **Configuration > Hosts > Discovery**
* **Configuration > Business Activity > Business Views**
* **Configuration > Business Activity > Business Activity**

#### Contournement

Il n'existe actuellement pas de contournement.

## Anomaly Detection

### Impossible de superviser un service de détection d'anomalies lié à un métaservice

Lorsque vous créez un métaservice auquel est lié un service de détection des anomalies, il se peut que vous ne receviez pas de données pour les graphiques et les prédictions.

#### Contournement

Il n'existe actuellement pas de contournement.

## Centreon MBI

### MBI ne fonctionne pas si les bases de données ont des noms personnalisés

#### Contournement

Il n'existe actuellement pas de contournement.

### L'onglet Paramètres du rapport d'une tâche est vide

#### Description

L'onglet **Paramètres du rapport** d'une tâche est vide (**Rapports > Monitoring Business Intelligence > Tâches**)

#### Contournement

* Allez à l'onglet **Configuration** de la tâche
* Sélectionnez un modèle différent dans la liste **Modèle de rapport**
* Sélectionnez le bon modèle de rapport
* Retournez sur l'onglet **Paramètres du rapport**

### Vous avez atteint le nombre maximum d'id pour les colonnes servicemetric_id

#### Description

Si vous possédez une très large infrastructure, il est possible que la taille limite de la colonne `servicemetric_id` soit atteinte.

#### Contournement

> Selon la volumétrie des données, cette opération peut être plus ou moins longue.

* Connectez-vous sur le serveur de reporting
* Désactivez la tâche planifiée dans `/etc/cron.d/centreon-bi-engine` :

    ```shell
    #30 4 * * * root /usr/share/centreon-bi//bin/centreonBIETL -d >> /var/log/centreon-bi//centreonBIETL.log 2>&1
    ```

* Exécutez les requêtes suivantes dans la base de données `centreon_storage` :

    ```sql
    ALTER TABLE mod_bi_metricdailyvalue MODIFY servicemetric_id BIGINT(20) UNSIGNED NOT NULL;
    ALTER TABLE mod_bi_metrichourlyvalue MODIFY servicemetric_id BIGINT(20) UNSIGNED NOT NULL;
    ALTER TABLE mod_bi_metricmonthcapacity MODIFY servicemetric_id BIGINT(20) UNSIGNED NOT NULL;
    ALTER TABLE mod_bi_metriccentiledailyvalue MODIFY servicemetric_id BIGINT(20) UNSIGNED NOT NULL;
    ALTER TABLE mod_bi_metriccentilemonthlyvalue MODIFY servicemetric_id BIGINT(20) UNSIGNED NOT NULL;
    ALTER TABLE mod_bi_metriccentileweeklyvalue MODIFY servicemetric_id BIGINT(20) UNSIGNED NOT NULL;
    ALTER TABLE mod_bi_servicemetrics MODIFY id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT;
    ```

* Activez la tâche planifiée dans `/etc/cron.d/centreon-bi-engine` :

    ```shell
    30 4 * * * root /usr/share/centreon-bi//bin/centreonBIETL -d >> /var/log/centreon-bi//centreonBIETL.log 2>&1
    ```

* Si l'opération est effectuée pendant le lancement habituel de la tâche planifiée, exécutez la commande suivante en indiquant les bonnes dates de début et de fin :

    ```shell
    /usr/share/centreon-bi/bin/centreonBIETL -rIEDP -s YYYY-MM-DD -e YYYY-MM-DD
    ```
