import React from 'react'
import './App.css';
import {UsersService} from "./service";

function App() {

  const [user, setUser] = React.useState(null)

  const handleGetUsers = async () => {
    const data = await UsersService.getUsers()
    console.log(data)
  }

  const handleCreateUser = async () => {
    const newUser = await UsersService.createUser({fullName: UsersService.randomUserName()})
    console.log(newUser)
    setUser(newUser)
  }

  const handleUpdateUser = async () => {
    const result = await user.setData({hat: 'on'})
    console.log(result)
  }

  const handleChangeName = async () => {
    const result = await user.changeName('Ivan')
    console.log(result)
  }

  return (
    <div className="App">

      {user && user.fullName}
      <button onClick={handleCreateUser}>Create user</button>
      <button onClick={handleGetUsers}>Get Users List</button>
      <button onClick={handleUpdateUser}>Update</button>
      <button onClick={handleChangeName}>Change to Ivan</button>
    </div>
  );
}

export default App;
