---
id: cloud-azure-database-sqlmanagedinstance
title: Azure SQL Managed Instance
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Overview

Azure SQL Managed Instance is a service designed to facilitate the migration of
apps from on-premises to a fully managed and secured PaaS cloud environment 
with automatic patching and version updates, automated backups and high 
availability.

The Centreon Plugin-Pack *Azure SQL Managed Instance* can rely on Azure API or Azure CLI 
to collect the metrics related to the SQL Managed Instance service.

## Plugin Pack Assets

### Monitored Objects

* Azure *SQL Managed Instance* instances

### Discovery rules

The Centreon Plugin-Pack *Azure SQL Managed Instance* includes a Host Discovery *provider* to automatically discover the Azure instances of a given
subscription and add them to the Centreon configuration.
This provider is named **Microsoft Azure SQL Managed Instance**:

![image](../../../assets/integrations/plugin-packs/procedures/cloud-azure-database-sqlmanagedinstance-provider.png)

> This discovery feature is only compatible with the 'api' custom mode. 'azcli' is not supported yet.

More information about the Host Discovery module is available in the Centreon documentation:
[Host Discovery](/docs/monitoring/discovery/hosts-discovery)

### Collected metrics and status

<Tabs groupId="sync">
<TabItem value="Cpu" label="Cpu">

| Metric Name                                   | Description            | Unit  |
|:----------------------------------------------|:-----------------------|:------|
| sqlmanagedinstance.cpu.utilization.percentage | Average CPU percentage | %     |
| sqlmanagedinstance.cpu.virtualcores.count     | Virtual core count     | Count |

</TabItem>
<TabItem value="Storage" label="Storage">

| Metric Name                                     | Description            | Unit  |
|:------------------------------------------------|:-----------------------|:------|
| sqlmanagedinstance.storage.space.reserved.count | Storage space reserved | Count |
| sqlmanagedinstance.storage.space.used.count     | Storage space used     | Count |

</TabItem>
<TabItem value="Diskio" label="Diskio">

| Metric Name                            | Description       | Unit  |
|:---------------------------------------|:------------------|:------|
| sqlmanagedinstance.bytes.read.bytes    | IO bytes read     | B     |
| sqlmanagedinstance.bytes.written.bytes | IO bytes written  | B     |
| sqlmanagedinstance.io.requests.count   | IO requests count | Count |

</TabItem>
<TabItem value="Health" label="Health">

| Status Name | Description                 |
|:------------|:----------------------------|
| status      | Current operational status  |
| summary     | Last related status message |

</TabItem>
</Tabs>

## Prerequisites

Please find all the prerequisites needed for Centreon to get information from Azure in the [dedicated page](../getting-started/how-to-guides/azure-credential-configuration.md).

## Setup 

<Tabs groupId="sync">
<TabItem value="Online License" label="Online License">

1.  Install the Centreon Plugin package on every Centreon poller expected to monitor Azure SQL Managed Instance resources:

```bash
yum install centreon-plugin-Cloud-Azure-Database-SqlManagedInstance-Api
```

2. On the Centreon Web interface, install the *Azure SQL Managed Instance* Centreon Plugin-Pack on the "Configuration > Plugin Packs > Manager" page

</TabItem>
<TabItem value="Offline License" label="Offline License">

1. Install the Centreon Plugin package on every Centreon poller expected to monitor Azure SQL Managed Instance resources:

```bash
yum install centreon-plugin-Cloud-Azure-Database-SqlManagedInstance-Api
```

2. Install the Centreon Plugin-Pack RPM on the Centreon Central server:

```bash
yum install centreon-pack-cloud-azure-database-sqlmanagedinstance.noarch
```

3. On the Centreon Web interface, install the *Azure SQL Managed Instance* Centreon Plugin-Pack on the "Configuration > Plugin Packs > Manager" page

</TabItem>
</Tabs>

## Configuration

### Host

* Log into Centreon and add a new Host through "Configuration > Hosts".
* In the *IP Address/FQDN* field, set the following IP address: '127.0.0.1'.

* Select the *Cloud-Azure-Database-SqlManagedInstance-custom* template to apply to the Host.
* Once the template applied, some Macros marked as 'Mandatory' hereafter have to be configured.
These mandatory Macros differ regarding the custom mode used:

<Tabs groupId="sync">
<TabItem value="Azure Monitor API" label="Azure Monitor API">

| Mandatory | Nom               | Description                             |
|:----------|:------------------|:----------------------------------------|
| X         | AZURECUSTOMMODE   | Custom mode 'api'                       |
| X         | AZURESUBSCRIPTION | Subscription ID                         |
| X         | AZURETENANT       | Tenant ID                               |
| X         | AZURECLIENTID     | Client ID                               |
| X         | AZURECLIENTSECRET | Client secret                           |
| X         | AZURERESOURCE     | Id of the SQL Managed Instance instance |

</TabItem>
<TabItem value="Azure AZ CLI" label="Azure AZ CLI">

| Mandatory | Nom               | Description                             |
|:----------|:------------------|:----------------------------------------|
| X         | AZURECUSTOMMODE   | Custom mode 'azcli'                     |
| X         | AZURESUBSCRIPTION | Subscription ID                         |
| X         | AZURERESOURCE     | Id of the SQL Managed Instance instance |

</TabItem>
</Tabs>

## FAQ

### How to check in the CLI that the configuration is OK and what are the main options for ?

Once the Plugin installed, log into your Centreon Poller CLI using the *centreon-engine* 
user account and test the Plugin by running the following command:

```bash
/usr/lib/centreon/plugins/centreon_azure_database_sqlmanagedinstance_api.pl \
    --plugin=cloud::azure::database::sqlmanagedinstance::plugin \
    --mode=cpu \
    --custommode=api \
    --subscription='xxxxxxxxx' \
    --tenant='xxxxxxxxx' \
    --client-id='xxxxxxxxx' \
    --client-secret='xxxxxxxxx' \
    --resource='SQL01' \
    --resource-group='RSG123' \
    --timeframe='900' \
    --interval='PT5M' \
    --aggregation='Average' \
    --warning-cpu-average='80' \
    --critical-cpu-average='90'
```

Expected command output is shown below:

```bash
OK: Instance 'SQL01' Statistic 'average' Metrics Average CPU percentage: 55.00, Virtual core count: 2 | 'SQL01~average#qlmanagedinstance.cpu.utilization.percentage'=55.00%;0:80;0:90;0; 'SQL01~average#sqlmanagedinstance.cpu.virtualcores.count'=2;;;0; 
```

The command above checks the *CPU* usage of an Azure *SQL Managed Instance* instance using the 'api' custom-mode
(```--plugin=cloud::azure::database::sqlmanagedinstance::plugin --mode=cpu --custommode=api```).
This SQL Managed Instance instance is identified by its id (```--resource='SQL01'```) and the authentication parameters
to be used with the custom mode are specified in the options (```--subscription='xxxxxxxxx' --tenant='xxxxxxx'
--client-id='xxxxxxxx' --client-secret='xxxxxxxxxx'```).

The calculated metrics are the average (```--aggregation='average'```) of values on a 900 secondes / 15 min period (```--timeframe='900'```)
with one sample per 5 minutes (```--interval='PT5M'```).

This command would trigger a WARNING alarm if the *CPU* usage of the instance is reported as over 80% of its capacity
(```--warning-cpu-average='80'```) and a CRITICAL alarm over 90% (```--critical-cpu-average='90'```).

All the available options for a given mode can be displayed by adding the ```--help``` parameter to the command:

```bash
/usr/lib/centreon/plugins/centreon_azure_database_sqlmanagedinstance_api.pl \
    --plugin=cloud::azure::database::sqlmanagedinstance::plugin \
    --mode=cpu \
    --help
```

### Troubleshooting

#### The Azure credentials have changed and the Plugin does not work anymore

The Plugin is using a cache file to keep connection information and avoid an authentication at each call. 
If some of the authentication parameters change, you must delete the cache file. 

The cache file can be found within  ```/var/lib/centreon/centplugins/``` folder with a name similar to azure_api_`<md5>_<md5>_<md5>_<md5>`.

#### ```UNKNOWN: Login endpoint API returns error code 'ERROR_NAME' (add --debug option for detailed message)```

When I run my command I obtain the following error message:
```UNKNOWN: Login endpoint API returns error code 'ERROR_NAME' (add --debug option for detailed message)```.

It means that some parameters used to authenticate the API request are wrong. The 'ERROR_NAME' string gives 
some hints about where the problem stands. 

As an example, if my Client ID or Client Secret are wrong, 'ERROR_DESC' value will be 'invalid_client'. 

#### ```UNKNOWN: 500 Can't connect to login.microsoftonline.com:443```

This error message means that the Centreon Plugin couldn't successfully connect to the Azure Login API. Check that no third party
device (such as a firewall) is blocking the request. A proxy connection may also be necessary to connect to the API.
This can be done by using this option in the command: ```--proxyurl='http://proxy.mycompany:8080'```.

#### ```UNKNOWN: No metrics. Check your options or use --zeroed option to set 0 on undefined values```

This command result means that Azure does not have any value for the requested period.
This result can be overriden by adding the ```--zeroed``` option in the command. This will force a value of 0 when no metric has
been collected and will prevent the UNKNOWN error message.
