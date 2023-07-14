import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle, faHandsHelping, faUsers} from "@fortawesome/free-solid-svg-icons";
import {Nav, NavItem, NavLink} from "reactstrap";
import classNames from "classnames";
import {Link} from "react-router-dom";
import '../../App.css';

const SideBar = ({isOpen, toggle, activeLink, handleLinkClick}) => (
    <div className={classNames("sidebar", {"is-open": isOpen})}>
        <div className="sidebar-header">
            <span color="info" onClick={toggle} style={{color: "#fff"}}>
                &times;
            </span>
            <h3>Bootstrap Sidebar</h3>
        </div>
        <div className="side-menu">
            <Nav vertical className="list-unstyled pb-3">
                <p>Dummy Heading</p>
                <NavItem>
                    <NavLink
                        tag={Link}
                        to={"/clients"}
                        className={activeLink === "clients" ? "active" : ""}
                        onClick={() => handleLinkClick("clients")}
                    >
                        <FontAwesomeIcon icon={faUsers} className="mr-2"/>
                        Clients
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        tag={Link}
                        to={"/interventions"}
                        className={activeLink === "interventions" ? "active" : ""}
                        onClick={() => handleLinkClick("interventions")}
                    >
                        <FontAwesomeIcon icon={faHandsHelping} className="mr-2"/>
                        Interventions
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        tag={Link}
                        to={"/complaints"}
                        className={activeLink === "complaints" ? "active" : ""}
                        onClick={() => handleLinkClick("complaints")}
                    >
                        <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2"/>
                        Complaints
                    </NavLink>
                </NavItem>
            </Nav>
        </div>
    </div>);

export default SideBar;
