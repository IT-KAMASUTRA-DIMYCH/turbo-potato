import {UserType} from '../App'

type PropsType = {
  userDetails: UserType | null
}

const Header = (props: PropsType) => {
  return (
    <div>
      <h2>username</h2>
      {props.userDetails && <div>
        <img src={props.userDetails.avatar_url} alt="" />
        <br />
        {props.userDetails.login}, followers: {props.userDetails.followers}
      </div>}
    </div>
  )
}

export default Header