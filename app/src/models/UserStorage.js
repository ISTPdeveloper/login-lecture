"use strict";

class UserStorage {
    static #users = {
        id: ["kimdaeuk", "김대욱", "ISTPdeveloper"],
        passwd: ["123", "1234", "1111"],
        name: ["김대욱", "대욱", "대욱이"],
    };

    static getUsers(...fields) {
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnproperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return this.#users;
    }

    static getUserInfo(id) {
        const users = this.#users;
        const idx = users.id.indexOf(id);
        const usersKeys = Object.keys(users);
        const userInfo = usersKeys.reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        }, {});
        return userInfo;
    }
}
module.exports = UserStorage;