"use strict";

var test = require("tape");
var rhiz = require("..");

test("if rhiz isn't passed object or string as second argument, throw error", function (t) {

  try {
    rhiz(undefined, undefined, "hello");
    t.fail("test shouldnt be executed");
  } catch (e) {
    t.ok(e, "error thrown");
    t.end();
  }

});

var handlers = {

  create: function () {
    return 12;
  },
  update: function () {
    return 7;
  },
  findOne: function () {
    return 3;
  },
  del: function () {
    return 2;
  }
};

test("returns array of 4 routes", function (t) {

  var routes = rhiz(handlers, "articles");
  t.equals(routes.length, 4, "routes arry has 4 routes");
  t.end();

});


test("create route has correct handler", function (t) {

  var routes = rhiz(handlers, "articles");
  var route = routes[0];

  t.equals(route.method, "POST", "create has correct method");
  t.equals(route.path, "/articles", "create has correct path");
  t.equals(route.config.handler(), 12, "create has correct handler");

  t.end();

});

test("update route has correct handler", function (t) {

  var routes = rhiz(handlers, "articles");
  var route = routes[2];

  t.equals(route.method, "PUT", "update has correct method");
  t.equals(route.path, "/articles/{id}", "update has correct path");
  t.equals(route.config.handler(), 7, "upate has correct handler");

  t.end();

});

test("findOne route has correct handler", function (t) {

  var routes = rhiz(handlers, "articles");
  var route = routes[1];

  t.equals(route.method, "GET", "findOne has correct method");
  t.equals(route.path, "/articles/{id}", "findOne has correct path");
  t.equals(route.config.handler(), 3, "findOne has correct handler");

  t.end();

});

test("del route has correct handler", function (t) {

  var routes = rhiz(handlers, "articles");
  var route = routes[3];

  t.equals(route.method, "DELETE", "del has correct method");
  t.equals(route.path, "/articles/{id}", "del has correct path");
  t.equals(route.config.handler(), 2, "del has correct handler");

  t.end();

});

test("findOne route has correct handler", function (t) {

  var routes = rhiz(handlers, "articles");
  var route = routes[1];

  t.equals(route.method, "GET", "findOne has correct method");
  t.equals(route.path, "/articles/{id}", "findOne has correct path");
  t.equals(route.config.handler(), 3, "findOne has correct handler");

  t.end();

});

test("route has auth and validate opts correct handler", function (t) {

  var routes = rhiz(handlers, { auth: "session", validate: { findOne: "string" }},"articles");
  var route = routes[1];

  t.equals(route.method, "GET", "findOne has correct method");
  t.equals(route.path, "/articles/{id}", "findOne has correct path");
  t.equals(route.config.handler(), 3, "findOne has correct handler");
  t.equals(route.config.auth, "session", "auth passed from opts");
  t.equals(route.config.validate, "string", "validate passed from opts");

  t.end();

});

test("route has auth and validate opts correct handler", function (t) {

  var routes = rhiz(handlers, { auth: { findOne: "session" }, validate: "string" },"articles");
  var route = routes[1];

  t.equals(route.method, "GET", "findOne has correct method");
  t.equals(route.path, "/articles/{id}", "findOne has correct path");
  t.equals(route.config.handler(), 3, "findOne has correct handler");
  t.equals(route.config.auth, "session", "auth passed from opts");
  t.equals(route.config.validate, "string", "validate passed from opts");

  t.end();

});
