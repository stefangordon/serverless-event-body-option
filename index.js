'use strict';
const  BbPromise = require('bluebird');

class BodyOption {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.commands = {
      invoke: {
        lifecycleEvents: [
          "invoke",
        ],

        options: {
          body: {
            usage: 'The HTTP body data in the event, format: Json string or json file path.',
            shortcut: 'b',
          },
        },

        commands: {
          local: {
            lifecycleEvents: [
              "invoke",
            ],

            options: {
              body: {
                usage: 'The HTTP body data in the event, format: Json string or json file path.',
                shortcut: 'b',
              },
            },
          },
        },
      },
    };

    this.hooks = {
      'before:invoke:local:invoke': this.handleBodyOption.bind(this),
      'before:invoke:invoke': this.handleBodyOption.bind(this),
    }
  }

  handleBodyOption() {
    if (this.options.body !== undefined) {
      const bodyOption = this.options.body;
      const bodyJson = (this.isFilePath(bodyOption))
        ? this.getBodyFromPath(bodyOption)
        : this.getDataFromCLI(bodyOption);

      this.wrapBodyToEvent(bodyJson);
      return BbPromise.resolve(this);
    }
  }

  wrapBodyToEvent(body) {
    this.options.data = {'body': JSON.stringify(body).trim() };
  }

  isFilePath(arg) {
    return this.serverless.utils.fileExistsSync(arg);
  }

  getBodyFromPath(path) {
    this.serverless.cli.log(`Getting body data from path: ${path}`);
    return this.serverless.utils.readFileSync(path);
  }

  getDataFromCLI(body) {
    this.serverless.cli.log(`Getting body data from stdin: ${body}`);
    let data;
    try {
      data = JSON.parse(body);
    } catch(e) {
      data = "(" + body + ")";
    }
    return data;
  }
}

module.exports = BodyOption;
