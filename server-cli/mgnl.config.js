import CreateRestEndpointPlugin from "@magnolia/cli-create-rest-endpoint-plugin";
import CreatePagePlugin from "@magnolia/cli-create-page-plugin";
import CreateComponentPlugin from "@magnolia/cli-create-component-plugin";
import CreateVirtualUriPlugin from "@magnolia/cli-create-virtual-uri-plugin";
import CreateContentTypePlugin from "@magnolia/cli-create-content-type-plugin";
import CreateAppPlugin from "@magnolia/cli-create-app-plugin";
import CreateLightModulePlugin from "@magnolia/cli-create-light-module-plugin";
import StartPlugin from "@magnolia/cli-start-plugin";
import JumpstartPlugin from "@magnolia/cli-jumpstart-plugin";
export default {
  analytics: {
    enabled: true,
    // Set to false to turn off analytics
    uuid: "14e69940-afbd-4998-a1dd-43b8cb26adf4",
  },
  // Logger configuration
  // see: https://github.com/winstonjs/winston#logging for logging levels explanation
  logger: {
    filename: "./mgnl.error.log",
    fileLevel: "debug",
    consoleLevel: "info",
  },
  // Here you can add plugins you want to use with MGNL CLI
  plugins: [
    new CreateRestEndpointPlugin(),
    new CreatePagePlugin(),
    new CreateComponentPlugin(),
    new CreateVirtualUriPlugin(),
    new CreateContentTypePlugin(),
    new CreateAppPlugin(),
    new CreateLightModulePlugin(),
    new StartPlugin({
      tomcatPath: "./apache-tomcat",
    }),
    new JumpstartPlugin(),
  ],
  lightModulesPath: "./light-modules",
  type: "tsx",
  lightModule: "spa-lm",
  componentMappingFilePath: "./spa/src/magnolia.config.ts",
  componentsSpaPath: "./spa/src/app/templates/components",
  pagesSpaPath: "./spa/src/app/templates/pages",
};
