import { useState } from 'react';
import clsx from 'clsx';

const hiragana = [
  {
    a: ['あ', 'a'],
    i: ['い', 'i'],
    u: ['う', 'u'],
    e: ['え', 'e'],
    o: ['お', 'o'],
  },
  {
    a: ['か', 'ka'],
    i: ['き', 'ki'],
    u: ['く', 'ku'],
    e: ['け', 'ke'],
    o: ['こ', 'ko'],
  },
  {
    a: ['さ', 'sa'],
    i: ['し', 'shi'],
    u: ['す', 'su'],
    e: ['せ', 'se'],
    o: ['そ', 'so'],
  },
  {
    a: ['た', 'ta'],
    i: ['ち', 'chi'],
    u: ['っ', 'tsu'],
    e: ['て', 'te'],
    o: ['と', 'to'],
  },
  {
    a: ['な', 'na'],
    i: ['に', 'ni'],
    u: ['ぬ', 'nu'],
    e: ['ね', 'ne'],
    o: ['の', 'no'],
  },
  {
    a: ['は', 'ha'],
    i: ['ひ', 'hi'],
    u: ['ふ', 'fu'],
    e: ['へ', 'he'],
    o: ['ほ', 'ho'],
  },
  {
    a: ['ま', 'ma'],
    i: ['み', 'mi'],
    u: ['む', 'mu'],
    e: ['め', 'me'],
    o: ['も', 'mo'],
  },
  { a: ['や', 'ya'], u: ['ゆ', 'yu'], o: ['よ', 'yo'] },
  {
    a: ['ら', 'ra'],
    i: ['り', 'ri'],
    u: ['る', 'ru'],
    e: ['れ', 're'],
    o: ['ろ', 'ro'],
  },
  { a: ['わ', 'wa'], o: ['を', 'wo'] },
  { n: ['ん', 'n'] },
];

const Flashcard = ({ front, back }) => (
  <div className="flash-card">
    <div className="flash-card-inner">
      <div className="flash-card-front">{front}</div>
      <div className="flash-card-back">{back}</div>
    </div>
  </div>
);

const TableCol = ({ col }) => {
  if (!col) {
    return <td className="w-24 h-16"></td>;
  }

  return (
    <td className="w-24 h-16">
      <div className="flex gap-2 items-end">
        <span className="text-4xl">{col[0]}</span>
        <span className="text-zinc-400">{col[1]}</span>
      </div>
    </td>
  );
};

export const App = () => {
  const [showTable, setShowTable] = useState(true);
  const [selectedSymbol, setSelectedSymbol] = useState(hiragana[0].a);

  const handleShowTableClick = () => {
    setShowTable(!showTable);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    let targetRow = Number(event.target[1].value);
    if (isNaN(targetRow) || targetRow < 1 || targetRow > hiragana.length) {
      targetRow = 1;
      event.target[1].value = '1';
    } else {
      targetRow = targetRow;
    }

    const selectedRow = Object.values(hiragana[targetRow - 1]);
    const filteredRow = selectedRow.filter(
      (col) => col[0] !== selectedSymbol[0]
    );

    if (filteredRow.length > 0) {
      const symbolIndex = Math.floor(Math.random() * filteredRow.length);
      const randomSymbol = filteredRow[symbolIndex];
      setSelectedSymbol(randomSymbol);
    }
  };

  return (
    <div className="p-32">
      <div className="flex flex-col items-center justify-center md:flex-row md:gap-8 flex-wrap">
        <div className="flex flex-col gap-8">
          {showTable ? (
            <table className="table-fixed">
              <tbody>
                {hiragana.map((row, index) => (
                  <tr key={index}>
                    {row.n ? (
                      <TableCol col={row.n} />
                    ) : (
                      <TableCol col={row.a} />
                    )}
                    <TableCol col={row.i} />
                    <TableCol col={row.u} />
                    <TableCol col={row.e} />
                    <TableCol col={row.o} />
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table>
              <tbody>
                {hiragana.map((_, index) => (
                  <tr key={index}>
                    <TableCol />
                    <TableCol />
                    <TableCol />
                    <TableCol />
                    <TableCol />
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="flex justify-center">
            <button
              className="border border-zinc-600 rounded px-2 py-1"
              onClick={handleShowTableClick}
            >
              {showTable ? 'Hide' : 'Show'} Table
            </button>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center gap-8">
          <Flashcard front={selectedSymbol[0]} back={selectedSymbol[1]} />
          <form onSubmit={handleFormSubmit}>
            <div className="flex items-center gap-2">
              <button
                className="border border-zinc-600 rounded px-2 py-1"
                type="submit"
              >
                Select Random Symbol
              </button>
              <div>from row:</div>
              <input
                type="number"
                defaultValue="1"
                className="border border-zinc-600 rounded px-2 py-1 bg-none w-16 bg-transparent"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
