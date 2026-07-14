import { Link } from "react-router-dom";

function NotFound() {

  return (

      <div
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            background: "#0f172a",
            color: "white"
          }}
      >

        <h1
            style={{
              fontSize: "90px"
            }}
        >
          404
        </h1>

        <p
            style={{
              marginBottom: "30px"
            }}
        >
          Page Not Found
        </p>

        <Link
            to="/"
            style={{
              background: "#2563eb",
              color: "white",
              padding: "14px 30px",
              borderRadius: "12px",
              textDecoration: "none"
            }}
        >
          Go To Dashboard
        </Link>

      </div>

  );

}

export default NotFound;