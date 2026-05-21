# Workflow Module

Reference: [Workflow Module](https://docs.magnolia-cms.com/product-docs/modules/list-of-modules/workflow-module)

Magnolia (DX Core only) comes with a four-eye content approval workflow configured on the Pages app. It can also be configured on the Assets app or any content app.

Workflow is configured in the Workflow and Workflow jBPM modules. The workflow engine is based on the JBPM Business Process Management (BPM) Suite.

## 1. Editor Side

Reference: [Magnolia Four-eye Workflow](https://docs.magnolia-cms.com/product-docs/modules/list-of-modules/workflow-module/magnolia-four-eye-workflow/#_publishing_content)

### Creating Content

Whenever content is created or updated it’s common for that content to go through an approval workflow before making it to public.

### Activate Content

When the page or other content has finished it’s editorial phase, it’s then time to activate that content.

- Editors can use the Publish action (in the actionbar) to initiate the Review for Publication workflow. This will trigger the Submit for Publication dialog.
- After submitting the dialog, a task is created for members in the publishers group. Groups for publication tasks are configured in the Configuration app at `/modules/workflow-jbpm/tasks/publish/groups`

It is also possible to Unpublish a previously published page. However, this too also goes through a workflow.

## 2. Publisher Side

### Reviewing Content

Whenever an editor create a task, all publishers inside the sent group will be informed that the system has registered a new task.

- The message view (actions) at the task list screen is configured in the Workflow module (`/modules/workflow/messageViews/publish`) or in Pages app (`/modules/pages-app/messageViews/publish`)?
- The message views for the task details screen are configured in `/modules/workflow-jbpm/tasks/publish/viewMapping`?

| Action              | Description |
| ------------------- | ----------- |
| Assign to me        |             |
| Approve and publish |             |
| Reject              |             |
| Abort               |             |
| Preview page        |             |
| Show changes        |             |

### Publishing Content

The final step in the workflow process is the transfer of content from author to those public instances which should receive that content.
