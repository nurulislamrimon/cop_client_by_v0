export const revalidationTime = 24 * 60 * 60
export const revalidationTimeLong = 365 * 24 * 60 * 60
export const accessTokenValidity = 24 * 60 * 60

export const currency = "৳"

export const mainRoutes = ['/members', '/committee', '/directors', '/finance'] as const;
export const financeRoutes = ['/diposit', '/withdraw', '/profit', '/loss', '/expense', '/investment'] as const;