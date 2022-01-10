import { useEffect } from 'react';
import {UserType,SearchUserType} from '../App'
import axios from 'axios'

type PropsType = {
  users: SearchUserType[]
  selectedUser: SearchUserType | null
  setSelectedUser: (value: SearchUserType | null) => void
  setUserDetails: (value: UserType | null) => void
}

const Header = (props: PropsType) => {
  useEffect(() => {
    if(!!props.selectedUser)
      axios.get<UserType>(`https://api.github.com/users/${props.selectedUser.login}`)
      .then(res => {
        props.setUserDetails(res.data)
      })
    // eslint-disable-next-line
  }, [props.selectedUser])

  return (
    <ul>
      {props.users.map(u => <li
        key={u.login}
        style={{backgroundColor:(props.selectedUser?.login === u.login) ? 'gray' : ''}}
        onClick={() => props.setSelectedUser(u)}>{u.login}</li>)}
    </ul>
  )
}

export default Header