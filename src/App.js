import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
function App() {
  const [loading, setLoading] = useState(false);
  const [human, setHuman] = useState(null);
  const [title, setTitle] = useState("name");
  const [display, setDisplay] = useState("random person");

  const fetchHuman = async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      const human = data.results[0];
      const { phone, email } = human;
      const { large: image } = human.picture;
      const { password } = human.login;
      const { first, last } = human.name;
      const {
        dob: { age },
      } = human;
      const {
        street: { number, name },
      } = human.location;
      // cleaning the previous consts
      const person = {
        phone,
        email,
        image,
        password,
        age,
        name: `${first} ${last}`,
        street: `${number} ${name}`,
      };
      setHuman(person);
      setDisplay(person.name);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleClickInfo = (e) => {
    if (e.target.classList.contains("icon")) {
      const newValue = e.target.dataset.text;
      setTitle(newValue);
      setDisplay(human[newValue]);
    }
  };

  useEffect(() => {
    fetchHuman();
  }, []);

  return (
    <main>
      <div className="box bcg-black"></div>
      <div className="box br">
        <div className="container">
          <img
            className="user-img"
            src={(human && human.image) || defaultImage}
            alt="Random person"
          />
          <p className="user-title">My {title} is:</p>
          <p className="user-display">{display}</p>
          <div className="user-info">
            <button className="icon" data-text="name" onClick={handleClickInfo}>
              <FaUser />
            </button>
            <button
              className="icon"
              data-text="email"
              onClick={handleClickInfo}
            >
              <FaEnvelopeOpen />
            </button>
            <button className="icon" data-text="age" onClick={handleClickInfo}>
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-text="street"
              onClick={handleClickInfo}
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-text="phone"
              onClick={handleClickInfo}
            >
              <FaPhone />
            </button>
            <button
              className="icon"
              data-text="password"
              onClick={handleClickInfo}
            >
              <FaLock />
            </button>
          </div>

          <button className="btn" type="button" onClick={() => fetchHuman()}>
            {loading ? "loading ..." : "random user"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
