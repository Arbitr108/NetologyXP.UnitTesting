/**
 * Created by asus on 22.01.2017.
 */
"use strict";
let Contact = require("./contact");
class Messager {
    constructor() {
        this.contacts = new Map();
        this._log = [];
        this._errors = {
            conference: [],
            messaging: []
        };
        this._conference = [];
        this._inbox = [];
    }

    addContact(contact) {
        this.contacts.set(contact.getPhone(), contact);
    }

    sendMessage(contact, message) {
        if (message) {
            this._validateContact(contact);
            this._log.push(message);
        }
    }

    createConferenceWith() {
        if (arguments.length == 0)
            throw "Please add at least one contact to the conference";
        var _contacts = Array.prototype.slice.call(arguments);
        let self = this;
        _contacts.map(function (contact) {
            self._validateContact(contact);
            if (!self.contacts.has(contact.getPhone()))
                self.addContact(contact);
            if (!self._addToConference(contact)) {
                self._errors.conference.push(`Error adding ${contact.getPhone()} ${contact.getName()} to the conference`);
            }
        })
    }

    sendConferenceMessage(message) {
        let self = this;
        this._conference.map((contact)=> self.sendMessage(contact, message));
    }

    hasIncomingMessages() {
        return this._inbox.length > 0;
    }

    getLastMessage() {
        if (this._log.length == 0)
            return [];
        return this._log[this._log.length - 1] || [];
    }

    getLastErrors(type) {
        if (type == undefined)
            throw "The error type is not provided";
        if (this._errors[type].length == 0)
            return [];
        return this._errors[type][this._errors[type].length - 1] || [];
    }

    _addToConference(contact) {
        return this._conference.push(contact.getPhone() + ":" + contact.getName());
    }

    _validateContact(contact) {
        if (!contact instanceof Contact)
            throw `${contact} must be instance of Contact`;
    }

    checkContactsInfo() {
        //Birthday reminder
        let self = this;
        this.contacts.forEach(function (contact) {
            let birthday = new Date(contact.getBirthday());
            let today = new Date();
            if (birthday.getDate() === today.getDate()
                && birthday.getMonth() === today.getMonth()) {
                self._log.push(`${contact.getName()}(phone:${contact.getPhone()}) has a birthday today. Send congratulations with postcard ${self._getPostcard()}?`)
            }
        });
    }

    _getPostcard() {
        return "Happy Birthday";
    }

    getIncomingMessages() {
        return this._inbox;
    }

    setIncomingMessage(message) {
        this._inbox.push(message);
    }
}
module.exports = Messager;