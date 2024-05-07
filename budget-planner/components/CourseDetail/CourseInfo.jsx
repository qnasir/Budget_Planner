import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../utils/Colors'

export default function CourseInfo({categoryData}) {

    const [totalCost, setTotalCost] = useState();
    const [percTotal, setPercTotal] = useState(0);

    useEffect(() => {
        calculateTotalPerc();
    }, [categoryData])

    const calculateTotalPerc = () => {
        let total  = 0;
        categoryData?.CategoryItems?.forEach(item => {
            total = total + item.cost;
        });
        setTotalCost(total);
        const perc = (total/categoryData.assigned_budget)*100;
        setPercTotal(perc);
    }

    return (
        <View>
            <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Text style={[styles.textIcon, {backgroundColor: categoryData.color}]}>{categoryData.icon}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 20 }}>
                <Text style={styles.categoryName}>{categoryData.name}</Text>
                <Text style={styles.categoryItemText}>{categoryData.CategoryItems?.length} Item</Text>
            </View>
            <Ionicons name="trash" size={24} color="red" />
        </View>

        {/* Progress Bar */}
        <View style={styles.amountContainer}>
            <Text style={{ fontFamily: 'outfit-bold' }}>${totalCost}</Text>
            <Text style={{ fontFamily: 'outfit' }}>Total Budget:{categoryData.assigned_budget}</Text>
        </View>
        <View style={styles.progressBarMainContainer}>
            <View style={[styles.progressBarSubContainer, {width: percTotal+'%'}]}>

            </View>
        </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textIcon: {
        fontSize: 35,
        padding: 20,
        borderRadius: 15
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'baseline'
    },
    categoryName: {
        fontFamily: 'outfit-bold',
        fontSize: 24
    },
    categoryItemText: {
        fontFamily: 'outfit',
        fontSize: 16
    },
    amountContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'space-between'
    },
    progressBarMainContainer: {
        width: '100%',
        height: 15,
        backgroundColor: Colors.GRAY,
        borderRadius: 99,
        marginTop: 7
    },
    progressBarSubContainer: {
        backgroundColor: Colors.PRIMARY,
        height: 15,
        borderRadius: 99
    }
})
