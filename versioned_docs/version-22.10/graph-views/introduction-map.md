---
id: introduction-map
title: Introduction to Centreon MAP
---

Centreon MAP is a solution fully available in the Centreon web interface while offering you the best possible experience in creating, visualizing and sharing graphical representations of your monitored infrastructure.

The difference with the MAP (Legacy) version is that MAP provides you with an edition tool fully embedded in the web interface. You do not need to install anything on your desktop. You can navigate easily between the edition mode and the view mode.

> If you already used the MAP (Legacy) version, note that you can easily [import your legacy maps](import-into-map-web.md#importing-legacy-maps-into-map) into the MAP interface.

> See how to manage views using the Centreon MAP REST API [here](https://docs-api.centreon.com/api/centreon-map/).

## Overview

Create, customize, and visualize your maps within a single web interface.

You need first to create your logical views using the MAP editor:

![image](../assets/graph-views/ng/map-web-editor-view.png)

Then you can visualize your map directly in the view mode:

![image](../assets/graph-views/ng/map-web-global-view.png)

Your maps can be displayed in two ways in the interface:
- In the **Monitoring > Map** page, in view mode.
- In the **Home > Custom Views** page, using a dedicated MAP [widget](../alerts-notifications/custom-views.md).

## Procedures

Use the following procedures to use and administrate Centreon MAP.

### Administrating MAP
  - [Install MAP](map-web-install.md) describes prerequisites and procedures to install MAP.
  - [Install MAP on a remote server](map-web-install-remote.md) explains how to install MAP on a remote server.
  - [Update MAP](map-web-update.md) describes the update process of MAP.
  - [Switch from Map (Legacy) to MAP](import-into-map-web.md) explains how to migrate your legacy maps into the MAP interface.
  - [Manage access rights on MAP](map-web-manage.md) describes the different rights and permissions on maps.
  
### Using MAP
  - [Manage maps in MAP](map-web-manage.md) gives you information about how to manage maps from the Centreon MAP interface.
  - [Create a standard map](map-web-create-standard-map.md) describes how to create standard maps and how to customize them using the MAP editor.
  - [Create a geographic view](map-web-create-geoview.md) explains how to display your resources across a defined geographical area.
  - [MAP known issues](map-web-known-issues.md) is a list of issues you may encounter using MAP.
  - [MAP troubleshooting](map-web-troubleshooting.md) helps you to solve some issues occuring in MAP.
