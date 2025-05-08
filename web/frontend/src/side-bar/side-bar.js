const nav_b_sec = [
    { name: "DashBoard", svg: "bi-house-door-fill", options: [], href: "#" },
    {
        name: "XXXXX", svg: "bi-mortarboard-fill", options: [
            { name: "X1X2X3", href: "#" },
            { name: "X1X2X3", href: "#" },
            { name: "X1X2X3", href: "#" },
            { name: "X1X2X3", href: "#" }
        ], href: ""
    },
    {
        name: "Formandos", svg: "bi-journal-check", options: [
            { name: "X1X2X3", href: "#" },
            { name: "X1X2X3", href: "#" },
            { name: "X1X2X3", href: "#" },
            { name: "X1X2X3", href: "#" }
        ], href: ""
    },
    { name: "Avaliações / Tarefas", svg: "bi-graph-up-arrow", options: [], href: "#" },
    { name: "Perfil", svg: "bi-calendar-week", options: [], href: "#" },
    { name: "Fórum", svg: "bi-person-fill", options: [], href: "#" },
    { name: "Definições", svg: "bi-chat-left-quote", options: [], href: "#" },
    { name: "Ajuda / FAQ", svg: "bi-gear-fill", options: [], href: "#" },
    { name: "Logout", svg: "bi-gear-fill", options: [], href: "#" }
];

function createSideNavBar() {
    const top_section = () => React.createElement("div", { id: "top-section", className: "w-100 d-flex flex-column align-items-center" },
        React.createElement("img", { src: "./assets/logotipo.png", className: "w-75 py-4" }),
        React.createElement("div", { id: "user-profile", className: "d-flex flex-row align-items-center w-100" },
            React.createElement("img", { src: "./assets/profile-picture.png", className: "w-25 rounded-circle", title: "profile-picture" }),
            React.createElement("div", { id: "user-info", className: "d-flex flex-column w-auto ps-3" },
                React.createElement("p", { className: "fs-5 fw-bold m-0" }, "Username"),
                React.createElement("p", { className: "fs-6 m-0" }, "Formando")
            )
        )
    );

    const hr = () => React.createElement("hr", { className: "my-4 mx-0" });

    const bottom_section = () => {
        return React.createElement("div", { id: "bottom-section", className: "d-flex flex-column w-100" },
            ...nav_b_sec.map((ele, index) => ele.options.length > 0 ?
                React.createElement("div", { key: index },
                    React.createElement("button", {
                        className: "fs-6 btn btn-secondary dropdown-toggle rounded-0 p-0 px-3 m-0 my-3 bg-transparent border-0 d-flex justify-content-between align-items-center w-100",
                        "data-bs-toggle": "collapse",
                        "data-bs-target": `#collapse-${index}`,
                        "aria-expanded": "false",
                        "aria-controls": `collapse-${index}`
                    },
                        React.createElement("div", { className: "d-flex flex-row align-items-center" },
                            React.createElement("i", { className: `bi ${ele.svg} me-2` }),
                            ele.name
                        )
                    ),
                    React.createElement("div", { id: `collapse-${index}`, className: "collapse ps-3" },
                        ele.options.map((opt, i) => React.createElement("a", {
                            key: i,
                            href: opt.href,
                            className: "fs-6 d-block ps-4"
                        }, opt.name))
                    )
                )
                : React.createElement("a", {
                    key: index,
                    className: "fs-6 btn btn-secondary rounded-0 bg-transparent border-0 text-start m-0 my-3 ms-3 p-0",
                    href: ele.href
                },
                    React.createElement("i", { className: `bi ${ele.svg} me-2` }),
                    ele.name
                )
            )
        );
    };

    const main = document.querySelector("main"), content = document.querySelector("#content");
    if (!main || !content) return console.error("Erro: Não foi possível encontrar #main ou #content.");
    const nav = Object.assign(document.createElement("nav"), { className: "nav flex-column col-2 vh-100" });
    main.insertBefore(nav, content);
    ReactDOM.render(React.createElement(React.Fragment, {}, top_section(), hr(), bottom_section()), nav);
}

createSideNavBar();
