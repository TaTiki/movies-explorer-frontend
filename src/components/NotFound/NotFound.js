import { useHistory } from "react-router-dom";
import './NotFound.css';

export default function NotFound() {
  const history =  useHistory();
  return (
    <div className = "notfound">
      <h2 className = "notfound__code">404</h2>
      <h3 className = "notfound__message">Страница не найдена</h3>
      <button className = "notfound__back" onClick={() => history.goBack()}>Назад</button>
    </div>
  );
}