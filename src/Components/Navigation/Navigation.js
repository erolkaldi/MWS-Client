import { Component } from "react";
import { ButtonGroup,UncontrolledDropdown,DropdownToggle,DropdownItem,DropdownMenu } from "reactstrap";


class Navigation extends Component {
    state = {  } 
    render() { 
        return (
            <ButtonGroup>
    <UncontrolledDropdown>
      <DropdownToggle caret>
        Settings
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>
          Another Action
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem>
          Another Action
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  </ButtonGroup>
        );
    }
}
 
export default Navigation;