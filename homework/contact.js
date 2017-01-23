/**
 * Created by asus on 22.01.2017.
 */
"use strict"
class Contact {
    constructor(name, phone, birth_date) {
        this._name = name;
        this._phone = phone;
        //Y-m-d
        this._birthdate = birth_date;
    }

    getName() {
        return this._name;
    }

    getPhone() {
        return this._phone;
    }

    getBirthday() {
        return this._birthdate;
    }
}
module.exports = Contact;