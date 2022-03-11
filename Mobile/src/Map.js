import React from "react";
import { Text, View ,StyleSheet, Image } from "react-native";
import { useState, useEffect } from 'react';



   

const Localization =() =>{


    // let labelURL ='http://127.0.0.1:8000/localize';
    let labelURL ='http://192.168.188.174:8000/localize';
    let [label , setLabel] = useState(0);
    let coordinates = [
        [0 , 0] ,//intial position
        [130 , 520], //Electronics lab
        [190, 450], //1st labs corridor
        [190, 250], //lecture corridor
        [190, 650], //2st labs corridor
        [80, 360], //right corridor 
        [290,360],//left corridorr
        
        
        
        [250 , 325], //Embedded lab       
        [250, 200], //lecture
        [180, 150], //om ahmed
        
        
        [130 , 480], //Network lab   
      ];
    
     let [sec, setSec] = useState(0);
    
    setInterval(() =>{
        setSec(sec = sec+1)
      }, 5000)


    useEffect(() => {
        console.log("label", label);

        fetch(labelURL)
        .then((response) => response.json()) // get response, convert to json
        .then((json) => {
            // console.log(json)
            setLabel(json.value);
            // console.log("label", label);
        })
        .catch((error) => alert(error)) // display errors
    }, [sec]);
    
    
   

    console.log(label);
    //console.log(coordinates[label][1]);

    



    return(
        
        <View>
            <Text style = {styles.title}> SBME Department Floor </Text>

            <Image
             
            source={require('../assets/floor.jpg')}
            style = {{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                width:300,
                height:700,
                position: 'absolute',
                top: 80,
                left: 35,
                bottom: 0,
                right: 0,
            
            }}
            /> 
            <View style={{
                position: 'absolute',
                width: 10,
                height: 10,
                borderRadius: 10 / 2,
                backgroundColor: "blue",
                opacity:0.7,
                left: coordinates[label][0],
                top: coordinates[label][1],
                
            }} />
            

        </View>
    );
}


const styles = StyleSheet.create({
    title: {
      color: '#000',
      textAlign: 'center',
      fontWeight: "bold",
      marginTop:40,
      fontSize:25
    },

});

export default Localization
