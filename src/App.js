import { React, useState } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./components/SideBar";
import ClientList from "./components/Client";
import InterventionList from "./components/Intervention";
import ComplaintList from "./components/Complaint";
import ProjectList from "./components/Project";
import './App.css';

const App = () => {
    const [sidebarIsOpen, setSidebarOpen] = useState(true);
    const [activeLink, setActiveLink] = useState("clients"); // Set "clients" as the initial active link

    const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    let contentComponent;

    // Render the corresponding component based on the active link
    if (activeLink === "clients") {
        contentComponent = <ClientList />;
    } else if (activeLink === "interventions") {
        contentComponent = <InterventionList />;
    } else if (activeLink === "complaints") {
        contentComponent = <ComplaintList/>;
    } else if (activeLink  === "projects"){
        contentComponent = <ProjectList/>;
    }

    return (
        <Router>
            <div className="App wrapper">
                <SideBar
                    toggle={toggleSidebar}
                    isOpen={sidebarIsOpen}
                    activeLink={activeLink}
                    handleLinkClick={handleLinkClick}
                />
                {contentComponent}
            </div>
        </Router>
    );
};

export default App;
