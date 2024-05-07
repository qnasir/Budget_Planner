import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Image, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import Colors from '../utils/Colors';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../utils/SupabaseConfig';
import { decode } from 'base64-arraybuffer';
import { useLocalSearchParams, useRouter } from 'expo-router';

const placeholder = 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';

export default function AddNewCategoryItem() {

    const router = useRouter();

    const [image, setImage] = useState(placeholder);
    const [name, setName] = useState();
    const [url, setUrl] = useState();
    const [cost, setCost] = useState();
    const [note, setNote] = useState();
    const [previewImage, setPreviewImage] = useState(placeholder);

    const { categoryId } = useLocalSearchParams();

    const onImagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
            base64: true
        });


        if (!result.canceled) {
            setPreviewImage(result.assets[0].uri);
            setImage(result.assets[0].base64)
        }
    }

    const onClickAdd = async () => {
        const fileName = Date.now();
        const { data, error } = await supabase
        .storage
        .from('images')
        .upload(fileName+'.png', decode(image), {
            contentType: 'image/png'
        });
        if (data) {
            const fileUrl = 'https://rjpkzntsifbezwjyegzv.supabase.co/storage/v1/object/public/images/'+fileName+'.png';

            const {data, error} = await supabase
            .from('CategoryItems')
            .insert({
                name: name,
                cost: cost,
                url: url,
                image: fileUrl,
                note: note,
                category_id: categoryId
            }).select();

            ToastAndroid.show("New Item Added!!!", ToastAndroid.SHORT);
            router.replace({
                pathname: 'category-detail',
                params: {
                    categoryId: categoryId
                }
            })
        }
    }

    return (
        <KeyboardAvoidingView>
            <ScrollView style={{ padding: 20, backgroundColor: Colors.WHITE }}>
                <TouchableOpacity onPress={() => onImagePick()}>
                    <Image style={styles.image} source={{ uri: previewImage }} />
                </TouchableOpacity>

                <View style={styles.textInputContainer}>
                    <Ionicons name='pricetag' size={24} color={Colors.GRAY} />
                    <TextInput onChangeText={(value) => setName(value)} placeholder='Item Name' style={styles.input} />
                </View>

                <View style={styles.textInputContainer}>
                    <FontAwesome name="rupee" size={28} color={Colors.GRAY} />
                    <TextInput onChangeText={(value) => setCost(value)} keyboardType='number-pad' placeholder='Cost' style={styles.input} />
                </View>

                <View style={styles.textInputContainer}>
                    <Ionicons name='link' size={24} color={Colors.GRAY} />
                    <TextInput onChangeText={(value) => setUrl(value)} placeholder='Url' style={styles.input} />
                </View>

                <View style={styles.textInputContainer}>
                    <Ionicons name='pencil' size={24} color={Colors.GRAY} />
                    <TextInput onChangeText={(value) => setNote(value)} numberOfLines={3} placeholder='Note' style={styles.input} />
                </View>

                <TouchableOpacity onPress={() => onClickAdd()} disabled={!name || !cost} style={styles.button}>
                    <Text style={{ textAlign: 'center', fontFamily: 'outfit-bold', color: Colors.WHITE }}>Add</Text>
                </TouchableOpacity>

            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        backgroundColor: Colors.GRAY,
        borderRadius: 15
    },
    textInputContainer: {
        padding: 10,
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        borderRadius: 10,
        borderColor: Colors.GRAY,
        marginTop: 10
    },
    input: {
        fontSize: 17,
        width: '100%'
    },
    button: {
        padding: 17,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 99,
        marginTop: 25
    }
})