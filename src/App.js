import './index.css';
import React, { useState, useEffect } from 'react'
import Table, { SelectColumnFilter } from './Table';

const url = 'https://leoapi-1-h8605638.deta.app/documents'
const url_argupAno = 'https://leoapi-1-h8605638.deta.app/documents/agrupar/ano'
const url_argupTipo = 'https://leoapi-1-h8605638.deta.app/documents/agrupar/tipo'

function App() {
  const [data, setData] = useState([]);
  const [dataAnos, setDataAnos] = useState([])
  const [dataTipos, setDataTipos] = useState([])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    };
    return date.toLocaleDateString('en-GB', options);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const jsonData = await response.json();

      const modifiedData = jsonData.map((item) => {
        return {
          ...item,
          FechaPublicacion: formatDate(item.FechaPublicacion),
        };
      });

      setData(modifiedData);

      //setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchData_Anos = async () => {
    try {
      const response = await fetch(url_argupAno);
      const jsonData = await response.json();
      //console.log(jsonData)
      setDataAnos(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchData_Tipos = async () => {
    try {
      const response = await fetch(url_argupTipo);
      const jsonData = await response.json();
      console.log(jsonData)
      setDataTipos(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData()
  }, []);

  useEffect(() => {
    fetchData_Anos()
  }, []);

  useEffect(() => {
    fetchData_Tipos()
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Providencia",
        accessor: "Providencia",
      },
      {
        Header: "Tipo",
        accessor: 'Tipo',
        Filter: SelectColumnFilter,  // new
        filter: 'includes',  // new
      },
      {
        Header: "Cantidad Paginas",
        accessor: "CantPags",
      },
      {
        Header: "Año de Publicación",
        accessor: "AnoPublicacion",
      },
      {
        Header: "Fecha de Publicación (Dia/Mes/Año)",
        accessor: "FechaPublicacion",
      },
    ],
    []
  ); 
  
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="">
          <h1 className="text-2xl font-bold">LEO-APP: BigData Universidad Central 2023</h1>
          <div className="mt-4">
            <h8 className="text-xl font-semibold">Actualmente la distribucion de sentencias por año de publicación es: </h8>
            <ul class="list-inside list-disc">
              {dataAnos.map((item) => (
                <li key={item._id} className='text-base font-semibold'>
                  La cantidad de sentencias publicadas en {item._id}, es de {item.count}.
                </li>
              ))}
            </ul>
            <p className='italic'>Segun el año de públicación registrado.</p>
          </div>
        </div>
        <div className="mt-4">
          <Table columns={columns} data={data} />
        </div>
        <div className="mt-4">
            <h8 className="text-xl font-semibold">Actualmente la distribucion de sentencias por tipo de sentencia y año de publicación es: </h8>
            <ul class="list-inside list-disc">
              {dataTipos.map((item) => (
                <li key={item._id} className='text-base font-semibold'>
                  La cantidad de sentencias publicadas en {item._id.param1} de tipo {item._id.param2} es de {item.count}.
                </li>
              ))}
            </ul>
            <p className='italic'>Segun el año de públicación registrado.</p>
          </div>
      </main>
    </div>
  );

}

export default App;
