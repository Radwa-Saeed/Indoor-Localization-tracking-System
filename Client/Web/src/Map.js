import React from "react";
import { Text, View ,StyleSheet, Image , Button} from "react-native";
import { useState, useEffect } from 'react';
import CustomButton from '../components/CustomButton'


let data_array=[]
let pop_array = []
let track = 0
// let test = [1 , 1 , 2 , 2 , 5 , 5 , 3 ,3 , 3 , 4]

const Localization =() =>{
    let labelURL ='http://192.168.188.174:8000/localize';

    let [label , setLabel] = useState(0);
    let coordinates = [
        [0 , 0] ,//intial position
        [980 , 600], //Electronics lab
        [880, 500], //1st labs corridor
        [500, 510], //lecture corridor
        [1200, 500], //2st labs corridor
        [710,700],//left corridor  
        [710, 350], //right corridor
         
        
        
        [460, 300], //lecture
      ];

      let track_coordinates = [
        [0 , 0] ,//intial position
        [980 , 630], //Electronics lab
        [880, 530], //1st labs corridor
        [500, 540], //lecture corridor
        [1200, 530], //2st labs corridor
        [710,730],//left corridor  
        [710, 380], //right corridor
         
        
        
        [460, 300], //lecture
      ];
    
     let [sec, setSec] = useState(0);
    
    setInterval(() =>{
        setSec(sec = sec+1)
      }, 5000)


    useEffect(() => {
        // console.log("label", label);

        fetch(labelURL)
        .then((response) => response.json()) // get response, convert to json
        .then((json) => {
            // console.log(json)
            setLabel(json.value);
            // console.log("label", label);
        })
        .catch((error) => alert(error)) // display errors

        if(data_array.length<50){
            data_array.push(label)
            // console.log("data",data_array)
        }
    }, [sec]);
    
    
   
    
    // console.log(label);
    //console.log(coordinates[label][1]);

    const timer = (ms) => new Promise((res) => setTimeout(res, ms));
    async function Tracking(){
        pop_array = data_array.slice(2,50)
        // console.log("pop" ,pop_array)
        
        for (let i = 0 ;i < pop_array.length ;  i++){
            if( pop_array.length >=0){
                let track_history = pop_array.pop()
                await timer(1000);
                console.log("track",track_history)
                track = track_history
                console.log(pop_array.length)      
        }
            
        }
        

    }
    



    return(
        
        <View>
            <Text style = {styles.title}> SBME Department Floor </Text>
            <CustomButton title={"Replay Next Point"} clickHandle={Tracking} />


            <Image
             
            source={require('../assets/floor.jpg')}
            style = {{
                display:"flex",
                justifyContent:"center",
                alignSelf:"center",
                width:1200,
                height:500,
                // position: 'absolute',
                top: 80,
                // left: 100,
                // bottom: 0,
                // right: 0,
            
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

            <View style={{
                position: 'absolute',
                width: 10,
                height: 10,
                borderRadius: 10 / 2,
                backgroundColor: "red",
                opacity:0.7,
                left: track_coordinates[track][0],
                top: track_coordinates[track][1],
                
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
