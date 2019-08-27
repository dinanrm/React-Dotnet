import React, {useState,useEffect} from 'react'
import styled from 'styled-components'
import {CustomDropdown} from '../Dropdown'

const Label = styled.label`
  color : ${props => props.theme.color.dark_purple};
  font-size: 1.2rem;
  font-weight: 600;
  width: 20vw;
  align-self: center;
`
const LabelFilter = styled.span`
  width: 15vw;
  display: flex;
  justify-content: flex-end;
  align-items: center; 
  padding-right: 0.5vw;
`
const FilterLayout = styled.div`
  display: flex;
  justify-content: flex-end;
`
const ContentLayout = styled.div`
  display: flex;
  justify-content: space-between;
`

const Header = (props) => {
  const steps = [
    {value : 0 , text : 'ALL'}, 
    {value : 1 , text : 'Initiating'}, 
    {value : 2 , text : 'Planning'}, 
    {value : 3 , text : 'Executing'}, 
    {value : 4 , text : 'Closing'},
  ]
  const categories = [
    {value : 0 , text : 'ALL'}, 
    {value : 1 , text : 'Risk'}, 
    {value : 2 , text : 'Scope'}, 
    {value : 3 , text : 'Cost'}, 
    {value : 4 , text : 'Schedule'},
    {value : 5 , text : 'Other'},
  ]
  const sorts = [
    {value : 0, text : 'Newest - oldest'},
    {value : 1, text : 'Oldest - newest'}
  ]
  const [filter,setFilter] = useState({
    step : 0,
    category : 0,
    sort : 0,
  })
  const handleFilterChange = (key,value) => {
    setFilter({
      ...filter,
      [key]:value,
    })
  }

  const filteredStepsData = filter.step !== 0 ? props.data.filter(e => filter.step === e.projectCategory.projectCategoryId) : props.data
  const filteredCategoriesData = filter.category !== 0 ? filteredStepsData.filter(e => filter.category === e.lessonLearnedCategory.llCategoryId) : filteredStepsData
  useEffect(() => {
    props.setSort(filter.sort)
    props.set(filteredCategoriesData)
  }, [filter])

    return (
        <ContentLayout>
          <Label>{props.label}</Label>
          <FilterLayout>
              <LabelFilter>Phase :</LabelFilter>
              <CustomDropdown
              data={steps}
              value={filter.step} 
              onChange={e => handleFilterChange("step",e)}
              />
              <LabelFilter>Category :</LabelFilter>
              <CustomDropdown
              data={categories}
              value={filter.category} 
              onChange={e => handleFilterChange("category",e)}
              />
          </FilterLayout>
          <FilterLayout>
              <LabelFilter>Sort By:</LabelFilter>
              <CustomDropdown
              data={sorts}
              value={filter.sort} 
              onChange={e => handleFilterChange("sort",e)}
              />
          </FilterLayout>
        </ContentLayout>
    )
}

export default Header
