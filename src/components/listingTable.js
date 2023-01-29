import axios from 'axios';
import React, {useEffect,useState} from 'react';
import DataTable from 'react-data-table-component'

const ListingTable = () => {
  const [search, setSearch]=useState("");
  const [data, setData]= useState([]);
  const [filtter, setFiltter]=useState([]);
  const listData = async () =>{
    try{
      const response= await axios.get("https://restcountries.com/v2/all");
      setData(response.data);
      setFiltter(response.data);

    }catch(error){
      console.log(error);
    }
  };
  const columns =[
    {
      name:"name",
      selector:(row)=>row.name,
      sortable:true
    },
    {
      name:"nativeName",
      selector:(row)=>row.nativeName,
      sortable:true
    },
    {
      name:"capital",
      selector:(row)=>row.capital,
      sortable:true
    },
    {
      name:"Flag",
      selector:(row)=> <img width={50} height={50} src={row.flag} />,
      sortable:true
    },
  ]
  useEffect(() => {
    listData();
  }, [])
  useEffect(() => {
    const result=data.filter((country)=>{
      country.name.toLowerCase().match(search.toLowerCase());
setFiltter(result);
    });
  }, [search]);
  return (
    <DataTable columns={columns} data={filtter} pagination
    fixedHeader
    fixedHeaderScrollHeight='450px'
    selectableRows
    selectableRowsHighlight
    highlightOnHover
    subHeader
    subHeaderComponent={
      <input type='text' placeholder='Search Here' className='w-25 form-control' value={search} onChange={(e) => setSearch(e.target.value)}/>}
    />
    
  )
}

export default ListingTable