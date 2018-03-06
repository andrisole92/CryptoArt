import React    from "react";
import template from "./Auction.jsx";

class Auction extends React.Component {
  render() {
    return template.call(this);
  }
}

export default Auction;
