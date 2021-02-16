import React from "react";
import axios from "axios";
import CustomStore from "devextreme/data/custom_store";
import { tabs } from "./data";
import NavBar from "devextreme-react/nav-bar";

const store = new CustomStore({
  key: "id",
  loadMode: "raw",
  load: function () {
    console.log(store);
    return axios
      .get(
        "https://testdinamikoto.yuceyazilim.com.tr/api/Products/GetTopNavBar"
      )
      .then((response) => {
        return response.data;
      });
  },
});

const navBarAttributes = {
  id: 'id',
  className: 'className',
  text: 'title',
  
};

class NavBarExample extends React.Component {
  render() {
    return (
      <NavBar
        className="navBarContainer"
        dataSource={store}
        displayExpr="title"
      >
       
      </NavBar>
    );
  }
}
export default NavBarExample;
