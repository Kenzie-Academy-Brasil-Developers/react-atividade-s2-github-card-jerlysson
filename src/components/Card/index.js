import { BiSend } from "react-icons/all";
import "./style.css";
const Card = ({ repo }) => {
  return (
    <>
      {repo.map((item, index) => (
        <div key={index} className="container">
          <img
            className="avatar"
            src={item.owner.avatar_url}
            alt={item.full_name}
          />

          <div className="box">
            <h2 className="name">{item.full_name}</h2>
            <p className="desc">{item.description}</p>
          </div>
          <a className="link" href={item.html_url}>
            <BiSend />
          </a>
        </div>
      ))}
    </>
  );
};
export default Card;
