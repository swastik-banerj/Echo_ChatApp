import { httpAxios } from "@/Helper/httpAxios";

export async function getAllUsers(){
    const result = await httpAxios.get("/api/users")
        .then(response => response.data);

        return result;
}

export async function getUser(id){
    const result = await httpAxios.get(`/api/users/${id}`)
        .then(response => response.data);

        return result;
}
