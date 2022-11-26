const URL = 'https://testing-12da0-default-rtdb.europe-west1.firebasedatabase.app/users'

export class User {
  constructor(id, userData) {
    this.id = id
    Object.keys(userData).forEach(key => {
      this[key] = userData[key]
    })
  }

  async setData (data) {
    const {id, ...rest} = this
    return UsersService.updateUser(id, {...rest, ...data})
  }

  async changeName (name) {
    const {id, ...rest} = this
    return UsersService.updateUser(id, {...rest, fullName: name})
  }
}

export class UsersService {

  static randomUserName() {
    return (Math.random() + 1).toString(36).substring(2)
  }

  static async getUser (id) {
    const result = await fetch(`${URL}/${id}.json`)
    return result.json()
  }

  static async updateUser (id, data) {
    const result = await fetch(`${URL}/${id}.json`, {
      method: "PUT",
      body: JSON.stringify(data)
    })
    return result.json()
  }

  static async createUser (data) {
    const result = await fetch(`${URL}.json`, {
      method: "POST",
      body: JSON.stringify(data)
    })
    const userMeta = await result.json()
    const userData = await UsersService.getUser(userMeta.name)
    return new User(userMeta.name, userData)
  }

  static async getUsers () {
    const data = await fetch(`${URL}.json`)
    const usersCollection = await data.json()
    return Object.keys(usersCollection).map(id => {
      return new User(id, usersCollection[id])
    })
  }

}
