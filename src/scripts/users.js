import bcrypt from 'bcryptjs';

const saltRounds = bcrypt.genSaltSync(5);

export function getUsers() {
    return JSON.parse(window.localStorage.getItem('Users'));
}
export function getUser(userId) {
    const users = window.localStorage.getItem('Users');
    if (users) {
        const usersArray = JSON.parse(users);
        const user = usersArray.find((user) => user.id === Number(userId));
        return user;
    } else {
        return null;
    }
}
export function signIn(userEmail, userPassword) {
    const users = window.localStorage.getItem('Users');
    if (users) {
        const usersArray = JSON.parse(users);
        const user = usersArray.find((user) => user._email === userEmail);
        if (user) {
            if (bcrypt.compareSync(userPassword, user._password)) {
                window.localStorage.setItem(
                    'Application',
                    JSON.stringify({ isLogged: true, user: user })
                );
                return user;
            } else {
                return null;
            }
        } else {
            return null;
        }
    } else {
        return null;
    }
}

export function signOut() {
    window.localStorage.setItem(
        'isLogged',
        JSON.stringify({ isLogged: false, user: '' })
    );
}
export function signUp(user) {
    if (!isLogged()) {
        const usersArray = getUsers();

        if (usersArray) {
            usersArray.push(user);
            window.localStorage.setItem('Users', JSON.stringify(usersArray));
        } else {
            window.localStorage.setItem('Users', JSON.stringify([].push(user)));
        }
        return getUser(user.id);
    } else {
        return null;
    }
}

export function editUser(user) {
    const usersArray = getUsers();
    const oldUserIndex = usersArray.indexOf(user);
    usersArray[oldUserIndex] = user;
    window.localStorage.setItem('Users', JSON.stringify(usersArray));
    return getUser(user.id);
}
export function deleteUser(userId) {
    const usersArray = getUsers();
    const indexOfUser = usersArray.indexOf(getUser(userId));
    delete usersArray[indexOfUser];
    window.localStorage.setItem('Users', JSON.stringify(usersArray));
    signOut();
}

function isLogged() {
    if (JSON.parse(window.localStorage.getItem('Application')).isLogged) {
        return true;
    } else {
        return false;
    }
}

export class User {
    constructor() {
        this.id = () => {
            const usersArray = getUsers();
            return usersArray ? Number(usersArray.length) : 1;
        };
        this._addresses = [];
        this._role = false;
    }

    set role(value) {
        this._role = value;
    }

    get role() {
        return this._role;
    }

    /**
     * @param {String} value
     */
    set name(value) {
        this._name = value;
    }

    get name() {
        return this._name;
    }

    /**
     * @param {String} value
     */
    set email(value) {
        this._email = value;
    }

    get email() {
        return this._email;
    }

    /**
     * @param {String} value
     */
    set password(value) {
        this._password = bcrypt.hashSync(value, saltRounds);
    }

    get password() {
        return this._password;
    }

    get addresses() {
        return [...this._addresses];
    }

    addAddress(address) {
        this._addresses.push(address);
    }

    updateAddresses(addresses) {
        this._addresses = [...addresses];
    }
}

export class Address {
    constructor(Street, HouseNumber, PostalCode, District, City, State) {
        this.street = Street;
        this.houseNumber = HouseNumber;
        this.district = District;
        this.postalCode = PostalCode;
        this.city = City;
        this.state = State;
    }
}

export function AdminUser() {
    const UsersData = JSON.parse(window.localStorage.getItem('Users'));
    const Admin = new User();

    if (!UsersData) {
        Admin.email = 'admin@admin.com';
        Admin.name = 'Administrador';
        Admin.password = 'admin';
        Admin.role = true;

        const Addr = new Address(
            'Administrator Street',
            '42',
            '200550',
            'Adm District',
            'Adminicity',
            'Administate'
        );

        const data = [Admin];

        Admin.addAddress(Addr);
        window.localStorage.setItem('Users', JSON.stringify(data));
        return getUser(Admin.id);
    } else {
        return UsersData.find((user) => user._email === 'admin@admin.com');
    }
}
