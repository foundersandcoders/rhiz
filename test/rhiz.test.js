"use strict";

var test = require("tape");
var rhiz = require("..");

var handlers = {

	create: function () {
		return 12;
	},
	find: function (){
		return 9;
	},
	update: function () {
		return 3;
	},
	findOne: function () {
		return 7;
	},
	del: function () {
		return 2;
	}
};

var opts = {auth:"session", validate: "string"};

var resRoutes = rhiz(handlers, opts, "articles");

var routes = [
	{
		name: "create",
		method: "POST",
		path: "/articles",
		config: {handler: 12}
	},
	{
		name: "find",
		method: "GET",
		path: "/articles",
		config: {handler: 9}
	},
	{
		name: "findOne",
		method: "GET",
		path: "/articles/{id}",
		config: {handler: 7}
	},
	{
		name: "update",
		method: "PUT",
		path: "/articles/{id}",
		config: {handler: 3}
	},
	{
		name: "delete",
		method: "DELETE",
		path: "/articles/{id}",
		config: {handler: 2}
	}
];


test("if rhiz isn't passed object or string as second argument, throw error", function (t) {

	try {
		rhiz(undefined, undefined, "hello");
		t.fail("test shouldnt be executed");
	} catch (e) {
		t.ok(e, "error thrown");
		t.end();
	}
});


test("returns array of 5 routes", function (t) {

	var routes = rhiz(handlers, "articles");
	t.equals(routes.length, 5, "routes arry has 4 routes");
	t.end();
});

test("routes array", function (t){

	resRoutes.forEach(function (route, ii) {
		t.test("routes '" + routes[ii].name + "' should match", function (st){

			st.equals(route.method, routes[ii].method,                   "correct method");
			st.equals(route.path, routes[ii].path,                       "correct path");
			st.equals(route.config.handler(), routes[ii].config.handler, "correct handler");
			st.equals(route.config.auth, "session", "auth passed from opts");

      //validate only passed to create and update routes
      if (route.method === "PUT" || route.method === "POST") {
        st.equals(route.config.validate, "string", "validate passed from opts");
      }

			st.end();
		});
	});
});

test("auth and validate objects passed to handlers", function (t) {

	var opts = {
		auth: {
			create: "session",
			find: "session",
			findOne: "session",
			update: "session",
			del: "session"
		},
		validate: {
			create: "string",
			find: "string",
			findOne: "string",
			update: "string",
			del: "string"
		}
	};

	var routes = rhiz(handlers, opts, "articles");

	routes.forEach(function (route) {

		t.equals(route.config.auth, "session", "auth passed from opts");

    //validate only passed to create and update routes
    if (route.method === "PUT" || route.method === "POST") {
      t.deepEquals(route.config.validate, opts.validate, "validate passed from opts");
    }
	});
	t.end();

});
