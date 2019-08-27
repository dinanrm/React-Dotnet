export const staticContent = [
    {
      title: "INTRODUCTION",
      input: [{
        label: "Purpose Of Project Management Plan ",
        type: 'text',
        parameter: 'projectManagementPlan',
        id: 'projectManagementPlan',
        tooltip : 'Provide the purpose of the project initiative approval. The intended audience of the <Project Name> PMP is all project stakeholders including the project sponsor, senior leadership and the project team.'
      }]
    },
    {
      title: "SCHEDULE & TIME MANAGEMENT",
      input: [{
        label: "Executive Summary Of Project Initiative ",
        type: 'text',
        parameter: 'executiveSummaryOfProjectInitiative',
        id: 'executiveSummaryOfProjectInitiative',
        tooltip : 'Provide an executive summary of the approved project charter. Provide a reference to the approved Project Initiative. Elaborate on any sections within the Project Initiative Summary that need further detail contained within the Project Management Plan (PMP).'
      },{
        label: "Assumption / Constrains ",
        type: 'text',
        parameter: 'assumption',
        id: 'assumption',
        tooltip : ''
      }]
    },
    {
      title: "SCOPE MANAGEMENT",
      input: [{
        label: "Scope Management Plan ",
        type: 'file',
        categoryId: '21',
        id: 'scopeManagementPlan',
        tooltip : 'Insert the project’s scope management plan or provide a reference to where it is stored.',
        required: true
      },{
        label: "Work Breakdown Structure ",
        type: 'file',
        categoryId: '22',
        id: 'workBreakdownStructure',
        tooltip : 'Insert the project’s work breakdown structure or provide a reference to where it is stored.',
        required: true
      },{
        label: "Change Control Management ",
        type: 'text',
        parameter: 'changeControlManagement',
        id: 'changeControlManagement',
        tooltip : 'Example of Change Control: Changes to the project will need to be made to deal with the potential impact of scope, time and cost in the schedule outage.'
      }]
    },
    {
      title: "SCHEDULE & TIME MANAGEMENT",
      input: [{
        label: "Schedule & Time Description ",
        type: 'text',
        parameter: 'scheduleAndTimeDescription',
        id: 'scheduleAndTimeDescription',
        tooltip : 'Example of schedule management approach: Establish a baseline within the first two weeks of the project and monitor progress against the baseline on a weekly basis. The Project Manager will be responsible for ensuring the project schedule is updated with the latest information. See the Project Schedule document for more guidance on project schedules and for Project Schedule templates.'
      },{
        label: "Milestones ",
        type: 'milestone',
        parameter: 'milestones',
        id: 'milestone',
        tooltip : 'The table below lists the milestones for this project, along with their estimated completion timeframe and Estimated Completion Timeframe. Insert milestone information (e.g., Engineering design, construction)'
      },{
        label: "Project Schedule ",
        type: 'file',
        categoryId: '23',
        id: 'projectSchedule',
        tooltip : 'Insert the project’s schedule or provide a reference to where it is stored.',
        required: true
      },{
        label: "Project Dependencies ",
        type: 'file',
        categoryId: '24',
        id: 'projectDependencies',
        tooltip : 'Insert the schedule/project dependencies (both internal and external).',
        required: true
      }],
    },
    {
      title: "COST & BUDGET MANAGEMENT",
      input: [{
        label: "Project Cost ",
        type: 'file',
        categoryId: '25',
        id: 'projectCost',
        tooltip : 'Insert the project’s cost management plan or provide a reference to where it is stored.',
        required: true
      }]
    },
    {
      title: "COMMUNICATION MANAGEMENT",
      input: [{
        label: "Project Communication ",
        type: 'file',
        categoryId: '26',
        id: 'projectCommunication',
        tooltip : 'Insert the project’s communication management plan or provide a reference to where it is stored.'
      }]
    },
    {
      title: "RISK MANAGEMENT",
      input: [{
        label: "Project Risk ",
        type: 'file',
        categoryId: '27',
        id: 'projectRisk',
        tooltip : 'Insert the project’s risk management plan or provide a reference to where it is stored.'
      },{
        label: "Risk Log ",
        type: 'file',
        categoryId: '28',
        id: 'riskLog',
        tooltip : 'Insert The Risk Log is normally maintained as a separate document. Provide a reference to where it is stored.'
      },{
        label: "Issue Log (In the project performance report) ",
        type: 'file',
        categoryId: '29',
        id: 'issueLog',
        tooltip : 'Insert The Issue Log is normally maintained as a separate document. Provide a reference to where it is stored.'
      }]
    }
    
]