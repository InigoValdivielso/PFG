import logoDeusto from "../assets/images/LogoDeusto.png";
import { Link } from "react-router-dom";

const StudentLoginPage = () => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <div
        className="main"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "6%",
        }}
      >
        <img src={logoDeusto} alt="Deusto Logo" style={{ width: "15%" }} />
        <div
          className="firstBox"
          style={{
            marginTop: "2%",
            backgroundColor: "#E6E7E8",
            width: "30%",
            borderTopStyle: "solid",
            borderWidth: "2px",
            borderTopColor: "#1B459A",
            boxShadow: "0px 0px 10px 0px #000000",
          }}
        >
          <h5 style={{ paddingTop: "8%", textAlign: "center", fontSize: "100%" }}>
            Access with @opendeusto account
          </h5>

          <Link to="/studentPortal">
            <button className="btn btn-primary" id="loginButton" style={{ marginLeft: "45%", marginTop: "5%", marginBottom: "5%", fontSize: "90%" }}>
              Login
            </button>
          </Link>
        </div>
        <div style={{
          marginTop: "2%", backgroundColor: "#E6E7E8", width: "30%",
          borderTopStyle: "solid", borderWidth: "2px", borderTopColor: "#1B459A", boxShadow: "0px 0px 10px 0px #000000"
        }}>
          <h6 style={{ paddingTop: "8%", textAlign: "center", fontSize: "100%" }}>Access with NIU</h6>
          <div className="input-group" style={{ display: "flex", flexDirection: "column", padding: "5%" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <span className="input-group-text" id="basic-addon1">
                @
              </span>
              <input
                type="text"
                className="form-control"
                id="userId"
                maxLength={50}
                name="userId"
                defaultValue=""
                placeholder="User"
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "8%" }}>
              <span className="input-group-text" id="basic-addon1">
                <span className="material-symbols-outlined">lock</span>
              </span>

              <input
                type="password"
                className="form-control"
                id="password"
                maxLength={50}
                name="password"
                defaultValue=""
                placeholder="Password"
              />
            </div>
          </div>
          <a href="" style={{ marginLeft: "5%", fontSize: "80%", color: "#6c94e3" }}>I don't have a user account; request registration</a>
          <br />
          <a href="" style={{ marginLeft: "5%", fontSize: "80%", color: "#6c94e3" }}>I don't know or have forgotten my password</a>
          <br />
          <button className="btn btn-primary" id="enterButton" style={{ marginLeft: "75%", marginBottom: "5%", marginTop: "3%" }}>
            Enter
          </button>
        </div>
      </div>
      <br />
    </>
  );
};

export default StudentLoginPage;
