const END_POINT = "http://localhost:3001";

export const authenticateUser = async (username: string, password: string) => {
  try {
    const result = await fetch(`${END_POINT}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });
    return result?.json();
  } catch (e) {
    console.log("error", e);
  }
};

export const getUserProfile = async (token: string) => {
  try {
    const profileDetails = await fetch(`${END_POINT}/profile`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `auth-token=${token}`,
      },
    });

    if (profileDetails?.status !== 401) {
      return profileDetails?.json();
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

export const logoutUser = async () => {
  try {
    await fetch(`${END_POINT}/auth`, {
      method: "DELETE",
      credentials: "include",
    });
  } catch (e) {}
};

export const changeUserType = async () => {
  try {
    const details = await fetch(`${END_POINT}/change_user_type`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (details?.status !== 401) {
      return details?.json();
    } else {
      return null;
    }
  } catch {
    return null;
  }
};
