import React from 'react';
import {View} from 'react-native';

export default function(props){
    return(
        <View style = {{width: '100%', height:300, flexDirection: 'column', alignItems: 'stretch', justifyContent:'center'}}>
            <View style={{height:50, backgroundColor: '#c30010'}}></View>
            <View style={{height:50, backgroundColor: '#de0a26'}}></View>
            <View style={{height:50, backgroundColor: '#ff2c2c'}}></View>   
        </View>
    )
}