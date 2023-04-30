import api from "../constants/api";

const token = localStorage.getItem("login");

const accountService = {

  getProfile() {
    return api.get("api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  uploadUserAvatar(file) {
    return api.post("api/upload-avatar", file, {
      headers: {
        ContentType: `multipart/form-data`,
        Authorization: `Bearer ${token}`,
      },
    })
  },
  updateProfile(data){
    return api.put("api/user", data,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getAllAccount() {
    return api.get("api/admin/get-all-account", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getAccountById(id) {
    if (!token) return null;
    return api.get("/api/admin/get-account-by-id/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  createAccount(data) {
    return api.post("/api/admin/add-account", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  updateAccount(id, data) {
    return api.put("/api/admin/update-account-by-id/" + id, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  deleteAccount(id) {
    if (!token) return null;
    return api.delete("/admin/delete-account/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  }
}

export default accountService;
