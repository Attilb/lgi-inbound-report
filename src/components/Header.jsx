import React from "react";

export default function Header({ title }) {
  return (
    <header className="lgi-header">
      <h1 className="lgi-title">{title}</h1>
      <img
        src="https://lgigroup.com/wp-content/themes/lgi/img/lgi-logo-transparent.png"
        alt="LGI Group"
        className="lgi-logo"
      />
    </header>
  );
}
