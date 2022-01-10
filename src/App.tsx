import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'

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

type SearchPropsType = {
  value: string, onSubmit: (fixedValue: string) => void
}
const Search = (props: SearchPropsType) => {
  let [tempSearch, setTempSearch] = useState<string>('')

  useEffect(() => {
    setTempSearch(props.value)
  }, [props.value])

  return (
    <div>
      <input placeholder="search" value={tempSearch} onChange={ev => setTempSearch(ev.currentTarget.value)} />
      <button onClick={() => {
        props.onSubmit(tempSearch)
      }}>find</button>
    </div>
  )
}

type UsersListProps = {
  searchTerm: string
  selectedUser: SearchUserType | null
  onUserSelect: (user: SearchUserType) => void
}
const UsersList = (props: UsersListProps) => {
  const [users, setUsers] = useState<SearchUserType[]>([])

  useEffect(() => {
    axios.get<SearchResult>(`https://api.github.com/search/users?q=${props.searchTerm}`)
    .then(res => {
      setUsers(res.data.items)
    })
  }, [props.searchTerm])

  return <ul>
      {users.map(u => <li
        key={u.login}
        style={{backgroundColor:(props.selectedUser?.login === u.login) ? 'gray' : ''}}
        onClick={() => props.onUserSelect(u)}>{u.login}</li>)}
    </ul>
}

type Usertype = {
  selectedUser: SearchUserType | null
}
const User = (props: Usertype) => {
  let [userDetails, setUserDetails] = useState<UserType | null>(null)

  useEffect(() => {
    if(!!props.selectedUser)
      axios.get<UserType>(`https://api.github.com/users/${props.selectedUser.login}`)
      .then(res => {
        setUserDetails(res.data)
      })
    // eslint-disable-next-line
  }, [props.selectedUser])

  return (
    <div>
      <h2>dimych</h2>
      {userDetails && <div>
        <img src={userDetails.avatar_url} alt="" />
        <br />
        {userDetails.login}, followers: {userDetails.followers}
      </div>}
    </div>
  )
}

function App() {
  const dimychState = 'it-kamasutra';
  let [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)
  let [searchTerm, setSearchTerm] = useState<string>('it-kamasutra')

  useEffect(() => {
    if(selectedUser)
      document.title = selectedUser.login
  }, [selectedUser])

  return (
    <div style={{display:'flex'}}>
      <div>
        <Search value = {searchTerm} onSubmit = {(value: string) => setSearchTerm(value)} />
        <button onClick={() => setSearchTerm(dimychState)}>reset</button>
        {/*<Header tempSearch={tempSearch} searchTerm={searchTerm} setTempSearch={setTempSearch} setSearchTerm={setSearchTerm} fetch_data={fetch_data} />*/}
        <UsersList searchTerm={searchTerm} selectedUser={selectedUser} onUserSelect={setSelectedUser} />
        {/*<Users users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} setUserDetails={setUserDetails} />*/}
      </div>
      <div>
        <User selectedUser={selectedUser} />
      </div>
    </div>
  );
}

export default App;
