/**
 * AUTO-GENERATED BY scripts/frontend-api-code-generator/gen.py
 */
import request from "@/utils/request";

const api = {
  readRoles: params => {
    return request({
      url: "/roles/",
      params: params,
      method: "get"
    });
  },
  createRole: data => {
    return request({
      url: "/roles/",
      headers: {
        "Content-Type": "application/json"
      },
      data: data,
      method: "post"
    });
  },
  readRoleById: (role_id, params) => {
    return request({
      url: "/roles/" + role_id,
      params: params,
      method: "get"
    });
  },
  updateRole: (role_id, data) => {
    return request({
      url: "/roles/" + role_id,
      headers: {
        "Content-Type": "application/json"
      },
      data: data,
      method: "put"
    });
  },
  deleteRole: role_id => {
    return request({
      url: "/roles/" + role_id,
      method: "delete"
    });
  }
};
export default api;