# Light Modules

Reference: [docs.magnolia-cms.com](https://docs.magnolia-cms.com/product-docs/modules/light-modules/)

Magnolia has a modular architecture. A module can perform a task, package content, or provide specialized functionality.

A Magnolia light module is a file and folder-based module. It can define every Magnolia item which can be configured in YAML – such as apps, content types, templates, dialogs, themes, and others. It can also contain a lightweight YAML-based module descriptor and web resources such as css and javascript files.

```sh
mgnl create-light-module [options]  # create a light module with an empty folder structure
```

| Concept      | Folder                | Purpose                                                                |
| ------------ | --------------------- | ---------------------------------------------------------------------- |
| Decoration   | decorations/          | Override or extend runtime configuration that comes from other modules |
| Page         | templates/pages/      | Full-page layout template                                              |
| Component    | templates/components/ | Reusable content block inside a page area                              |
| App          | apps/                 | Backend admin UI in the App Launcher                                   |
| Content Type | contentTypes/         | Schema/structure for custom content entities                           |
| Virtual URI  | virtualUriMappings/   | URL redirects/forwards independent of site hierarchy                   |

## 1. Pages & Components Template

Reference: [Hello Magnolia Tutorial](https://docs.magnolia-cms.com/product-docs/6.2/getting-started-with-magnolia/hello-magnolia/)

A page is a full-page template, which is the top-level rendering unit in Magnolia. It defines the overall layout of a web page. Each page template consists of two files:

- **myPage.yaml**: The definition file (sets render type, dialog, areas, etc.)
- **myPage.ftl**: The FreeMarker template script that outputs the HTML. This file is not required for headless mode.

A component is a reusable content block that lives inside a page's areas (e.g. a text block, image gallery, card). A component template typically contains standard code with commonly used properties and is generally a good starting point to build on.

When using headless mode, Magnolia acts purely as a content repository and API server. A separate frontend (React, Next.js, Vue, etc.) fetches content via REST or GraphQL and handles all rendering.

```sh
mgnl create-page [options]          # create a headless or freemarker-based page
mgnl create-component [options]     # create a headless or freemarker-based component
```

## 2. Content Types & Apps

Reference: [Content Types Tutorial](https://docs.magnolia-cms.com/product-docs/apps/developing-an-app/my-first-content-app/)

An app is a backend admin UI tool that appears in the Magnolia App Launcher.

- A Content app is a specialized app type for managing structured content.
- The content app user interface consists of a browser subapp and one or more detail subapps.

A content type defines the structure/schema of a custom content entity (like a Product, Event, or Article). A content type establishes a new content type template for structured and consistent content entry across various apps and pages.

It is common to pair a content type with an app.

```sh
mgnl create-app [options]           # create an app in a light module
mgnl create-content-type [options]  # create a content type in a light module
```

## 3. REST Client

Reference: [Hello Magnolia with content via REST](https://docs.magnolia-cms.com/product-docs/6.2/developing/hello-magnolia---with-content-via-rest/)

## 4. REST Endpoint

Reference: [Hello Magnolia - Headless](https://docs.magnolia-cms.com/product-docs/developing/headless/getting-started-with-magnolia-headless/hello-headless/)

REST endpoints enable other software to get real, raw content directly from Magnolia.

Read more: [Getting started with REST](https://docs.magnolia-cms.com/product-docs/getting-started-with-magnolia/getting-started-with-rest)

## 5. Appendix

### 5.1. Decoration

Reference: [App Launcher layout definition](https://docs.magnolia-cms.com/product-docs/administration/app-launcher/app-launcher-layout/#_example_definitions)

### 5.2. Virtual URI

```sh
mgnl create-virtual-uri [options]   # create a virtual URI mapping in a light module
```

### 5.3. Maven Module

A Maven Module is a Java-based project used to build, package, and deploy custom functionality. It allows to integrate custom Java components, such as servlets, REST endpoints, and complex business logic.

## 6. Magnolia Built-in Apps

Reference: [List of apps](https://docs.magnolia-cms.com/product-docs/Apps/List-of-apps)

### Pages App

The Pages app allows users to build complete web pages.

- In the Pages app, users enter content directly onto the page.
- Content that comes from another Magnolia app can also be rendered.

### Assets App

The Assets app is a container app for asset management subapps such as the Magnolia Assets subapp, Amazon S3 Assets, or Bynder.

- Magnolia Assets subapp is a Magnolia-native solution for simple Digital Asset Management (DAM) scenarios.

### Categories App

Reference: [Categorization module](https://docs.magnolia-cms.com/product-docs/modules/list-of-modules/categorization-module/)

Categorization, also known as tagging or labeling, is a tool to manage large amounts of content.

### Stories App

(Available only in DX Core)
