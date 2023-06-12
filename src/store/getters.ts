const getters = {
    userId: (state:{user: { userId: string }}) => state.user.userId,
    users: (state:{user: { users: any }}) => state.user.users,
    permissions: (state:{user: { permissions: any } }) => state.user.permissions,
    productCode: (state:{user: { productCode: any } }) => state.user.productCode,
    menus: (state:{menus: { menus: any } }) => state.menus.menus,
    meta: (state:{menus: { meta: any } }) => state.menus.meta,
    isCollapse: (state:{menus: { isCollapse: boolean } }) => state.menus.isCollapse,
    oEnumerate: (state:{common: { oEnumerate: string }}) => state.common.oEnumerate,
    arrEnumerate: (state:{common: { arrEnumerate: string }}) => state.common.arrEnumerate,
    productPrimaryName: (state:{system: { productPrimaryName: string }}) => state.system.productPrimaryName,
    productSecondaryName: (state:{system: { productSecondaryName: string }}) => state.system.productSecondaryName,
    systemIcon: (state:{system: { systemIcon: string }}) => state.system.systemIcon,
    system: (state:{system: { system: object }}) => state.system.system,
}
export default getters
