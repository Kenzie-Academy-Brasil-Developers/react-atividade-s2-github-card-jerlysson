import "./style.css";
import Card from "../Card";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { FormGroup, Input } from "@material-ui/core";

function Form() {
  const [text, setText] = useState("");
  const [repo, setRepo] = useState("");
  const [erro, setErro] = useState(false);
  const [typeErro, setTypeErro] = useState("");

  const schema = yup.object().shape({
    text: yup.string().required("Digite Algum diretorio primeiro"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSeach = (data) => {
    if (data.text.includes("/")) {
      setText(`https://api.github.com/repos/${data.text}`);
    } else {
      setTypeErro("invalido");
      setErro(true);
    }
  };

  useEffect(() => {
    if (text !== "") {
      fetch(text)
        .then((response) => response.json())
        .then((response) => {
          if (response.message === undefined) {
            setRepo([...repo, response]);
            // console.log(response);
          } else {
            setTypeErro("nao existe");
            setErro(true);
          }
        })
        .catch((e) => console.log(e));
    }
  }, [text]);

  return (
    <form className="form" onSubmit={handleSubmit(handleSeach)}>
      <div className="search">
        <input
          className="inputBox"
          placeholder="Procure seu repositorio"
          {...register("text")}
        />
        <button className="btn" type="submit">
          Pesquisar
        </button>
      </div>
      {erro && typeErro === "nao existe" && <p>Nada encontrado</p>}
      {erro && typeErro === "invalido" && <p>Descrição incompleta</p>}
      {errors.text?.message}
      {repo && <Card repo={repo} />}
    </form>
  );
}
export default Form;
