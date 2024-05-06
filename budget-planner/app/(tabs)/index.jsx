import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import services from "../../utils/services";
import { supabase } from "../../utils/SupabaseConfig";
import { useEffect } from "react";
import { client } from "../../utils/KindeConfig";
import Header from "../../components/Header";
import Colors from "../../utils/Colors";

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    checkUserAuth();
    getCategoryList();
  }, [])
  
  // To check if the user is already authenticated or not
  const checkUserAuth = async () => {


    const result = await services.getData('login');
    console.log("result", result)
    if (result !== 'true') {
      console.log("Redirecting to login")
      router.replace('/login')
    }
    
  }

  const handleLogout = async () => {
    const loggedOut = await client.logout();
    if (loggedOut) {
      // User was logged out  
      await services.storeData('login', 'false');
      router.replace('/login');
    }
  }

  const getCategoryList = async () => {

    const user = await client.getUserDetails();

    const {data, error} = await supabase.from('Category')
    .select('*')
    .eq('created_by', user.email)

    console.log("Data", data)

  }

  return (
    <View style={{ 
      marginTop: 20,
      padding: 20,
      backgroundColor: Colors.PRIMARY,
      height: 150
      }}>
      <Header />
    </View>
  );
}
