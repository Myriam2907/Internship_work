import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Navdata = () => {
    const history = useNavigate();

    function updateIconSidebar(e) {
        if (e && e.target && e.target.getAttribute("subitems")) {
            const ul = document.getElementById("two-column-menu");
            const iconItems = ul.querySelectorAll(".nav-icon.active");
            let activeIconItems = [...iconItems];
            activeIconItems.forEach((item) => {
                item.classList.remove("active");
                var id = item.getAttribute("subitems");
                if (document.getElementById(id)) document.getElementById(id).classList.remove("show");
            });
        }
    }

    useEffect(() => {
        document.body.classList.remove("twocolumn-panel");
    }, []);

    const menuItems = [{id: "clients", label: "Clients", link: "/clients"}, {
        id: "interventions",
        label: "Interventions",
        link: "/interventions"
    }, {id: "complaints", label: "Complaints", link: "/complaints"}, {
        id: "projects",
        label: "Projects",
        link: "/projects"
    },];

    return (<ul>
            {menuItems.map((menuItem) => (<li key={menuItem.id}>
                    <a href={menuItem.link}>{menuItem.label}</a>
                </li>))}
        </ul>);
};

export default Navdata;
