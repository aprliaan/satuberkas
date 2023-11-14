import React from "react";

const HeadCustom = ({ title }) => {
  return (
    <>
      <title>{title}</title>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdn-uicons.flaticon.com/uicons-solid-rounded/css/uicons-solid-rounded.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn-uicons.flaticon.com/uicons-bold-rounded/css/uicons-bold-rounded.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn-uicons.flaticon.com/uicons-regular-straight/css/uicons-regular-straight.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn-uicons.flaticon.com/uicons-solid-straight/css/uicons-solid-straight.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn-uicons.flaticon.com/uicons-bold-straight/css/uicons-bold-straight.css"
      />
    </>
  );
};

export default HeadCustom;
