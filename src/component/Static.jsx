import React ,{useEffect,useState}from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';
import ProductAPI from '../apis/ProductAPI';
import '../css/Static.module.css'


const Static = () => {
  const [data, setData] = useState([]);

  const getQuantityProductByCategory = () => {
    ProductAPI.getQuantityProduct()
      .then(response => {
        console.log(response); // Logging the response separately
        const transformedData = response.map(item => ({
          category: item.category,
          quantity :item.quantity
        }));
        setData(transformedData);
      })
      .catch(error => console.log(error));
  };
  
  useEffect(() => {
    getQuantityProductByCategory();
  }, []);
  
  
  return (
    <>
       <><div style={{ textAlign:'center'}}>
        <h1 style={{ marginTop: '10px' }}>Inventory statistics</h1>
      </div><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <BarChart width={600} height={400} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category.name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="quantity" fill="#e9967a" />
                  <LabelList dataKey="quantity" position="top" />
              </BarChart>
          </div></>

    </>
  )
}

export default Static;