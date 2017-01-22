/**
 * Created by asus on 22.01.2017.
 */
"use strict";
let Contact = require("./contact");
class Messager {
    constructor() {
        this.contacts = new Map();
        this._log = [];
    }

    addContact(contact) {
        this.contacts.set(contact.getPhone, contact);
    }

    sendMessage(contact, message) {
        if (!contact instanceof Contact)
            throw `${contact} must be instance of Contact`;
        this._log.push(message);
    }

    getLastMessage() {
        if (this._log.length == 0)
            return null;
        return this._log[this._log.length - 1];
    }

}
module.exports = Messager;