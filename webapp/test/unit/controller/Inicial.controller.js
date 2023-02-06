/*global QUnit*/

sap.ui.define([
	"google_images/controller/Inicial.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Inicial Controller");

	QUnit.test("I should test the Inicial controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
