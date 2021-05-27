import { Button } from "antd";
import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import { app } from "../base";
import NewPaymentComps from "./NewPaymentComps";
import { AuthContext } from "./AuthRoute";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  const { currentUser } = useContext(AuthContext);

  const [viewBook, setViewBook] = useState([]);
  const [toggle, setToggle] = useState(false);

  const handleToggle = (id) => {
    setToggle(!toggle);
  };

  const viewAllBook = async () => {
    await app
      .firestore()
      .collection("books")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapShot) => {
        const r = [];
        snapShot.forEach((doc) => {
          r.push({ ...doc.data(), id: doc.id });
        });
        setViewBook(r);
      });
  };

  useEffect(() => {
    viewAllBook();
  }, []);

  return (
    <div>
      <div
        style={{
          marginTop: "40px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {viewBook.map(({ bookCover, book, id, name, createdAt }) => (
          <div
            key={id}
            style={{
              width: "300px",
              height: "400px",
              borderRadius: "10px 10px 0 0",
              backgroundColor: "lightgray",
              margin: "10px",
              marginBottom: "80px",
            }}
          >
            <div>
              <img
                src={bookCover}
                style={{
                  width: "100%",
                  height: "350px",
                  objectFit: "cover",
                  borderRadius: "10px 10px 0 0",
                }}
              />
            </div>

            <div
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                justifyContent: "center",
                display: "flex",
              }}
            >
              {" "}
              {name}{" "}
            </div>

            <div
              style={{
                fontWeight: "bold",
                fontSize: "10px",
                justifyContent: "center",
                display: "flex",
              }}
            >
              Uploaded{" "}
              {createdAt === null
                ? createdAt
                : moment(createdAt.toDate()).fromNow()}{" "}
            </div>

            <div>
              {currentUser ? (
                <Button
                  type="primary"
                  danger
                  style={{
                    width: "100%",
                  }}
                  onClick={() => {
                    console.log("download");
                  }}
                >
                  <a
                    href={book}
                    download="My_File.pdf"
                    target={"_blank"}
                    rel="noopener noreferrer"
                  >
                    {" "}
                    Download Here Now{" "}
                  </a>
                </Button>
              ) : (
                <Link to="/register">
                  <Button
                    type="primary"
                    danger
                    style={{
                      width: "100%",
                    }}
                    onClick={() => {
                      console.log("download");
                    }}
                  >
                    <a> Register now to Download Here </a>
                  </Button>
                </Link>
              )}
            </div>

            <div>
              <Button
                style={{
                  width: "100%",
                }}
                onClick={() => {
                  handleToggle(id);
                }}
              >
                {toggle ? "I have change my mind" : "Click to Suppot us"}
              </Button>

              {toggle ? <NewPaymentComps /> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
