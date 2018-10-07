import React, { Component } from 'react';

class List extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getList();
  }

  // Retrieves the list of items from the Express app
  getList = () => {
    fetch('/api/users')
    .then(res => res.json())
    .then(list => this.setState({ list }))
  }

  render() {
    const { list } = this.state;

    return (
      <div className="App">
        <h1>Users List</h1>
        {/* Check to see if any items are found*/}
        {list.length ? (
          <div>
            <table className="table table-hover">
              <thead>
                  <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>UserName</th>
                      <th>Email</th>
                      <th>Phone number</th>
                      <th>Github Handle</th>
                      <th>Action</th>
                  </tr>
              </thead>
                  
            {/* Render the list of items */}
              <tbody>
              {list.map((item) => {
                return(
                    <tr key={item.UserId}>
                      <td>{item.FirstName} </td>
                      <td>{item.LastName}</td>
                      <td>{item.UserName}</td>
                      <td>{item.Email}</td>
                      <td>{item.Phone}</td>
                      <td>{item.GithubHandle}</td>
                      <td><a>Edit</a>|<a>Delete</a></td>
                    </tr>
                    )}
                  )
                }
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <h2>No List Items Found</h2>
          </div>
        )
      }
      </div>
    );
  }
  /*
  render() {
    const { list } = this.state;

    return (
      <div className="App">
        <h1>List of Items</h1>
        {/* Check to see if any items are found*//*}
        {list.length ? (
          <div>
            {/* Render the list of items *//*}
            {list.map((item) => {
              return(
                <div>
                  {item.UserID}
                  {item.FirstName}
                  {item.LastName}
                  {item.UserName}
                  {item.Email}
                  {item.Phone}
                  {item.GithubHandle}
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <h2>No List Items Found</h2>
          </div>
        )
      }
      </div>
    );
  }
  */
}

export default List;