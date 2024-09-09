import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-color: #f9f9f9;
  text-align: center;
`;

export const NotFoundTitle = styled.h1`
  font-size: 3rem;
  color: #3D3D3D;
  margin-bottom: 40px;
`;

export const NotFoundLink = styled(Link)`
  padding: 13px 18px;
  background-color: #69C8F2;
  color: #fff;
  text-decoration: none;
  border-radius: 10px;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  font-weight: bold;

  &:hover {
    background-color: #5AB0D9;
  }
`;