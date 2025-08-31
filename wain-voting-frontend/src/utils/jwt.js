import { jwtDecode } from "jwt-decode";

export const getCurrentUsername = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.sub || null; // username nằm trong "sub"
  } catch (err) {
    return null;
  }
};

export const getWalletAddress = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.walletAddress || null;
  } catch (err) {
    return null;
  }
};

export const getUserRole = () => {
  // Nếu đang test nhanh mà không cần login thực
  // const IS_TEST_MODE = true;
  // if (IS_TEST_MODE) return "ADMIN"; // hoặc "USER"

  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // giây

    // Nếu token hết hạn → xóa luôn khỏi localStorage
    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return null;
    }

    // Trả về role (có thể là "role" hoặc mảng "roles")
    return decoded.scope;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};
