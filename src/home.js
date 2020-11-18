import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";

class Home extends Component {
  state = {
    users: [],
    filteredUsers: [],
    selectedIndex: "",
  };

  getMockData = () => {
    fetch("http://www.mocky.io/v2/5ba8efb23100007200c2750c")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ users: data, filteredUsers: [...data] });
      })
      .catch((err) => console.log(err));
  };

  searchUser = (e) => {
    this.setState({ searchString: e.target.value, selectedIndex: 0 }, () =>
      this.filterUsers()
    );
  };

  filterUsers = () => {
    let filteredUsers = this.state.users;
    filteredUsers = this.state.users.filter((user) => {
      return user.name
        .toLowerCase()
        .includes(this.state.searchString.toLowerCase());
    });
    this.setState({ filteredUsers: filteredUsers });
  };

  mouseEnter = (index) => {
    this.setState({
      selectedIndex: index,
    });
    this.handleShow(index);
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 40) {
      this.setState(
        {
          selectedIndex: this.state.selectedIndex + 1,
        },
        () => {
          this.handleShow(this.state.selectedIndex);
        }
      );
    } else if (e.keyCode === 38) {
      this.setState(
        {
          selectedIndex: this.state.selectedIndex - 1,
        },
        () => {
          this.handleShow(this.state.selectedIndex);
        }
      );
    }
  };

  handleShow = (i) => {
    this.refs[i].scrollIntoView({ block: "end", behavior: "smooth" });
  };

  componentDidMount() {
    this.getMockData();
  }

  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
            <h3 style={{ margin: "20px 0" }}>SearchTest</h3>
          </Col>
        </Row>
        <Row>
          <Col md="3"></Col>
          <Col md="6">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span role="img" aria-label="search">
                    &#128269;
                  </span>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="username"
                onChange={this.searchUser}
                onKeyDown={this.handleKeyDown}
              />
            </InputGroup>
          </Col>
          <Col md="3"></Col>
        </Row>
        <Row>
          <Col md="3"></Col>
          <Col md="6">
            <br />
            <Card>
              <div
                style={{
                  height: "300px",
                  "overflow-y": "scroll",
                }}
              >
                {this.state.filteredUsers ? (
                  this.state.filteredUsers.map((value, index) => {
                    return (
                      <div
                        key={index}
                        ref={index}
                        onMouseEnter={(e) => this.mouseEnter(index)}
                        style={{
                          backgroundColor:
                            index === this.state.selectedIndex ? "#61dafb" : "",
                        }}
                      >
                        <p>{value.name}</p>
                        <h6 className="mb-2 text-muted">{value.id}</h6>
                        <p>{value.address}</p>
                        <br />
                        <hr />
                      </div>
                    );
                  })
                ) : (
                  <p>Users Does not exist</p>
                )}
              </div>
            </Card>
          </Col>
          <Col md="3"></Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
