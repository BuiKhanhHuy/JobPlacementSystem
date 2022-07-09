const checkPermission = (user, userRole) => {
  if (user !== null && "groups" in user) {
    const groups = user.groups;

    for (let i = 0; i < groups.length; i++) {
      if (groups[i].name === userRole) return true;
    }
  }
  return false;
};

export default checkPermission;
