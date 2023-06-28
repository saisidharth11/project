import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';

const Navbar = styled.nav`
  background-color: #f2f2f2;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BrandName = styled.h1`
  margin: 0;
  font-size: 24px;
  color: #333;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }
`;

const UserCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const UserCard = styled.div`
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const UserName = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
`;

const UserEmail = styled.p`
  font-size: 14px;
  color: #666;
`;

const LoaderAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #333;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${LoaderAnimation} 1s linear infinite;
  margin: 20px auto;
`;

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showUsers, setShowUsers] = useState(true);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://reqres.in/api/users?page=1');
      setUsers(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const toggleUsers = () => {
    setShowUsers(!showUsers);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Navbar>
        <BrandName>Brand Name</BrandName>
        <Button onClick={toggleUsers}>{showUsers ? 'Hide Users' : 'Get Users'}</Button>
      </Navbar>

      {loading ? (
        <Loader />
      ) : showUsers ? (
        <UserCardGrid>
          {users.map((user) => (
            <UserCard key={user.id}>
              <UserName>{`${user.first_name} ${user.last_name}`}</UserName>
              <UserEmail>{user.email}</UserEmail>
            </UserCard>
          ))}
        </UserCardGrid>
      ) : null}
    </>
  );
};

export default App;