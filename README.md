# Tags Microservice

This is a search tags microservice from Pip.Services library. 
It keeps track of search tags entered by a party (user or other party he or she represents). 
Later the tags can be used to enhance user experience in autocomplete and search functions.

The microservice currently supports the following deployment options:
* Deployment platforms: Standalone Process
* External APIs: HTTP/REST
* Persistence: Flat Files, MongoDB

This microservice has no dependencies on other microservices.

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Guide](doc/Development.md)
* [Configuration Guide](doc/Configuration.md)
* [Deployment Guide](doc/Deployment.md)
* Client SDKs
  - [Node.js SDK](https://github.com/pip-services-content2/client-tags-node)
* Communication Protocols
  - [HTTP Version 1](doc/Htt[ProtocolV1.md)

##  Contract

Logical contract of the microservice is presented below. For physical implementation (HTTP/REST, Thrift, Lambda, etc.),
please, refer to documentation of the specific protocol.

```typescript
class PartyTagsV1 implements IStringIdentifiable {
    public id: string;
    public tags: TagRecordV1[];
    public change_time: Date;
}

class TagRecordV1 {
    public tag: string;
    public count: number;
    public last_time: Date;
}

interface ITagsV1 {
    getTags(correlationId: string, partyId: string): Promise<PartyTagsV1>;

    setTags(correlationId: string, partyTags: PartyTagsV1): Promise<PartyTagsV1>;
    
    recordTags(correlationId: string, partyId: string, tags: string[]): Promise<PartyTagsV1>;
}
```

## Download

Right now the only way to get the microservice is to check it out directly from github repository
```bash
git clone git@github.com:pip-services-content2/service-tags-node.git
```

Pip.Service team is working to implement packaging and make stable releases available for your 
as zip downloadable archieves.

## Run

Add **config.yaml** file to the root of the microservice folder and set configuration parameters.
As the starting point you can use example configuration from **config.example.yaml** file. 

Example of microservice configuration
```yaml
- descriptor: "pip-services:container-info:default:default:1.0"
  name: "service-tags"
  description: "Tags microservice"

- descriptor: "pip-services:logger:console:default:1.0"
  level: "trace"

- descriptor: "service-tags:persistence:file:default:1.0"
  path: "./data/tags.json"

- descriptor: "service-tags:controller:default:default:1.0"
  options:
    max_tag_count: 100

- descriptor: "service-tags:service:http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8080
```
 
For more information on the microservice configuration see [Configuration Guide](Configuration.md).

Start the microservice using the command:
```bash
node run
```

## Use

The easiest way to work with the microservice is to use client SDK. 
The complete list of available client SDKs for different languages is listed in the [Quick Links](#links)

If you use Node.js then you should add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "client-tags-node": "^1.0.*",
        ...
    }
}
```

Inside your code get the reference to the client SDK
```javascript
let sdk = new require('client-tags-node');
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
let config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
let client = sdk.HttpRestClientV1(config);

// Connect to the microservice
try {
    await client.open(null);
    // Work with the microservice
    ...
} catch(err) {
    console.error('Connection to the microservice failed');
    console.error(err);
}
```

Now the client is ready to perform operations
```javascript
// Record tags for a user
let tags = await client.recordTags(
    null,
    '123',
    ['draft', 'important']
);
```

```javascript
// Get the list of user tags
let partyTags = await client.getTags(
    null,
    '123'
);
```    

## Acknowledgements

This microservice was created and currently maintained by *Sergey Seroukhov*.

