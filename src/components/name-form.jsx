import { useState } from "react";
import clsx from "clsx";
import styled from "styled-components";
import { getStore } from "../hooks/store.js";
import { auth } from "../utils/firebase.js";
import { setName } from "../utils/rtdb.js";

const StyledInput = styled.input`
  width: 100%;
  max-width: 180px;
  padding: 0;
`;

function validateName(name) {
  if (!name) return false;

  if (name === auth.currentUser.displayName) return true;

  const { users } = getStore();
  const allNames = Object.values(users).map(({ name }) => name);
  if (allNames.includes(name)) return false;

  return true;
}

export function NameForm({ initialValue, toggleInput, isNewPlayer }) {
  const [input, setInput] = useState(isNewPlayer ? "" : initialValue);
  const [formError, setFormError] = useState(false);

  const handleChange = async (event) => {
    event.preventDefault();
    if (formError) return;

    toggleInput();
    setInput(input.trim());
    await setName(input.trim());
  };

  return (
    <form onSubmit={handleChange} onBlur={handleChange}>
      <StyledInput
        autoFocus
        placeholder={isNewPlayer ? "Enter name" : ""}
        className={clsx("nes-input", {
          "is-error": formError,
        })}
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
          setFormError(!validateName(event.target.value.trim()));
        }}
      />
    </form>
  );
}
