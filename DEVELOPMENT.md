# Component Development Guidelines

A concise guide to develop a new component for Headless Magnolia with Next.js integration.

## Light Modules in Magnolia

- If necessary, create a new content type along with its content app. The component or page dialog can store a reference to contents via id or path.
- Develop a new template and dialog for the component. If needed, create a new page template and dialog.
- Integrate the new component template into an existing page template or another component template, typically the layout component that arranges multiple components in a grid or flex layout.

## Next.js Setup

- Create a corresponding component or page for the template designed in Magnolia.
- Adjust the mapping configuration to link the React component with the template ID.

### Magnolia React SDK

- Configure the Magnolia React SDK.
