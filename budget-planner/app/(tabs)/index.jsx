import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import services from "../../utils/services";
import { useEffect } from "react";
import { client } from "../../utils/KindeConfig";

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    checkUserAuth();
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

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Abdul Nasir Qureshi</Text>
        <Text style={styles.subtitle}>This is my first page of your app.</Text>
        <Button
        onPress={handleLogout}
        title='Logout' /> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  button: {
    marginTop: 20,
  }
});
