import { useCallback, useEffect, useState } from "react";
import BookHeader from "./assets/book-header.png";
import { books } from "./list";
import Slider from "react-slick";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function App() {
  const [search, setSearch] = useState("");
  const [filteredBook, setFilteredBook] = useState();
  const [open, setOpen] = useState(false);

  const getBook = useCallback(() => {
    const lowerCaseSearch = search.toLowerCase();
    const filtered = books.filter((book) => {
      return (
        book.nome.toLowerCase().includes(lowerCaseSearch) ||
        book.autor.toLowerCase().includes(lowerCaseSearch) ||
        book.categoria.toLowerCase().includes(lowerCaseSearch)
      );
    });

    setFilteredBook(filtered);
  }, [search, books]);

  useEffect(() => {
    setFilteredBook([]);
  }, [search]);

  useEffect(() => {
    setOpen(false);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 50,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <main>
      <header>
        <img src={BookHeader} alt="Book Header" />
      </header>

      <section>
        <div className="search">
          <h1>Qual livro você quer conhecer hoje?</h1>
          <input
            type="text"
            placeholder="Buscar o livro por Título, autor e gênero..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" onClick={getBook} disabled={!search}>
            BUSCAR
          </button>
        </div>

        <div className="container">
          <Popup modal onOpen={open} open={open}>
            <div className="modal">
              <div className="header"> </div>
              <div className="content">Livro adicionado com sucesso!</div>
              <div className="actions">
                <button className="button" onClick={() => setOpen(false)}>
                  Fechar
                </button>
              </div>
            </div>
          </Popup>

          {filteredBook?.length <= 1 ? (
            filteredBook?.map((book, index) => (
              <div className="book" key={index + 1}>
                <div className="book-img">
                  <img src={book.imagem} alt={book.nome} />

                  <div>
                    <button onClick={() => setOpen(true)}>Já li!</button>
                    <button onClick={() => setOpen(true)}>Quero ler!</button>
                  </div>
                </div>

                <div className="book-about">
                  <h2>{book.nome}</h2>
                  <span>{book.autor}</span>
                  <span>
                    <b>Gênero:</b> {book.categoria}
                  </span>
                </div>
                <p>{book.descrição}</p>
              </div>
            ))
          ) : (
            <Slider {...settings}>
              {filteredBook?.map((book, index) => (
                <div className="book" key={index + 1}>
                  <div className="book-img">
                    <img src={book.imagem} alt={book.nome} />

                    <div>
                      <button onClick={() => setOpen(true)}>Já li!</button>
                      <button onClick={() => setOpen(true)}>Quero ler!</button>
                    </div>
                  </div>

                  <div className="book-about">
                    <h2>{book.nome}</h2>
                    <span>{book.autor}</span>
                    <span>
                      <b>Gênero:</b> {book.categoria}
                    </span>
                  </div>
                  <p>{book.descrição}</p>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </section>
      <footer></footer>
    </main>
  );
}

export default App;
