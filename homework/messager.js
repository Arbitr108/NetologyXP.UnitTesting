/**
 * Created by asus on 22.01.2017.
 */
"use strict";
let Contact = require("./contact");
class Messager {
    constructor() {
        this.contacts = new Map();
    }

    addContact(contact) {
        this.contacts.set(contact.getPhone, contact);
    }

    sendMessage(contact) {
        if (!contact instanceof Contact)
            throw `${contact} must be instance of Contact`;
    }
}
module.exports = Messager;