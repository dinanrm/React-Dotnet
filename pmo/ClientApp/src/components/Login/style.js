import styled from 'styled-components';

export const FPContainer = styled.div`
    text-align : center;
`

export const Container = styled.form`
    background-color: ${props => props.theme.color.white};
    padding: 2em;
`

export const ButtonLogin = styled.button`
    background-color: ${props => props.theme.color.purple};
    height: 3rem;
`