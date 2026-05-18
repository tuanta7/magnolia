# Security App

## 1. Administrator Settings

Reference: [Administration](https://docs.magnolia-cms.com/product-docs/administration/)

### Content Security Policy Header

Reference: [CSP Header](https://docs.magnolia-cms.com/product-docs/administration/security/#_content_security_policy_csp_header)

## 2. Roles & ACLs (IAM)

Reference: [Roles and access control lists](https://docs.magnolia-cms.com/product-docs/administration/iam/roles-and-access-control-lists/)

A role is a function a user performs either in the management of Magnolia or as a visitor of a Magnolia website. It reflects the actions and activities assigned to, required, or expected of a user.

- Specific permissions are granted to enable the functions of a role.
- Roles have JCR Access Control Lists (ACLs) and Web access permissions.

### ACL Structure

ACLs are defined in roles. One JCR ACL specifies:

- **Workspace**: ACL rules are defined per workspace, for example website, dam, or templates.
- **Permission**: Type of permissions applied to the controlled resource: `Deny access`, `Read-only`, or `Read/Write`.
- **Path**: Points to the node path that’s controlled: exact node path or include subnodes through the `*` wildcard.

### Web Access

Web access in Magnolia is a type of permission that controls which HTTP paths and methods a role or user may call on Magnolia (for example REST endpoints, image URLs, or public site paths).

- Typically, at least deny the anonymous role access to AdminCentral (deny access to the `/.magnolia` path).
- On a public instance, deny the anonymous role access to AdminCentral and any members-only/testing sections of the site.
