import { convertFromHTML } from 'draft-js';

export default function validate(values) {
    let errors = {};

    !values.initiativeTitle && values.initiativeTitle === '' && ( errors.initiativeTitle = 'Title is required' );
    values.initiativeTitle && values.initiativeTitle.length > 50 && ( errors.initiativeTitle = 'Maximum title 50 character' );
    !values.date && ( errors.date = 'Date is required' );
    !values.project_owner && ( errors.project_owner = 'Project Owner is required' );
    !values.project_sponsor && ( errors.project_sponsor = 'Project Sponsor is required' );
    !values.project_manager && ( errors.project_manager = 'Project Manager is required' );
    values.project_team.length < 1 && ( errors.project_team = 'Project Team is required' );
    values.project_officer.length < 1 && ( errors.project_officer = 'Project Officer is required' );
    isTextEditorEmpty(values.backgroundInformation) && ( errors.backgroundInformation = 'Background Information is required' );
    isTextEditorEmpty(values.objectiveBenefit) && ( errors.objectiveBenefit = 'Objective Benerfit is required' );
    isNaN(values.landCompensation) && ( errors.landCompensation = 'Land Compensation is required' );
    isNaN(values.landImprovement) && ( errors.landImprovement = 'Land Improvement is required' ); 
    isNaN(values.building) && ( errors.building = 'Building is required' );
    isNaN(values.infrastructure) && ( errors.infrastructure = 'Infrastructure is required' );
    isNaN(values.plantMachine) && ( errors.plantMachine = 'Plan & Machine is required' );
    isNaN(values.equipment) && ( errors.equipment = 'Equipment is required' ); 
    isNaN(values.expenseUnderDevelopment) && ( errors.expenseUnderDevelopment = 'Expense Under Development is required' );
    isNaN(values.workingCapital) && ( errors.workingCapital = 'Working Capital is required' );
    isNaN(values.contingency) && ( errors.contingency = 'Contingency is required' );
    isNaN(values.total) && ( errors.total = 'Total is required' ); 
    isTextEditorEmpty(values.timeline) && ( errors.timeline = 'Timeline is required' );
    !values.requestedBy && ( errors.requestedBy = 'Requested By is required' );
    !values.acknowledgedBy && ( errors.acknowledgedBy = 'Acknowledged By is required' );
    !values.agreedBy && ( errors.agreedBy = 'Agreed By is required' ); 
    isTextEditorEmpty(values.executiveSummary) && ( errors.executiveSummary = 'Executive Summary is required' );
    isTextEditorEmpty(values.projectDefinition) && ( errors.projectDefinition = 'Project Definition is required' );
    isTextEditorEmpty(values.vision) && ( errors.vision = 'Vision is required' );
    isTextEditorEmpty(values.objective) && ( errors.objective = 'Objectives is required' ); 
    // if (!/\S+@\S+\.\S+/.test(values.email)) {
    //   errors.email = 'Email address is invalid';
    // }
    
    return errors;
  };

  export const validatePlanning = (values,files,milestone) => {
    let errors = {};
    isTextEditorEmpty(values.projectManagementPlan) && ( errors.projectManagementPlan = 'Project Management Plan is required' ); 
    isTextEditorEmpty(values.executiveSummaryOfProjectInitiative) && ( errors.executiveSummaryOfProjectInitiative = 'Executive Summary is required' ); 
    isTextEditorEmpty(values.assumption) && ( errors.assumption = 'Assumption is required' ); 
    isTextEditorEmpty(values.changeControlManagement) && ( errors.changeControlManagement = 'Change Control Management is required' ); 
    isTextEditorEmpty(values.scheduleAndTimeDescription) && ( errors.scheduleAndTimeDescription = 'Schedule and Time Management is required' ); 
    Object.keys(files).includes('scopeManagementPlan') && files.scopeManagementPlan.length < 1 && ( errors.scopeManagementPlan = 'Scope Management Plan is required' );
    Object.keys(files).includes('workBreakdownStructure') && files.workBreakdownStructure.length < 1 && ( errors.workBreakdownStructure = 'Work Breakdown Structure is required' );
    Object.keys(files).includes('projectSchedule') && files.projectSchedule.length < 1 && ( errors.projectSchedule = 'Project Schedule is required' );
    Object.keys(files).includes('projectDependencies') && files.projectDependencies.length < 1 && ( errors.projectDependencies = 'Project Dependencies is required' );
    Object.keys(files).includes('projectCost') && files.projectCost.length < 1 && ( errors.projectCost = 'Project Cost is required' );
    milestone.length < 1 && ( errors.milestone = 'Milestone is required' );
    return errors;
  }

  export const validateRole = (values) => {
    let errors = {};
    values.project_manager || values.project_team.length > 0  || ( errors.project_manager = errors.project_team = 'Assign atleast 1 user to Project Manager or Project Team' );
    !values.initiativeTitle && values.initiativeTitle === '' && ( errors.initiativeTitle = 'Title is required' );
    values.initiativeTitle && values.initiativeTitle.length > 50 && ( errors.initiativeTitle = 'Maximum title 50 character' );
    // isTextEditorEmpty(values.projectManagementPlan) && ( errors.projectManagementPlan = 'Project Management Plan is required' ); 
    // isTextEditorEmpty(values.executiveSummaryOfProjectInitiative) && ( errors.executiveSummaryOfProjectInitiative = 'Executive Summary is required' ); 
    // isTextEditorEmpty(values.assumption) && ( errors.assumption = 'Assumption is required' ); 
    // isTextEditorEmpty(values.changeControlManagement) && ( errors.changeControlManagement = 'Change Control Management is required' ); 
    // isTextEditorEmpty(values.scheduleAndTimeDescription) && ( errors.scheduleAndTimeDescription = 'Schedule and Time Management is required' ); 
    return errors
  }

  export const validateExecuting = (data,categories) => {
    let errors = {};
    (!data.changeRequestName || data.changeRequestName === '') && (errors.changeRequestName = 'Change Request Title is Required');
    (!data.requester || data.requester === '') && (errors.requester = 'Requester is Required');
    !categories.find(e => e.isChecked === true) && (errors.checkbox = 'Atleast 1 category is checked');
    const form = isFieldCheckBoxEmpty(categories)
    form.filter(item => Object.keys(item).length > 0).length > 0  && (errors.changeRequestData = form) 
    return errors 
  }

  export const validateLessonLearned = (data) => {
    let errors = {};
    (!data.title || data.title === '') && (errors.title = 'Title is Required');
    (!data.projectCategoryId || data.projectCategoryId === '') && (errors.projectCategoryId = 'Step  is Required');
    (!data.LLCategoryId || data.LLCategoryId === '') && (errors.LLCategoryId = 'Category is Required');
    isTextEditorEmpty(data.Impact) && (errors.Impact = 'Impact is Required');
    isTextEditorEmpty(data.LessonLearnedText) && (errors.LessonLearnedText = 'Lesson Learned is Required');
    isTextEditorEmpty(data.Recommendation) && (errors.Recommendation = 'Recomendation is Required');

    return errors 
  }

  export const validateClosing = (data,milestone,lessonLearned) => {
    let errors = {};
    isTextEditorEmpty(data.projectDescription) && (errors.projectDescription = 'Project Description is Required');
    isTextEditorEmpty(data.scopeStatement) && (errors.scopeStatement = 'Scope Statement is Required');
    !data.preparedDate && ( errors.preparedDate = 'Date Prepared is required' );
    milestone.length === 0 && ( errors.milestone = 'Milestone is required' );
    lessonLearned.length === 0 && ( errors.lessonLearned = 'Lesson Learned is required' );
    
    return errors
  }

  const isTextEditorEmpty = (content) => {
    const blocksFromHTML = convertFromHTML(content);
    if(blocksFromHTML.contentBlocks !== null){
      return false
    }else{
      return true
    }
  }

  export const isFieldCheckBoxEmpty = (content) => {
    let errors = new Array(7)
    content.map((item,index) => {
      let error = {}
      item.isChecked && (!item.title || item.title === '') && (error.title = 'Title is Required')
      item.isChecked && isTextEditorEmpty(item.description)  && (error.description = 'Description is Required')  
      errors[index] = error;
      return item
    })
    return errors
  }
  