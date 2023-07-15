import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle, faHandsHelping, faUsers, faFolder} from "@fortawesome/free-solid-svg-icons";
import {Nav, NavItem, NavLink} from "reactstrap";
import classNames from "classnames";
import {Link} from "react-router-dom";
import '../../App.css';

const SideBar = ({isOpen, toggle, activeLink, handleLinkClick}) => (
    <div className="sidebar-header" style={{ backgroundColor:"lightgrey" }}>
    <span color="info" onClick={toggle} style={{ color: "#fff" }}>
        &times;
    </span>
        <div className="logo-container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img src={require("./axia.png")} alt="Logo" className="logo" style={{ width: "100px", height: "100px" }} />
        </div>


        <div className="side-menu">
            <Nav vertical className="list-unstyled pb-3">

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
                <NavItem>
                    <NavLink
                        tag={Link}
                        to={"/projects"}
                        className={activeLink === "projects" ? "active" : ""}
                        onClick={() => handleLinkClick("projects")}
                    >
                        <FontAwesomeIcon icon={faFolder} className="mr-2"/>
                        Projects
                    </NavLink>
                </NavItem>
            </Nav>
        </div>
    </div>);

export default SideBar;
