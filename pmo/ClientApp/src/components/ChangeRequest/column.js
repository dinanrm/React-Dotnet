const status = [
  'draft','raised','raised','approved','dissaproved'
]

export const column = [
        {
          Header: "Change Request ID",
          accessor: "customId",
          style: {
            textAlign: 'center',
            margin: 'auto'
          },
          minWidth: 80,
          sortable: false,
        },
        {
          Header: "Date Raised",
          accessor: "raisedDate",
          style: {
            textAlign: 'center',
            margin: 'auto'
          },
          sortable: false,
        },
        {
          Header: "Approval Date Required",
          accessor: "approvalReqDate",
          style: {
            textAlign: 'center',
            margin: 'auto'
          },
          sortable: false,
        },
        {
          Header: "Approved Date",
          accessor: "approvedDate",
          style: {
            textAlign: 'center',
            margin: 'auto'
          },
          sortable: false,
        },
        {
          Header: "Requester",
          accessor: "requester",
          style: {
            textAlign: 'center',
            margin: 'auto'
          },
          sortable: false,
        },
        {
          Header: "Status",
          id: "status",
          accessor: (d) => status[d['status']],
          style: {
            textAlign: 'center',
            margin: 'auto'
          },
          minWidth: 80,
          sortable: false,
        },
      ]