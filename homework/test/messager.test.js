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
    let messager = {}

    beforeEach(function () {
        messager = new Messager();
    });

    describe('has to save contact', function () {
        it("if i add a contact", function () {
            // Arrange
            let contact = createContact("Paul");
            messager.addContact(contact);
            messager.contacts.size.should.be.exactly(1);
        })
    });
    describe("send a message", function () {
        it("if i ask to send message to a contact", function () {
            //Arrange
            let contact = createContact("Paul");
            //Act
            messager.sendMessage(contact, "test message");
            //Assert
            messager.getLastMessage().should.be.exactly("test message");
        });
    });
    describe("add new contacts", function () {
        it("if i add new contacts to the conference", function () {
            //Arrange
            let paul = createContact("Paul");
            let john = createContact("John");
            //Act
            messager.createConferenceWith(paul, john);
            //Assert
            messager.contacts.size.should.be.exactly(2);
        });
    });
    describe("create a conference", function () {
        it("if i press button create a conference", function () {
            //Arrange
            let paul = createContact("Paul");
            let john = createContact("John");
            //Act
            messager.createConferenceWith(paul, john);
            //Assert
            messager.getLastErrors("conference").should.be.empty();
        });
    });
    describe("send a message to all conference participants", function () {
        it("if i ask to send message to conference participants", function () {
            //Arrange
            let paul = createContact("Paul");
            let john = createContact("John");
            //Act
            messager.createConferenceWith(paul, john);
            messager.sendConferenceMessage("test conference message");
            //Assert
            messager.getLastErrors("conference").should.be.empty();
            messager.getLastMessage().should.be.exactly("test conference message");
            messager.getLastErrors("messaging").should.be.empty();
        });
    });
    describe("recieve messages", function () {
        it("if i am available online", function () {
            messager._inbox.push("test incoming message");
            messager.hasIncomingMessages().should.be.equal(true);
        });
    });
    describe("remind that my contact has a birthday", function () {
        it("if i am available online", function () {
            let date = new Date();
            let paul = createContact("Paul", null, "1977-" + ( date.getMonth() + 1 ) + "-" + date.getDate());
            messager.addContact(paul);
            messager.checkContactsInfo();
            messager.contacts.size.should.be.exactly(1);
            messager.getLastMessage().should.be.exactly(
                `${paul.getName()}(phone:${paul.getPhone()}) has a birthday today. Send congratulations with postcard Happy Birthday?`
            )
        });
    });

    function createContact(name, phone, birth) {
        if (undefined == birth || null == birth) {
            let date = randomDate();
            birth = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        }
        if (undefined == phone || null == phone)
            phone = 10000000 + Math.random() * 99999999;

        return new Contact(name, phone, birth);
    }

    function randomDate() {
        const START_YEAR = 1950;
        const END_YEAR = 2000;
        let year = START_YEAR + Math.random() * (END_YEAR - START_YEAR);
        let day = 1 + Math.random() * (30 - 1);
        let month = 1 + Math.random() * (12 - 1);
        return new Date(year, month, day);
    }

});