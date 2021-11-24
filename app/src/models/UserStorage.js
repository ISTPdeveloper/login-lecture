"use strict";

class UserStorage {
    static #users = {
        id: ["kimdaeuk", "김대욱", "ISTPdeveloper"],
        passwd: ["123", "1234", "1111"],
    };

    static getUsers() {
        return this.#users;
    }
}

module.exports = UserStorage;