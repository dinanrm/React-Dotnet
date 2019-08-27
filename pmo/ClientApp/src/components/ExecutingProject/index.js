import React, {useState,useEffect} from 'react';
import { ContentLayout, TitleBar } from './style';
import { getRole } from '../../utils/role';
import api from '../../utils/api';
import ChangeRequest from '../ChangeRequest'
import UploadFilesEdit from '../UploadFilesEdit';

const ExecutingProject = (props) => {

  const titlePPR = 'Project Performance Report'
  const titleCR = 'Change Request'
  const [role,setRole] = useState({
    isOwner: false,
    isSponsor: false,
    isManager: false,
    isTeam: false,
    isOfficer: false
  })
  const [isFetched,setIsFetched] = useState(false)
  const [project] = useState({})
  const fetchProjects = async(id) => {
    setIsFetched(true)
      try {
        const { data } = await api.projects.executing(id)
        Object.keys(data).filter(field => [
          'projectCreatedDate','projectModifiedDate','assign','document','changeRequest'
        ].indexOf(field) < 0).map((field) =>
        project[field] = data[field]
        );
        const project_team = [];
        const project_officer = [];
        data.assign.map(el => {
          (el.roleId === 1 && Object.assign(project,{'project_owner':el.userId}));
          (el.roleId === 2 && Object.assign(project,{'project_manager':el.userId}));
          (el.roleId === 4 && Object.assign(project,{'project_sponsor':el.userId}));
          if (el.roleId === 3){
            project_officer.push(el.userId);
            Object.assign(project,{'project_officer':project_officer});
          }
          if (el.roleId === 5){
            project_team.push(el.userId);
            Object.assign(project,{'project_team':project_team});
          }
          return el;
        })
        setRole(getRole(props.user.id,project))
      } catch (error) {
        // (!('response' in error) && setDataForm(form))
        console.error(error);
      }
      setIsFetched(false)
  }

  useEffect(() => {
  }, [role,project])

  useEffect(() => { 
    fetchProjects(props.match.params.id);
  },[])

    return (
        <ContentLayout>
          <TitleBar>{titlePPR}</TitleBar>
          <UploadFilesEdit
          projId={props.match.params.id} 
          isOfficer={role.isOfficer} 
          categoryId={31} maxFiles={5} 
          isEditable={role.isManager || role.isTeam}
          />
          <TitleBar>{titleCR}</TitleBar>
          <ChangeRequest
            role={role}
            project={project}
            isFetched={isFetched}
            {...props}
          />
        </ContentLayout>
    )
}

export default ExecutingProject
