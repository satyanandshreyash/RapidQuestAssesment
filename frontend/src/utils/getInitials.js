export const getInitials = (fullName) => {
    if (!fullName) return "";
    const nameParts = fullName.trim().split(" ");
    const initials = nameParts
        .slice(0, 2) // only take first two words (first & last name)
        .map((part) => part[0]?.toUpperCase())
        .join("");
    return initials;
};