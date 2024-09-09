import React, { useMemo, useEffect, useState } from 'react';
import { useTable, useSortBy, useResizeColumns } from 'react-table';
import './DataTable.css';

const DataTable = () => {
  const [data, setData] = useState([]);  // État pour stocker les données récupérées
  const [loading, setLoading] = useState(true);  // État pour gérer le chargement

  // Fonction pour récupérer les données de l'API
  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/bugs');  // Remplace par ton URL d'API
        const result = await response.json();  // Parse les données JSON
        console.log(result);
        setData(result);  // Mettre à jour les données
        setLoading(false);  // Arrêter le chargement
      } catch (error) {
        console.error('Erreur lors de la récupération des bugs:', error);
        setLoading(false);  // Arrêter le chargement en cas d'erreur
      }
    };

    fetchBugs();  // Appeler la fonction pour récupérer les données
  }, []);  // Le tableau vide [] signifie que cet effet ne se déclenche qu'au montage

  // Définir les colonnes avec useMemo pour optimiser les performances
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: '_id',
      },
      {
        Header: 'Domain',
        accessor: 'domainName',
      },
      {
        Header: 'URL du BUG',
        accessor: 'bugs[0].url',
        Cell: ({ value }) => (
          <a href={value} target="_blank" rel="noopener noreferrer">
            {value}
          </a>
        ),
      },
      {
        Header: 'Descriptif',
        accessor: 'bugs[0].description',
      },
      {
        Header: 'Impact',
        accessor: 'bugs[0].impact',
      },
      {
        Header: 'Date',
        accessor: 'bugs[0].date',
        Cell: ({ value }) => new Date(value).toLocaleDateString() + ' ' + new Date(value).toLocaleTimeString(),
      },
    ],
    []
  );

  // Utiliser les hooks de react-table pour définir le tableau avec les fonctionnalités de tri et de redimensionnement
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy,  // Permet de trier les colonnes
    useResizeColumns // Permet de redimensionner les colonnes
  );

  if (loading) {
    return <div>Chargement des données...</div>;  // Affiche un message de chargement
  }

  return (
    <div className="table-container">
      <table {...getTableProps()} className="data-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th key={column.id} {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                  <div {...column.getResizerProps()} className="resizer" />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr key={row.id} {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td key={cell.id} {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
