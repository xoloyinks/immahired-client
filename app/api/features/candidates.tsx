import { url } from "inspector";
import { apiSlice } from "../service";

const candidateEndpoints = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createAccount: builder.mutation({
            query: (formData) => ({
                url: "/auth/createAccount",
                body: formData,
                method: "POST",
                formData: true, // This tells RTK Query to handle FormData properly
                prepareHeaders: (headers: any) => {
                    // Remove content-type to let browser set it with boundary
                    headers.delete('content-type');
                    return headers;
                },
            })
        }),
        updateDoc: builder.mutation({
            query: ({token,formData}) => ({
                url: `/talents`,
                body: formData,
                method: 'PATCH',
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
        }),
        applyJob: builder.mutation({
            query: ({id, formData, token}) => ({
                url: `/jobs/${id}/apply`,
                method: 'POST',
                body: formData,
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
        }),
        applications: builder.query({
            query: () => ({
                url:`/applications`
            })
        }),

        refreshResume: builder.mutation({
            query: (id) => ({
                url: `/talents/${id}/refreshResume`,
                method: 'POST'
            })
        })
    })
})

export const { useCreateAccountMutation, useUpdateDocMutation, useApplyJobMutation, useApplicationsQuery, useRefreshResumeMutation } = candidateEndpoints;