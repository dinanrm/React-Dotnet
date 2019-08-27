import {getFullDate} from "../../utils/date"

export const column = [
        {
          Header: "Lesson Learned Title",
          style: {
            textAlign: 'center',
            margin: 'auto'
          },
          sortable: false,
          accessor: "title"
        },
        {
          Header: "Project Title",
          id: "projectTitle",
          style: {
            textAlign: 'center',
            margin: 'auto'
          },
          sortable: false,
          accessor: "project.initiativeTitle"
        },
        {
          Header: "Project Phase",
          style: {
            textAlign: 'center',
            margin: 'auto'
          },
          sortable: false,
          accessor: "projectCategory.projectCategoryName"
        },
        {
          Header: "Category",
          style: {
            textAlign: 'center',
            margin: 'auto'
          },
          sortable: false,
          accessor: "lessonLearnedCategory.llCategoryName"
        },
        {
          Header: "Date Created",
          id: "lessonLearnedCreatedDate",
          style: {
            textAlign: 'center',
            margin: 'auto'
          },
          sortable: false,
          accessor: (d) => getFullDate(d['lessonLearnedCreatedDate'],'/')
        },
        {
          Header: "Created By",
          accessor: "user.userName",
          style: {
            textAlign: 'center',
            margin: 'auto'
          },
          sortable: false,
        },
      ]