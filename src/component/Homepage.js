import styles from "../css/Home.module.css";
import feature from '../image/women accessories.jpg'
import  {React, useState } from 'react';
import TokenManager from '../apis/TokenManager';
import LoginAPI from "../apis/LoginAPI";


function Home (){
    
    return (
     
        <div className={styles.content}>
          <h1>You should always <br></br> feel pretty</h1>
          <img src={feature} className={styles.featureimg} alt="Logo" />
          <p className={styles.text}>Accessories that sure to shine you up </p>
          <br></br>
          <a href="/products" className={styles.buttonHome}>Click Here</a>

      </div>
    
        
   
    
   
            
           
           
       
    
    
            
            


    )
}
export default Home;