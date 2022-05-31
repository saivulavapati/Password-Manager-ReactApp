import './index.css'

const PasswordItems = props => {
  const {eachItem, isPasswordShowed, onDeletePasswordItem} = props
  const {website, userName, password, id} = eachItem
  const passwordValue = isPasswordShowed ? (
    password
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="star-img"
    />
  )
  const deletePasswordItem = () => {
    onDeletePasswordItem(id)
  }
  return (
    <li className="password-list-item">
      <div className="password-details-desc">
        <h1 className="name-logo">{website[0].toUpperCase()}</h1>
        <div className="user-password-website-container">
          <p>{website}</p>
          <p>{userName}</p>
          <p>{passwordValue}</p>
        </div>
      </div>
      <button
        type="button"
        className="delete-btn"
        onClick={deletePasswordItem}
        testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default PasswordItems
