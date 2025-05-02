type User = {
    id: number | string;
    role: string;
    rules: string[];
};

export function hasPermission(user: User | Record<string, any> | undefined | null, requiredRules: string[] = []): boolean {
    if (!user) return false;

    if (user.role === "super_admin") {
        return true
    }

    if (!requiredRules.length) return true;

    if (!Array.isArray(user.rules)) return false;

    console.log(`Checking permissions for user ${user.id}`, user.rules);

    return requiredRules.every((requiredRule) => {
        if (user.rules.includes(requiredRule)) return true;
        const requiredResource = requiredRule.split(':')?.[0];
        const allPermitted = `${requiredResource}:*`;
        return user.rules.includes(allPermitted);
    });
}
