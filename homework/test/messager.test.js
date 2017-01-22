/**
 * Created by asus on 22.01.2017.
 */
"use strict";
let should = require('should');
let Messager = require("../messager");
let Contact = require("../contact");

/**
 *   У меня есть список контактов, с кем я могу общаться
 Могу отправить сообщение любому человеку из списка контактов
 Могу создать чат с несколькими людьми и отправить сообщения им
 Могу получать сообщения от других пользоватлей
 Если у моего собеседника день рождения, месенжер предлагает отправить ему картинку с поздравлением или стикер
 */

//I will use should tests as the test criteria looks like Messager should do different
//things that i need to

describe("Messager should", function () {
    //Arrange
    var messager = {};

    beforeEach(function () {
        messager = new Messager();
    });

    describe("has a contact list", function () {
        it("if start to use it", function () {
            //Assert
            messager.should.have.property("contacts");
        });
    });
    describe('has to save contact', function () {
        it("if i add a contact", function () {
            // Arrange
            let contact = new Contact("Paul", "007");
            messager.addContact(contact);
            messager.contacts.should.have.size(1);
        })
    })
    describe("send a message", function () {
        it("if i ask to send message to a contact", function () {
            //Arrange
            let contact = new Contact("Paul", "007");
            //Act
            messager.sendMessage(contact, "test message");
            //Assert
            messager.getLastMessage().should.be.exactly("test message");
        });
    });
    describe("create a conference", function () {
        it("if i ask to create a conference", function () {
            let contact1 = new Contact("Paul", "001");
            let contact2 = new Contact("John", "002");

            messager.createConferenceWith(contact1, contact2);

            messager.getLastErrors("conference").should.be.empty();
        });
    });
    describe("send a message to all conference participants", function () {
        it("if i ask to send message to conference participants", function () {

        });
    });
    describe("recieve messages", function () {
        it("if i am available online", function () {

        });
    });
    describe("remind that my contact has a birthday", function () {
        it("if i am available online", function () {

        });
    })

});