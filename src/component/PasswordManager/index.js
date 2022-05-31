import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import PasswordItems from '../PasswordItems'

import './index.css'

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    passwordsCount: 0,
    inpWebsite: '',
    inpUserName: '',
    inpPassword: '',
    isPasswordShowed: false,
    searchInp: '',
  }

  onDeleteItem = id => {
    const {passwordsList} = this.state
    const remainingPasswordsList = passwordsList.filter(
      eachObj => eachObj.id !== id,
    )
    this.setState(prevState => ({
      passwordsList: remainingPasswordsList,
      passwordsCount: prevState.passwordsCount - 1,
    }))
  }

  onClickingAddBtn = event => {
    event.preventDefault()
    const {inpWebsite, inpUserName, inpPassword} = this.state
    const newPasswordItem = {
      id: uuidV4(),
      website: inpWebsite,
      userName: inpUserName,
      password: inpPassword,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPasswordItem],
      inpWebsite: '',
      inpUserName: '',
      inpPassword: '',
      passwordsCount: prevState.passwordsCount + 1,
    }))
  }

  website = event => {
    this.setState({inpWebsite: event.target.value})
  }

  userName = event => {
    this.setState({inpUserName: event.target.value})
  }

  password = event => {
    this.setState({inpPassword: event.target.value})
  }

  isCheckBoxChecked = () => {
    this.setState(prevState => ({
      isPasswordShowed: !prevState.isPasswordShowed,
    }))
  }

  renderPasswordsListItem = () => {
    const {passwordsList, isPasswordShowed, searchInp} = this.state
    const filteredPasswordsList = passwordsList.filter(eachObj =>
      eachObj.website.toUpperCase().includes(searchInp.toUpperCase()),
    )

    return (
      <ul className="passwords-list-container">
        {filteredPasswordsList.map(eachItem => (
          <PasswordItems
            eachItem={eachItem}
            key={eachItem.id}
            isPasswordShowed={isPasswordShowed}
            onDeletePasswordItem={this.onDeleteItem}
          />
        ))}
      </ul>
    )
  }

  searchInputValue = event => {
    this.setState({searchInp: event.target.value})
  }

  render() {
    const {
      passwordsList,
      passwordsCount,
      inpWebsite,
      inpUserName,
      inpPassword,
      searchInp,
    } = this.state
    const filteredPasswordsList = passwordsList.filter(eachObj =>
      eachObj.website.toUpperCase().includes(searchInp.toUpperCase()),
    )
    const isPasswordsAdded =
      passwordsList.length > 0 && filteredPasswordsList.length !== 0
    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="passwd-mngr-img"
        />
        <div className="form-card">
          <div className="password-manager-img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-manager-img"
            />
          </div>
          <form className="from-container" onSubmit={this.onClickingAddBtn}>
            <h1 className="add-new-password-heading">Add New Password</h1>
            <div className="inp-element-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                alt="website"
                className="inp-logo-img"
              />
              <input
                type="text"
                className="inp-element"
                placeholder="Enter Website"
                onChange={this.website}
                value={inpWebsite}
              />
            </div>
            <div className="inp-element-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                alt="username"
                className="inp-logo-img"
              />
              <input
                type="text"
                className="inp-element"
                placeholder="Enter Username"
                onChange={this.userName}
                value={inpUserName}
              />
            </div>
            <div className="inp-element-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                alt="password"
                className="inp-logo-img"
              />
              <input
                type="password"
                className="inp-element"
                placeholder="Enter Password"
                onChange={this.password}
                value={inpPassword}
              />
            </div>
            <div className="add-btn-container">
              <button type="submit" className="add-btn">
                Add
              </button>
            </div>
          </form>
        </div>
        <div className="password-card">
          <div className="your-password-section">
            <div className="your-password-container">
              <h1 className="your-password-heading">Your Passwords</h1>
              <p className="count-para">{passwordsCount}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
                alt="search"
                className="search-logo"
              />
              <input
                type="search"
                placeholder="Search"
                className="inp-search-ele"
                onChange={this.searchInputValue}
                value={searchInp}
              />
            </div>
          </div>
          <hr />
          <div className="show-password-container">
            <input
              type="checkbox"
              id="showPasswords"
              className="show-password-checkbox"
              onChange={this.isCheckBoxChecked}
            />
            <label htmlFor="showPasswords" className="show-password-label">
              Show Passwords
            </label>
          </div>
          {!isPasswordsAdded ? (
            <div className="no-passwords-img-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-password-img"
              />
              <p className="no-passwords-heading">No Passwords</p>
            </div>
          ) : (
            this.renderPasswordsListItem()
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
