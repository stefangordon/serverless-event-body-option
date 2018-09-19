[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

# Serverless Event Body Option

## Overview

This is a plugin of the [serverless framework](https://github.com/serverless/serverless), it provides the extra CLI option `--body/-b` for the invoke (local) command 
to support passing the HTTP body data directly.


Currently(serverless@1.32.0), The serverless framework providing the `--data` and `--path` options for the invoke command to passing the event data to the handler functions.

However, we have to use the string formatted(instead of JSON) HTTP body data for the value of `body` field in the JSON formatted event data.

which means that we have to escape the quotes for the actually JSON based body data.

e.g:
```json
{"body": "{\"body_key\": \"body_value\"}"}
```

That makes the body data unreadable and unmanageable, especially for the complicated body data.   

This plugin helped that! 
with it, we can specify the JSON formatted HTTP body data in the CLI directly instead of wrapping them in the event.


## Installation

1. Performing `npm install` at the root path of your service.

```
$ npm install --save serverless-event-body-option
```

2. Adding the plugin to your `serverless.yml` file.


```yaml
plugins:
  - serverless-event-body-option
```


## Usage

### Invoking the function

* Specifying the data from stdin directly if the data is short.

```
$ serverless invoke -f yourFunction --body '{"foo":"var"}'
```

* Specifying JSON file path which contains the body data if the data is complicated.

```
$ serverless invoke -f yourFunction --body /path/to/your-body-data.json
```

You can also add the body option for the `invoke local` sub-command for invoking the function locally.
