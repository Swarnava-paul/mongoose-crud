import { fetchBaseQuery,createApi } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
    reducerPath:"userApi",
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:4008/user"}),

    endpoints : (builder) => ({

        login : builder.mutation({
            query(payload) {
                return {
                url:"/login",
                method:"POST",
                body:{...payload}
                }
            }
            
        }) , // login 

        register : builder.mutation ({
            query : (payload) => ({
                url:"/register",
                method:'POST',
                body:{...payload}
            })
        }) , // register

        checkUserRole : builder.mutation({
            query(token) {
                return {
                    url:"/checkRole",
                    method:"GET",
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                }
            }
        })

    }), // check user role query

})

export const {useLoginMutation , useRegisterMutation , useCheckUserRoleMutation} = usersApi