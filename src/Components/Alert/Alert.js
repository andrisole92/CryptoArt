import React    from "react";
import template from "./Alert.jsx";

class Alert extends React.Component {
  render() {
    return template.call(this);
  }
}

export default Alert;
