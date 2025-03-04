---
id: cloud-azure-network-cdn
title: Azure CDN
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

Azure Content Delivery Network is a solution designed for developers for 
delivering high-bandwidth content to customers.

The Centreon Plugin-Pack *Azure CDN* can rely on Azure API or Azure CLI to 
collect the metrics related to CDN profile service.

## Pack assets

### Monitored objects

* Hit-Ratio 
* Latency
* Requests
* Response-Size

### Discovery rules

The Centreon Plugin-Pack *Azure CDN* includes a Host Discovery *provider* to
automatically discover the Azure instances of a given subscription and add them
to the Centreon configuration. This provider is named **Microsoft Azure CDN**:

![image](../../../assets/integrations/plugin-packs/procedures/cloud-azure-network-cdn-provider.png)
> This discovery feature is only compatible with the 'api' custom mode. 'azcli' is not supported yet.
More information about the Host Discovery module is available in the Centreon
documentation:
[Host Discovery](/docs/monitoring/discovery/hosts-discovery)

### Collected metrics & status

<Tabs groupId="sync">
<TabItem value="Hit-Ratio" label="Hit-Ratio">

| Metric name             | Description    | Unit |
|:------------------------|:---------------|:-----|
| cdn.byte.hit.percentage | Byte Hit Ratio | %    |

</TabItem>
<TabItem value="Latency" label="Latency">

| Metric name                    | Description   | Unit |
|:-------------------------------|:--------------|:-----|
| cdn.latency.total.milliseconds | Total Latency | ms   |

</TabItem>
<TabItem value="Requests" label="Requests">

| Metric name                 | Description       | Unit  |
|:----------------------------|:------------------|:------|
| cdn.requests.count          | Request count     | count |
| cdn.requests.4xx.percentage | Percentage of 4XX | %     |
| cdn.requests.5xx.percentage | Percentage of 5XX | %     |

</TabItem>
<TabItem value="Response-Size" label="Response-Size">

| Metric name             | Description   | Unit |
|:------------------------|:--------------|:-----|
| cdn.response.size.bytes | Response Size | B    |

</TabItem>
</Tabs>

## Prerequisites

Please find all the prerequisites needed for Centreon to get information from Azure on the [dedicated page](../getting-started/how-to-guides/azure-credential-configuration.md).

## Setup

<Tabs groupId="sync">
<TabItem value="Online License" label="Online License">

1. Install the Centreon Plugin package on every Centreon Poller expected to monitor *Azure CDN* ressources:

```bash
yum install centreon-plugin-Cloud-Azure-Network-CDN-Api
```

2. On the Centreon Web interface, install the *Azure CDN* Centreon Plugin Pack on the "Configuration > Plugin Packs" page

</TabItem>
<TabItem value="Offline License" label="Offline License">

1. Install the Centreon Plugin package on every Centreon Poller expected to monitor *Azure CDN* ressources:

```bash
yum install centreon-plugin-Cloud-Azure-Network-CDN-Api
```

2. Install the *Azure CDN* Centreon Plugin Pack RPM on the Centreon Central server:

```bash
yum install centreon-pack-cloud-azure-network-cdn
```

3. On the Centreon Web interface, install the *Azure CDN* Centreon Plugin Pack on the "Configuration > Plugin Packs" page

</TabItem>
</Tabs>

## Configuration

### Host

* Log into Centreon and add a new Host through "Configuration > Hosts".
* In the *IP Address/FQDN* field, set the following IP address: '127.0.0.1'.

* Select the *Cloud-Azure-Network-CDN-custom* template to apply to the Host.
* Once the template applied, some Macros marked as 'Mandatory' hereafter have to be configured.
These mandatory Macros differ regarding the custom mode used.

> Two methods can be used to set the Macros:
> * full ID of the Resource (`/subscriptions/<subscription_id>/resourceGroups/<resourcegroup_id>/providers/Microsoft.EventHub/<resource_type>/<resource_name>`)
in *AZURERESOURCE*
> * Resource Name in *AZURERESOURCE* associated with Resource Group (in *AZURERESOURCEGROUP*)

<Tabs groupId="sync">
<TabItem value="Azure Monitor API" label="Azure Monitor API">

| Mandatory | Nom                | Description                                        |
|:----------|:-------------------|:---------------------------------------------------|
| X         | AZURECUSTOMMODE    | Custom mode 'api'                                  |
| X         | AZURESUBSCRIPTION  | Subscription ID                                    |
| X         | AZURETENANT        | Tenant ID                                          |
| X         | AZURECLIENTID      | Client ID                                          |
| X         | AZURECLIENTSECRET  | Client secret                                      |
| X         | AZURERESOURCE      | ID or name of the CDN profile resource             |
|           | AZURERESOURCEGROUP | Associated Resource Group if resource name is used |

</TabItem>
<TabItem value="Azure AZ CLI" label="Azure AZ CLI">

| Mandatory | Nom                | Description                                        |
|:----------|:-------------------|:---------------------------------------------------|
| X         | AZURECUSTOMMODE    | Custom mode 'azcli'                                |
| X         | AZURESUBSCRIPTION  | Subscription ID                                    |
| X         | AZURERESOURCE      | ID or name of the CDN profile resource             |
|           | AZURERESOURCEGROUP | Associated Resource Group if resource name is used |

</TabItem>
</Tabs>

## How to check in the CLI that the configuration is OK and what are the main options for ? 

Once the plugin installed, log into your Centreon Poller CLI using the 
*centreon-engine* user account and test the Plugin by running the following 
command:

```bash
 /usr/lib/centreon/plugins//centreon_azure_network_cdn_api.pl   \
    --plugin=cloud::azure::network::cdn::plugin  \
    --mode=requests  \
    --custommode=api \
    --subscription='xxxxxxxxx' \
    --tenant='xxxxxxxxx' \
    --client-id='xxxxxxxxx' \
    --client-secret='xxxxxxxxx' \
    --resource='CDN001ABCD' \
    --resource-group='RSG1234'
    --aggregation='Total' \
    --timeframe='900' \
    --interval='PT5M' \
    --warning-requests-count='800'  \
    --critical-requests-count='900'
 ```

 Expected command output is shown below:

```bash
OK : Instance 'CDN001ABCD' Statistic 'count' Request count: 12.00, Percentage of 4XX: 0.00, Percentage of 5XX: 0.00 |
'CDN001ABCD~cdn.requests.count'=12;800;900;0; 'CDN001ABCD~cdn.requests.4xx.percentage'=0.00%;;;0; 'CDN001ABCD~cdn.requests.5xx.percentage'=0.00%;;;0; 
 ```

The command above checks the *reques* of an Azure *CDN profile* instance using the 'api' custom-mode
(`--plugin=cloud::azure::network::cdn::plugin --mode=requests --custommode=api`).
This CDN profile instance is identified by its id (`--resource='CDN001ABCD'`) and its associated group (`--resource-group='RSG1234'`).
The authentication parameters to be used with the custom mode are specified
in the options (`--subscription='xxxxxxxxx' --tenant='xxxxxxx' --client-id='xxxxxxxx' --client-secret='xxxxxxxxxx'`).

The calculated metrics are the total values (`--aggregation='Total'`) of a 900 secondes / 15 min period (`--timeframe='900'`)
with one sample per 5 minutes (`--interval='PT5M'`).

This command would trigger a WARNING alarm if the number of *requests*  is reported as over 800 (`--warning-requests-count='800'`)
and a CRITICAL alarm over 900 errors (`--critical-requests-count='900'`).

All the available options for a given mode can be displayed by adding the `--help` parameter to the command:

```bash
/usr/lib/centreon/plugins//centreon_azure_network_cdn_api.pl   \
    --plugin=cloud::azure::network::cdn::plugin  \
    --mode=requests  \
    --help
```

All Plugin modes can be displayed by adding the `--list-mode` parameter to the 
command:

```bash
 /usr/lib/centreon/plugins//centreon_azure_network_cdn_api.pl   \
    --plugin=cloud::azure::network::cdn::plugin  \
    --list-mode
```

### Troubleshooting

#### The Azure credentials have changed and the Plugin does not work anymore

The Plugin is using a cache file to keep connection information and avoid an authentication at each call. 
If some of the authentication parameters change, you must delete the cache file. 

The cache file can be found within  `/var/lib/centreon/centplugins/` folder with a name similar to azure_api_`<md5>_<md5>_<md5>_<md5>`.

#### `UNKNOWN: Login endpoint API returns error code 'ERROR_NAME' (add --debug option for detailed message)`

When I run my command I obtain the following error message:
`UNKNOWN: Login endpoint API returns error code 'ERROR_NAME' (add --debug option for detailed message)`.

It means that some parameters used to authenticate the API request are wrong. The 'ERROR_NAME' string gives 
some hints about where the problem stands. 

As an example, if my Client ID or Client Secret are wrong, 'ERROR_DESC' value will be 'invalid_client'. 

#### `UNKNOWN: 500 Can't connect to login.microsoftonline.com:443`

This error message means that the Centreon Plugin couldn't successfully connect to the Azure Login API. Check that no third party
device (such as a firewall) is blocking the request. A proxy connection may also be necessary to connect to the API.
This can be done by using this option in the command: `--proxyurl='http://proxy.mycompany:8080'`.

#### `UNKNOWN: No metrics. Check your options or use --zeroed option to set 0 on undefined values`

This command result means that Azure does not have any value for the requested period.
This result can be overriden by adding the `--zeroed` option in the command. This will force a value of 0 when no metric has
been collected and will prevent the UNKNOWN error message.
