import api from "./api"

export const loginAdmin =async (email,password)=>{
    const response= await api.get(
        `/admins?email=${email}&password=${password}`
    );
    return response.data;
}