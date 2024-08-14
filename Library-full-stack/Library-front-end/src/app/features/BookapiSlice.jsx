import { fetchBaseQuery,createApi } from "@reduxjs/toolkit/query/react";



export const bookApi = createApi({

    reducerPath :"bookApi",
    baseQuery : fetchBaseQuery({baseUrl:'http://localhost:4008/book'}),
    tagTypes :["BOOK"],

    endpoints : (builder) => ({

        getBooks : builder.mutation({
          query({token,pagination}) {
            return { url:`/books?page=${pagination}`,method:"GET",headers :{Authorization : `Bearer ${token}`}
            }
          },
          providesTags :['BOOK']  
        }), // handles get request to get books

        createBook : builder.mutation({
          query(payload) {
            const token = JSON.parse(localStorage.getItem("token"));
            return {
              url:"/createBook",
              method:"POST",
              body:{...payload},
              headers : {
                Authorization : `Bearer ${token}`
              }
            }
          },
          invalidatesTags :['BOOK']
        }) ,// handles create book


        deleteBook : builder.mutation ({
          query({id}) {
            const token = JSON.parse(localStorage.getItem('token'))
             return {
              url:`/deleteBook?bookId=${id}`,
              method:"DELETE",
              headers : {
              Authorization : `Bearer ${token}`
            }
          }
          },
          invalidatesTags :['BOOK']
        }), // handles delete

        updateBook : builder.mutation ({
          query({id,payload}) {
            const token = JSON.parse(localStorage.getItem('token'))
             return {
              url:`/updateBook?bookId=${id}`,
              method:"PATCH",
              body:{...payload},
              headers : {
              Authorization : `Bearer ${token}`
            }
          }
          },
          invalidatesTags :['BOOK']
        })


})

})

export const {useGetBooksMutation, useCreateBookMutation , useDeleteBookMutation , useUpdateBookMutation} = bookApi