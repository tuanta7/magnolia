# Login with SSO

Reference: [SSO Module](https://docs.magnolia-cms.com/magnolia-sso/)

The Magnolia SSO (single sign-on) module delegates authentication from a Magnolia instance to an OpenID Connect identity and access management application.

## 1. OIDC Provider

```yaml
callbackUrl: /.auth
postLogoutRedirectUri: http://localhost:8080
```

```yaml
clients:
  oidc.id: 0o...x7
  oidc.secret: aK...th6
  oidc.clientAuthenticationMethod: client_secret_basic
  oidc.scope: openid profile email
  oidc.discoveryUri: https://YOUR_URI/.well-known/openid-configuration
  oidc.preferredJwsAlgorithm: RS256
  oidc.authorizationGenerators: groupsAuthorization
```

## 2. User Mapping

- When working with Azure Active Directory, group IDs (rather than names) must be used.

```yaml
authorizationGenerators:
  - name: groupsAuthorization
    groups:
      targetProperty: groups
      mappings:
        - name: superusers
          targetGroups:
            - publishers
          targetRoles:
            - superuser
```

```yaml
userFieldMappings:
  name: preferred_username
  removeEmailDomainFromUserName: false
  removeSpecialCharactersFromUserName: false
  fullName: name
  email: email
  language: locale
```
