import React from 'react';

import wppicon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

const TeacherItem = () => {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars0.githubusercontent.com/u/23262436?s=460&u=437262bd3a96ef210d327590428c902701bc2585&v=4" alt="Rui Fernandes"/>
        <div>
          <strong>Rui Fernandes</strong>
          <span>Programação</span>
        </div>
      </header>

      <p>
        Apaixonado pela área de desenvolvimento de softwares. 
        <br/> <br/>
        Comecei aos 13 anos, em 2016, com meus estudos de Algoritmos e, em seguida, Java, HTML, CSS, JS, PHP e entre outras tecnologias, por conta própria, conciliando com o Ensino Médio. 
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 80,00</strong>
        </p>
        <button type="button">
          <img src={wppicon} alt="Whatsapp"/>
          Entrar em contato
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;