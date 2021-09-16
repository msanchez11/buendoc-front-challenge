import '../styles/Content.css';
import { useState } from 'react';
import Controls from './table/Controls';
import TableData from './table/Table';

function Content() {

  const [searchFilter, setSearchFilter] = useState(null);

  return (
    <main>
      <Controls searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
      <TableData searchFilter={searchFilter} />
    </main>
  )
}

export default Content;