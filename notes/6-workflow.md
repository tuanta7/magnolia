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

- The message view (actions) at the task list screen is configured in the tasks-app `light-modules/<lm-name>/decorations/tasks-app/`
- The message views for the task details screen are configured in the pages-app `light-modules/<lm-name>/decorations/pages-app/`

| Action              | Screen  | Description                                  |
| ------------------- | ------- | -------------------------------------------- |
| Assign to me        | Both    | Assign it to yourself to take further action |
| Approve and publish | Preview | Publish the content                          |
| Reject              | Preview | Reject the changes with an optional message  |
| Abort               | Both    | Abort the workflow                           |
| Preview page        | Preview | Show the page content?                       |
| Show changes        | Preview | Compare the content to previous versions     |
| Retry publication   | Preview |                                              |
| Remove from list    | Preview | Similar to archive?                          |
| Archive             | Tasks   | Remove from the Tasks app UI                 |
| Preview Task        | Tasks   | Go to the preview screen                     |

### Publishing Content

The final step in the workflow process is the transfer of content from author to those public instances which should receive that content.

## 3. Custom

Reference: [Content Import Request message view](https://docs.magnolia-cms.com/product-docs/modules/list-of-modules/content-importer-module/#_content_import_request_message_view)
