export const getRole = (idUser,dataForm) => {
    
    const user = parseInt(idUser)
    const state = {
        isOwner : dataForm.project_owner === user,
        isManager : dataForm.project_manager === user,
        isOfficer : dataForm.project_officer.includes(user),
        isSponsor : dataForm.project_sponsor === user,
        isTeam : dataForm.project_team.includes(user),
    }

    return state
}