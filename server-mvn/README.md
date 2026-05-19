# Setup Notes for Magnolia v6.2

Reference: [Maven setup](https://docs.magnolia-cms.com/product-docs/developing/development-environment/maven/)

## 1. Maven

Apache Maven is a build tool for Java projects. Using a project object model (POM), Maven manages a project's compilation, testing, and documentation.

### Multiple Repositories

Reference: [Multiple Repositories](https://maven.apache.org/guides/mini/guide-multiple-repositories.html)

There are two different ways that you can specify the use of multiple repositories:

- Specify in a POM (supported both inside and outside of build profiles)
- Creating a profile in the `${user.home}/.m2/settings.xml` or `${maven.home}/conf/settings.xml`

```

```

### Archtype

Archetype is a Maven project templating toolkit

```sh
mvn archetype:generate
```

## 2. Custom Webapp

Reference: [Creating a custom webapp with Maven](https://docs.magnolia-cms.com/product-docs/developing/bundles-and-webapps/creating-a-custom-webapp-with-maven/)

```sh
mvn archetype:generate -DarchetypeGroupId=info.magnolia.maven.archetypes -DarchetypeArtifactId=magnolia-project-archetype -DarchetypeVersion=RELEASE

Define value for property 'magnolia-bundle-version': 6.2.17
Define value for property 'groupId': com.example
Define value for property 'artifactId': custom-project-minimal
Define value for property 'version' 1.0-SNAPSHOT:
Define value for property 'package' com.example:
Define value for property 'project-name' custom-project-minimal:
```
