# Magnolia CMS

Reference: [Magnolia Getting Started](https://docs.magnolia-cms.com/product-docs/getting-started-with-magnolia/)

> Get [SDKMAN!](https://sdkman.io/install/) to install Java and [Magnolia CLI](https://docs.magnolia-cms.com/magnolia-cli/) for further works.

mgnl create-component quotation -a pages/hello@main -lm hello-magnolia

## 1. Architecture and Operation Models

![arch](./.imgs/architecture.png)

Reference: [Magnolia Architecture](https://docs.magnolia-cms.com/product-docs/administration/architecture/)

- **Magnolia CMS**:
- **Magnolia Nexus**:
- **Light Modules**:
- **SPA**:
- **JCR** (Java Content Repository): The JCR specification defines an abstract model and a Java API for data storage and related services commonly used by content-oriented applications. Apache Jackrabbit is a fully conforming implementation of the JCR API.
- **DAM** (Digital Asset Management): A common term for Magnolia modules that allow you to store and work with images, videos and documents. Assets stored in the DAM can be used anywhere in the system.
- **Resources**: Resource files are static Web resources (CSS, JavaScript), definition files for apps, dialogs and templates (YAML), and template scripts (FreeMarker).

In a typical set up, Magnolia is installed with two web applications: the author instance and the public instance.

- **Author Instance**: The Magnolia authoring instance is used for editing content. Administrators and editors have to login to this instance's Admin Central for configuring Magnolia and for adding or modifying pages.
- **Public Instance**: The Magnolia public instance is accessed by website visitors. It is not accessed by editors directly but administrators are able to login and configure this instance as well.

Read More: [Glossary](https://docs.magnolia-cms.com/product-docs/getting-started-with-magnolia/glossary)

### Content Type/JCR Concepts

Reference: [Understanding JCR Basics](https://docs.magnolia-cms.com/product-docs/developing/content-types/content-types-tutorial/part-i-my-first-content-type/#_understanding_jcr_basics_node_type_namespace_and_workspace)

A data source defines how content type items are persisted. Storing data in JCR requires: a registered workspace; a defined and registered node type; and the node type may use a namespace that must be registered too.

**Workspace**: Magnolia stores content in the magnolia repository. The repository is further divided into workspaces.

```yaml
datasource:
  $type: jcrContentTypeDatasource
  workspace: tourguides
  namespaces:
    mt: https://www.magnolia-travel.com/jcr/1.0/mt
  autoCreate: true # both the workspace and the namespaces will be registered by the system, if they have not been registered yet.
```

**Namespace**: The namespace indicates a certain domain. Node types that belong to the same domain share the same namespace.

- The namespace `nt` is used for node types provided by the JCR implementation.
- The namespace `mgnl` is used for most of the Magnolia-specific node types (content that should be managed, versioned, or activated by Magnolia).

```yaml

```

**Node Type**: A node stores an item of a certain type. Nodes contain properties. A node type defines the nature of a node, it has a name, which typically starts with `namespace:`.

### Content App Concepts

**Content App**: An app is a UI extension point. Because content is at the heart of Magnolia, there is a specific framework subset dedicated to creating apps that manage content; apps created using this framework subset are referred to as content apps.

```yaml

```

**App Descriptor**: An app descriptor describes an app. The descriptor assigns the app a name, icon and implementation class. The name of the app content node must be unique as it is used to refer to the app across the system.

Reference: [App Descriptor](https://docs.magnolia-cms.com/product-docs/apps/app-configuration/app-descriptor/)

```yaml
icon: icon-app
class: info.magnolia.ui.api.app.registry.ConfiguredAppDescriptor
appClass: info.magnolia.ui.framework.app.BaseApp
label: Base App
subApps:
```

**Sub-app Descriptor**: A subapp descriptor describes a subapp. A subapp is typically rendered as a tab inside an app. The descriptor defines the classes that read the configuration and implement the subapp.

Reference: [Subapp Descriptor](https://docs.magnolia-cms.com/product-docs/apps/app-configuration/subapp-descriptor/)

```yaml

```

> Subapp là custom form cho app?

## 2. Headless CMS

## 3. Multicluster Environments
