# marbles
automatically generate CRUD routes for a model constructor function

## use
```js
var hapi = require("hapi");
var server = hapi.createServer();

server.connections({ port: 8000 });

server.route(require("rhiz")(Model, "articles"));

function Model () {

  //create, findOne, update, delete methods...

}


/* this code will create the following routes:

create:    POST     "/articles",
read:      GET      "/articles/{id}",
update:    PUT      "/articles/{id}",
delete:    DELETE   "/articles/{id}"

*/

```

## api

marbles exposes a single function that returns an array of 4 route objects.

### marbles(fn, name)

**_params_**

```fn```: the constructor function that returns an object with create, findOne, update, and delete methods.

The object returned by the constructor can OPTIONALLY  have a ```.auth``` property and a ```.validate``` property that will be added to all of the routes.

**_returns_**

An array with 4 route objects:
```
[{
  method: "POST",
  path: "/articles",
  handler: handlers.create
},
{
  method: "GET",
  path: "/articles/{id}",
  handler: handlers.find
},
{
  method: "PUT",
  path: "/articles/{id}",
  handler: handlers.update
},
{
  method: "DELETE",
  path: "/articles/{id}",
  handler: handlers.delete
}]
```

## license

MIT
