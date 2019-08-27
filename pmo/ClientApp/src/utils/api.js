import axios from './axios-instances';

function makeBaseResource(name) {
    return {
        all: async (params = null) => axios.get(make(`${name}/all`), { params }),
        list: async (params = null) => axios.get(make(name), { params }),
        get: async id => axios.get(make(`${name}/${id}`)),
        save: async form => axios.post(make(name), form),
        update: async (id, form) => axios.put(make(`${name}/${id}`), form),
        delete: async id => axios.delete(make(`${name}/${id}`)),
    };
}

function make(segments) {
    return `/api/${segments}`;
}

export default {
    users: {
        ...makeBaseResource('users'),
        login: async (userName,userPassword) => axios.post(make('users/login'), { userName,userPassword }),
        loginf5: async () => axios.get(make(`users/login`)),
        getId: async () => axios.get(make('users/getid')),
        logout: async () => axios.get(make('users/logout'))
    },
    roles: {
        ...makeBaseResource('roles'),
    },
    categories: {
        ...makeBaseResource('categories'),
    },
    projects: {
        ...makeBaseResource('projects'),
        initiating: async (id) => axios.get(make(`projects/initiating/${id}`)),
        planning: async (id) => axios.get(make(`projects/planning/${id}`)),
        executing: async (id) => axios.get(make(`projects/executing/${id}`)),
        closing: async (id) => axios.get(make(`projects/closing/${id}`)),
        initiative: async (params) => axios.post(make('initiatives'), params),
        lists: async (id) => axios.get(make(`projects/list/${id}`)),
        updateStatus: async (id,param) => axios.put(make(`projects/updateStatus/${id}`),param),
        limit: async (id,page) => axios.get(make(`projects/limit/${id}/${page}`)),
        archive: async (id, page) => axios.get(make(`projects/archive/${id}/${page}`)),
        search: async (keyword, id, page) => axios.get(make(`projects/search/${keyword}/${id}/${page}`)),
        searchProject: async (userId, page, param) => axios.post(make(`projects/search/${userId}/${page}`), param),
        updateClosing: async (id, param) => axios.put(make(`projects/updateClosing/${id}`), param)
    },
    documents: {
        ...makeBaseResource('documents'),
        upload: async (data) => axios.post(make('documents/upload'), data),
        byProject: async (id) => axios.get(make(`documents/byProject/${id}`)),
        byParam: async (projId,categoryId) => axios.get(make(`documents/byParam/${projId}/${categoryId}`)),
        byLessonLearned: async (projId,categoryId,LLId) => axios.get(make(`documents/byLessonLearned/${projId}/${categoryId}/${LLId}`)),
        download: async (id, config) => axios.get(make(`documents/download/${id}`),config),
        updateStatus: async (param) => axios.put(make('documents/'), param),
        delete: async (id) => axios.delete(make(`documents/${id}`))
    },
    milestones: {
        ...makeBaseResource('milestones'),
        byProject: async (id) => axios.get(make(`milestones/byProject/${id}`)),
    },
    histories: {
        ...makeBaseResource('histories'),
        // byHistoryId: async (id) => axios.get(make(`histories/${id}`)),
        byProjectId: async (id) => axios.get(make(`histories/byProject/${id}`)),
        byRole: async (id,role) => axios.get(make(`histories/planning/${id}/${role}`))
    },
    dashboard: {
        ...makeBaseResource('dashboard'),
        statistic: async () => axios.get(make(`dashboard/statistics`)),
        recentApproved: async() => axios.get(make(`dashboard/recentApprovedProjects`)),
        recentDisapproved: async () => axios.get(make(`dashboard/recentDisapprovedProjects`)),
        chart: async () => axios.get(make(`dashboard/chart`)),
        userTask: async (id) => axios.get(make(`dashboard/userTasks/${id}`))
    },
    LessonLearnedCategories: {
        ...makeBaseResource('LessonLearnedCategories'),
    },
    LessonLearned: {
        ...makeBaseResource('LessonLearned'),
        byProject: async (id) => axios.get(make(`LessonLearned/byProject/${id}`)),
    },
    ProjectCategories: {
        ...makeBaseResource('ProjectCategories'),
    },
    ChangeRequests: {
        ...makeBaseResource('ChangeRequests'),
        byProject: async (id) => axios.get(make(`ChangeRequests/byProject/${id}`)),
        updateStatus: async (id,param) => axios.put(make(`ChangeRequests/updateStatus/${id}`), param),
    }
}