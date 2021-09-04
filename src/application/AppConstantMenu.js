export const menuAll = [
    {
        id: 0,
        type: 1,
        name: "Dashboard",
        icon: "menu-icon mdi mdi-chart-areaspline",
        path: "/sample/table"
    },
    {
        id: 1,
        type: 1,
        name: "User",
        icon: "menu-icon mdi mdi-chart-areaspline",
        path: "/user"
    },
    {
        id: 1,
        type: 1,
        name: "Role",
        icon: "menu-icon mdi mdi-chart-areaspline",
        path: "/role"
    }

]

export function renderMenu() {
    // return menuAll
    let user = JSON.parse(localStorage.getItem('user'))
    return menuAll
}