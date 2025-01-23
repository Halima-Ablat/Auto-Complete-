import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";

function UserSearch() {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  async function fetchUserData() {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();

      console.log(data);

      if (data && data.users && data.users.length) {
        setUsers(data.users.map((userItem) => userItem.firstName));
        setErrorMessage(null);
      }

      // console.log(data);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  function handleInputChange(event) {
    const query = event.target.value.toLowerCase();
    setSearchParam(query);
    if (query.length > 1) {
      const filteredData = users.filter(
        (item) => item.toLowerCase().indexOf(query) > -1
      );
      setFilteredUsers(filteredData);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }
  
  console.log(users, filteredUsers);

  function handleClick(event) {
    setShowDropdown(false);
    setSearchParam(event.target.innerText);
    setFilteredUsers([]);
  }

  return (
    <div className="input">
      {loading ? (
        <h1>Loading Data... Please wait !</h1>
      ) : (
        <input
          type="text"
          value={searchParam}
          onChange={handleInputChange}
          placeholder="Search Users here..."
        />
      )}

      {showDropdown && (
        <Dropdown handleClick={handleClick} data={filteredUsers} />
      )}
    </div>
  );
}

export default UserSearch;
