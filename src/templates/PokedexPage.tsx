async function getData() {
  const data = {
    htmlTitle: 'Pokedex | Wakurtual',
    pageTitle: 'Pokedex page',
  };

  return data;
}

export async function PokedexPage() {
  const data = await getData();

  return (
    <div className="main-pokedex typography">
      <title>{data.htmlTitle}</title>
      <h2 className="main-heading">{data.pageTitle}</h2>

      <p>Pokedex...</p>
    </div>
  );
}
