# [Any JSON CMS](http://anyjsoncms.com) - Admin application server

Any JSON CMS consists of two parts. Admin application server and [API server](https://github.com/evmizulin/cms-api). It is Admin application server.

### Installation

#### Step 1. Install the required dependencies.
- [Node.js](https://nodejs.org/) v8+;

#### Step 2. Install the Admin application server.
```sh
git clone git@github.com:evmizulin/cms-admin.git
cd cms-admin
npm install
```

#### Step 3. Update configuration file.
In project root folder there are configuration file ```config.js```. Update it for your needs.
```js
module.exports = {
  config: {
    prodAppServerHost: 'localhost',
    prodAppServerPort: 8081,
    devApiProtocol: 'http',
    prodApiProtocol: 'https',
    devApiHost: 'localhost:8080',
    prodApiHost: 'api.anyjsoncms.com',
  },
}
```
All parameters that have ```dev``` and ```prod``` prefixes, will be used for development and production environments respectively.

- ```prodAppServerHost``` - this parameter will be passed as ```host``` to run Node.js server;
- ```prodAppServerPort``` - this parameter will be passed as ```port``` to run Node.js server;
- ```apiProtocol``` - protocol of [API server](https://github.com/evmizulin/cms-api);
- ```apiHost``` - host of [API server](https://github.com/evmizulin/cms-api);

#### Step 4. Run Admin application server.
To run Admin application server in development environment:
```sh
npm start
```
And open ```http://localhost:3000``` in your browser.

To run Admin application server in production environment:
```sh
npm run build && npm run start.prod
```
You could see the logs in ```/logs``` folder.
