import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchUsers, setFilter, setFilteredUsers } from "../redux/usersSlice";
import "./Table.css";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

const Table: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const filteredUsers = useSelector(
    (state: RootState) => state.users.filteredUsers
  );
  const filters = useSelector((state: RootState) => state.users.filters);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setFilteredUsers());
  }, [dispatch, filters, users]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setFilter({ [name]: value }));
  };

  return (
    <div className="table">
      <div className="row header-row">
        <div className="cell">Name</div>
        <div className="cell">Username</div>
        <div className="cell">Email</div>
        <div className="cell">Phone</div>
      </div>
      <div className="row filter-row">
        <div className="cell">
          <input
            type="text"
            placeholder="Enter name"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
          />
        </div>
        <div className="cell">
          <input
            type="text"
            placeholder="Enter username"
            name="username"
            value={filters.username}
            onChange={handleFilterChange}
          />
        </div>
        <div className="cell">
          <input
            type="text"
            placeholder="Enter email"
            name="email"
            value={filters.email}
            onChange={handleFilterChange}
          />
        </div>
        <div className="cell">
          <input
            type="text"
            placeholder="Enter phone number"
            name="phone"
            value={filters.phone}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      {filteredUsers.map((user: User) => (
        <div className="row data-row" key={user.id}>
          <div className="cell">{user.name}</div>
          <div className="cell">{user.username}</div>
          <div className="cell">{user.email}</div>
          <div className="cell">{user.phone}</div>
        </div>
      ))}
    </div>
  );
};
export default Table;
