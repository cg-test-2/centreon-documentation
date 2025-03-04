---
id: upgrade
title: Montée de version de l'extension
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Ce chapitre décrit comment monter de version votre extension Centreon MAP. Pour ce faire, vous devez mettre à niveau les quatre principaux composants :

- le serveur Centreon MAP
- l'interface web Centreon MAP et son widget
- le client lourd (mis à jour automatiquement)
- la base de données MariaDB.

## Prérequis

Avant de mettre à jour le serveur MAP de Centreon, nous vous recommandons vivement d'effectuer un dump (sauvegarde) de votre base de données `centreon_studio`.
Cela vous permettra de revenir facilement à l'état précédent si nécessaire.

Assurez-vous de lire les notes de version pour une explication des fonctionnalités, des corrections et des procédures personnalisées.

**Lorsque vous effectuez une mise à jour vers une nouvelle version majeure ou mineure (c'est-à-dire : A.B.x avec A ou B qui change), vous devez contacter notre service d'assistance pour récupérer le nouveau dépôt**.

### Mise à jour de la clé de signature du RPM

Pour des raisons de sécurité, les clés utilisées pour signer les RPM Centreon sont régulièrement renouvelées. Le dernier changement a eu lieu le 14 octobre 2021.
Lorsque vous effectuez une mise à jour à partir d'une ancienne version, vous devez passer par la [procédure de rotation des clés](../security/key-rotation.md#existing-installation), pour supprimer l'ancienne clé et installer la nouvelle.

## Étape 1 : Serveur Centreon MAP

> Si vous utilisez toujours la version **4.0.X**, vous **devez d'abord installer et exécuter le serveur dans la version 4.1.X avant de passer à la dernière version**.

Exécutez les commandes suivantes pour mettre à niveau votre serveur Centreon MAP :

1. Mettez à jour les dépôts Centreon et Centreon MAP :

<Tabs groupId="sync">
<TabItem value="Alma / RHEL / Oracle Linux 8" label="Alma / RHEL / Oracle Linux 8">

```shell
dnf install -y https://yum.centreon.com/standard/22.04/el8/stable/noarch/RPMS/centreon-release-22.04-3.el8.noarch.rpm
```

</TabItem>
<TabItem value="CentOS 7" label="CentOS 7">

```shell
yum install -y https://yum.centreon.com/standard/22.04/el7/stable/noarch/RPMS/centreon-release-22.04-3.el7.centos.noarch.rpm
```

</TabItem>
</Tabs>

> Installer le dépôt Centreon MAP, vous pouvez le trouver sur le [portail du support] (https://support.centreon.com/s/repositories).

2. Mettez à jour le serveur Centreon MAP :

    ```shell
    yum update centreon-map-server
    ```

3. Activez et démarrez le service **centreon-map** :

    ```shell
    systemctl enable centreon-map
    systemctl start centreon-map
    ```

5. Ce point ne s'applique que si vous avez personnalisé votre fichier de configuration **centreon-map.conf**.
Lors de la mise à jour de votre module MAP, le fichier **/etc/centreon-studio/centreon-map.conf** n'est pas mis à jour automatiquement : le nouveau fichier de configuration apporté par le rpm ne remplace pas l'ancien fichier.
Vous devez copier les modifications manuellement dans votre fichier de configuration personnalisé.

  * L'ancien fichier de configuration est renommé **centreon-map.conf.rpmsave**.
  * La mise à jour installe un nouveau fichier **centreon-map.conf**.

  Lancez une comparaison entre l'ancien fichier de configuration et le nouveau :

  ```shell
  diff -u /etc/centreon-studio/centreon-map.conf /etc/centreon-studio/centreon-map.conf.rpmsave
  ```

  Pour chaque différence entre les fichiers, évaluez si vous devez la copier de **centreon-map.conf.rpmsave** vers **centreon-map.conf**.

## Étape 2 : Interface web Centreon MAP

```shell
yum update centreon-map-web-client
```

Terminez la montée de version :

1. Allez dans **Administration > Extensions > Gestionnaire**.
2. Recherchez **Map web client**.
3. Cliquez sur le bouton de mise à jour (parties module & widget).

## Étape 3 : client lourd Centreon MAP

Si l'ordinateur de l'utilisateur dispose d'une connexion internet, le client lourd est automatiquement mis à jour vers la dernière version correspondant au serveur.

Sinon, le client peut être téléchargé via le menu **Supervision > MAP** et le bouton **client lourd**.

## Étape 4 : Base de données MariaDB

1. Arrêtez le service **centreon-map** :

    ```shell
    systemctl stop centreon-map
    ```

2. Voir [Mettre à jour MariaDB](../upgrade/upgrade-mariadb.md).

3. Si vous avez mis à niveau votre plateforme Centreon vers la version 22.04, le nouveau protocole BBDO v3 est activé.
Vous devez modifier le fichier suivant pour permettre à MAP de fonctionner correctement : `/etc/centreon-studio/studio-config.properties`.

   ```text
   broker.pb.message.enabled=true
   ```

4. Démarrez le service **centreon-map** :

    ```shell
    systemctl start centreon-map
    ```
