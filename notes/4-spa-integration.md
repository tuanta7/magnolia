# Magnolia + NextJS

## 1. Multisite

Reference: [Multisite Module](https://docs.magnolia-cms.com/product-docs/modules/list-of-modules/multisite-module/)

Magnolia provides site definition features to manage multiple sites (different domains, URL prefixes, minisites) from one Magnolia instance.

### Site Definition

Reference: [Site Definition](https://docs.magnolia-cms.com/product-docs/developing/templating/site-definition/)

> [!IMPORTANT]
> In Magnolia 6.3 and later, site definitions are registered in light modules and not directly in the multisite module

### Example: Two sites with different domains

Reference: [Multisite example](https://docs.magnolia-cms.com/product-docs/developing/templating/site-definition/how-to-use-multisite/multisite-example-two-sites-with-different-domains/)

## 2. Delivery API

Reference: [Delivery Endpoint](https://docs.magnolia-cms.com/rest/api/delivery-endpoint/#_properties)

Delivery endpoints are used for obtaining JCR data as JSON.

- `rootPath` (default: `/`): Defines the root JCR path the delivery endpoint uses to resolve incoming node path parameters and to execute queries. If rootPath is `/sites/my-site`, a request that targets path `about` will be treated as `/sites/my-site/about` for resolution and querying.
- `personalized`: If set to true, the endpoint returns personalized content based on personalization traits and values defined in the request.

```yaml
# server-cli/light-modules/manutd-lm/restEndpoints/delivery/v1/pages/manutd.yaml
class: info.magnolia.rest.delivery.jcr.v2.JcrDeliveryEndpointDefinition
workspace: website
rootPath: /
depth: 20
limit: 100
referenceDepth: 3
bypassWorkspaceAcls: true
personalized: true
```

### Path Configuring

Reference: [Endpoint Path](https://docs.magnolia-cms.com/rest/api/delivery-endpoint/#_endpoint_path)

The following structure will expose the content of the `/travel/about` page on the `website` workspace at `/.rest/delivery/demo-content/travel/about`

```sh
my-light-module/
└── restEndpoints/
    └── delivery/
        └── demo-content.yaml

$type: jcrDeliveryEndpoint_v2
workspace: website
depth: 2
nodeTypes:
  - mgnl:page
  - mgnl:area
  - mgnl:component
childNodeTypes:
  - mgnl:area
  - mgnl:component
```

Read more: [How to get content as JSON](https://docs.magnolia-cms.com/product-docs/developing/development-how-tos/how-to-get-content-as-json-an-overview/)

### Folder & Retrieving Child Nodes

Reference: [Get Children](https://docs.magnolia-cms.com/rest/4.0/api/delivery-endpoint/#_get_children)

```sh
GET <magnolia-base-path>/.rest/endpointPath/{path}@nodes
```

### System Properties

Only page and component templates have the `mgnl:template` property, which is used by the SDK.

### Resolving References

Reference: [Properties for resolving references](https://docs.magnolia-cms.com/rest/api/delivery-endpoint/#_properties_for_resolving_references)

> [!NOTE]
> Note that the `jcrReferenceResolver` only works with uuid, not path. Don't expect it to work with the `JcrNodeToPathConverter` converter class (Magnolia default converter is JcrNodeToIdentifierConverter).

## 3. GraphQL Module

Reference: [GraphQL module](https://docs.magnolia-cms.com/product-docs/modules/list-of-modules/graphql-module)

To disable a GraphQL schema for a content type, use definition decoration, for example:

```yaml
# /<module-name>/decorations/graphql-core/graphqlTypes/<content-type-name>.yaml
enabled=false
```

## 4. SEO & Metadata
