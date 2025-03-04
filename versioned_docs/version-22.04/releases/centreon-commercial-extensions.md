---
id: centreon-commercial-extensions
title: Commercial Extensions
---

## Introduction

You can find in this chapter all changelogs concerning **Centreon Commercial Extension**.

> It is very important when you update your system to refer to this section in order to learn about behavior changes or
> major changes that have been made on this version. This will let you know the impact of the installation of these
> versions on the features you use or the specific developments that you have built on your platform (modules,
> widgets, plugins).

If you have feature requests or want to report a bug, please contact support.

## Centreon MAP

### 22.04.1

Release date: `July 13, 2022`

#### Bug fixes

- Updated the notification number field to match the central database schema.

#### Enhancements

- The diagnostic.sh script is now compatible with Debian.
- Updated the connected server label to 'Configured server' for more clarity.
- BBDOv3 is now enabled by default at installation and after the MAP server upgrade, to match the central Broker's new 22.04 configuration.

### 22.04.0

> If you have just installed Centreon 22.04 or upgraded your platform to this version, be aware that the platform now uses the new BBDO v3 protocol. [Configure MAP](../graph-views/install.md#configuration) to use it.

- Compatibility with other 22.04 components.

## Centreon BAM

### 22.04.2

Release date: `September 14, 2022`
 
- [Install] Fixed installation of module if 24x7 timeperiod is missing
- [Banner] Fixed display of empty skeleton
- [UI] Fixed header and skeleton UI instability
- [UI] Change BAM widget background font color to white when dark mode is active
- [Configuration] Refresh the BAM configuration page when adding a new BA


### 22.04.1

Release date: `May 25, 2022`

- Fixed the blank page when opening BAM configuration menu

### 22.04.0

- Compatibility with other 22.04 components.

## Centreon MBI

### 22.04.3

Release date: `October 25, 2022`

#### Bug fixes

- Fixed an issue with report publication that could cause LDAP users or local users without passwords to not receive the email

### 22.04.2

Release date: `October 12, 2022`

#### Security fixes

- Fixed multiple vulnerabilities in report generation

### 22.04.1

Release date: `July 5, 2022`

#### Bug fixes

- Fixed an issue related to the new password policy that would prevent reports from being generated.

### 22.04.0

- Compatibility with other 22.04 components.

## Centreon Auto Discovery

### 22.04.1

Release date: `August 10, 2022`

#### Improvements

- [Configuration] When a host receives no host template from the mappers, the default template that is hard-coded in the Plugin Pack will be applied to this host

#### Bug fixes

- For some host discovery providers where no credentials were actually required, the job creation wizard no longer demands to enter credentials
- Fixed a front-end issue that caused existing Host Discovery jobs to lose all their parameters when clicking on **Schedule**


### 22.04.0

#### Enhancements

- The Centreon Host Discovery engine can now perform changes on existing hosts when using the automatic policy. This means that existing hosts may now gain templates, groups, categories and macros, and get monitored by a different server.
- Centreon Host Discovery can now deploy the new monitoring configuration as soon as the job is run in the background.

## Centreon Plugin Packs Manager

### 22.04.0

#### Enhancements

- The Plugin Packs now provide the package name and version of the required plugins, and Gorgone will automatically install the required plugins on your pollers. This means you don't need to install the Centreon Plugins manually on each poller anymore.

## Centreon License Manager

### 22.04.0

- Compatibility with other 22.04 components.

## Centreon Anomaly Detection

### 22.04.0

- Compatibility with other 22.04 components.

## Centreon Data Source For Grafana

- [Grafana] Centreon data source
