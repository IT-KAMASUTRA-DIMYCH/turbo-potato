import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import Header from './components/header'
import Users from './components/users'
import User from './components/user'

export type SearchUserType = {
  login: string
}
type SearchResult = {
  items: SearchUserType[]
}

export type UserType = {
  login: string
  id: number
  avatar_url: string
  followers: number
}

function App() {
  let [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)
  let [userDetails, setUserDetails] = useState<UserType | null>(null)
  let [users, setUsers] = useState<SearchUserType[]>([])
  let [tempSearch, setTempSearch] = useState<string>('it-kamasutra')
  let [searchTerm, setSearchTerm] = useState<string>('it-kamasutra')

  useEffect(() => {
    if(selectedUser)
      document.title = selectedUser.login
  }, [selectedUser])

  const fetch_data = (term: string) => {
    axios.get<SearchResult>(`https://api.github.com/search/users?q=${term}`)
    .then(res => {
      setUsers(res.data.items)
    })
  }

  return (
    <div style={{display:'flex'}}>
      <div>
        <Header tempSearch={tempSearch} searchTerm={searchTerm} setTempSearch={setTempSearch} setSearchTerm={setSearchTerm} fetch_data={fetch_data} />
        <Users users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} setUserDetails={setUserDetails} />
      </div>
      <div>
        <User userDetails = {userDetails} />
      </div>
    </div>
  );
}

export default App;
