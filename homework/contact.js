/**
 * Created by asus on 22.01.2017.
 */
"use strict"
class Contact {
    constructor(name, phone) {
        this._name = name;
        this._phone = phone;
    }

    getName() {
        return this._name;
    }

    getPhone() {
        return this._phone;
    }
}
module.exports = Contact;