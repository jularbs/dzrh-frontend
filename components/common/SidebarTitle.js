const SidebarTitle = ({title}) => {
  return (
    <h6
      style={{
        textTransform: "uppercase",
        margin: "0",
        fontSize: ".625rem",
        letterSpacing: ".125rem",
        padding: "1px 1.5625rem",
        fontWeight: "500",
        color: "#9ea8b9",
        borderBottom: "1px solid #e1e5eb",
        borderTop: "1px solid #e1e5eb",
      }}
    >
      {title}
    </h6>
  );
};

export default SidebarTitle;
