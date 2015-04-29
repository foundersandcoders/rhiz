"use strict";

module.exports = rhiz;

var is = require("torf");

function rhiz (handlers, opts, name) {

  if (is.type(opts, "string")) {
    name = opts;
    opts = null;
  } else if (!is.type(opts, "object")) {
    throw new TypeError("usage: (handlers - object, opts - object, name - string )");
  }

  var routes = [];

  var routeBase = {
    create:   {
        method: "POST",
        path: "/" + name
    },
    findOne:  {
        method: "GET",
        path: "/" + name + "/{id}"
    },
    update:   {
        method: "PUT",
        path: "/" + name + "/{id}"
    },
    del:      {
        method: "DELETE",
        path: "/" + name + "/{id}"
    }
  };

  var route;
  for (route in routeBase) {
    if(routeBase.hasOwnProperty(route)) {

      var r = routeBase[route];
      r.config = {};
      r.config.handler = handlers[route];

      if (opts && typeof opts.auth === "object") {
          r.config.auth = opts.auth[route];
      } else if (opts && typeof opts.auth === "string") {
          r.config.auth = opts.auth;
      }

      if (opts && typeof opts.validate === "object") {
          r.config.validate = opts.validate[route];
      } else if (opts && typeof opts.validate === "string") {
          r.config.validate = opts.validate;
      }

      routes.push(r);
    }
  }

  return routes;

}
