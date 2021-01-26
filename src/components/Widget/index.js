import styled from 'styled-components';

export const Widget = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: 4px;
  overflow: hidden;

  h1,
  h2,
  h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 1; 
    margin-bottom: 0;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
  }
`;

Widget.Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 18px 33px;
  background-color: ${({ theme }) => theme.colors.primary};

  * {
    margin: 0;
  }
`;

Widget.Content = styled.div`
  padding: 24px 32px 32px 32px;
  & > *::first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
`;

// Widget.Form = styled.a`
//   padding: 24px 32px 32px 32px;
//   display: inline-flex;
//   box-align: center;
//   margin-left: 24px;
//   background-color: ${({ theme }) => theme.colors.primary};
//   opacity: 1;
//   //&:hover : opacity:1;
// `;

Widget.Input = styled.input`
  font-family: 'Lato', sans-serif;
  display: flex;
  padding: 16px 16px 16px 16px;
  width: 100%;
  border-radius: 4px;
  border: 3px solid ${({ theme }) => theme.colors.primary};
  opacity: 0.8;
  background: ${({ theme }) => theme.colors.mainBg};
  color: ${({ theme }) => theme.colors.contrastText};
  margin: none;
  &::placeholder{
    color: ${({ theme }) => theme.colors.contrastText};
    opacity: 0.9;
  }
  &:focus{
    outline:none;
  }
`;

Widget.Button = styled.button`
  font-family: 'Lato', sans-serif;
  transition-duration: 0.3s;  
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  border: none;
  margin-top: 4px;
  padding: 16px 16px 16px 16px;
  text-align: center;
  display:flex;
  color: ${({ theme }) => theme.colors.contrastText};
  width:100%;
  cursor: pointer;
  &:disabled{
    background-color: ${({ theme }) => theme.colors.secondary};
    cursor: not-allowed;
  }
`;

export default Widget;
