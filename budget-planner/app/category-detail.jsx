import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '../utils/SupabaseConfig';
import Colors from '../utils/Colors';
import CourseInfo from '../components/CourseDetail/CourseInfo';
import CourseItemList from '../components/CourseDetail/CourseItemList';

export default function CategoryDetails() {

    const router = useRouter();

    const { categoryId } = useLocalSearchParams();

    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        categoryId && getCategoryDetail();
    }, [categoryId]);

    const getCategoryDetail = async () => {
        const { data, error } = await supabase.from('Category')
            .select('*,CategoryItems(*)')
            .eq('id', categoryId)
        setCategoryData(data[0]);
    }

    return (
        <View style={{ padding: 20, marginTop: 20 }}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back-circle" size={44} color={Colors.BLACK} />
            </TouchableOpacity>
            <CourseInfo categoryData={categoryData} />

            <CourseItemList categoryData={categoryData} />
        </View>
    )
}

