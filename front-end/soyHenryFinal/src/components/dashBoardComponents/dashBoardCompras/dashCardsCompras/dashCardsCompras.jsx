import style from "./dashCardsCompras.module.css";

function DashCardsCompras() {
  return (
    <div className={style.container}>
      <div className={style.info}>
        <h4 className={style.title}>{user.user_name} </h4>
        <h4 className={style.title}>{user.user_email} </h4>
        <h4 className={style.title}>{user.user_adress} </h4>
        <h4 className={style.title}>{user.user_phone} </h4>
      </div>
    </div>
  );
}

export default DashCardsCompras;
