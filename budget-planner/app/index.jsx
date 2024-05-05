import { Link } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Abdul Nasir Qureshi</Text>
        <Text style={styles.subtitle}>This is my first page of your app.</Text>
        <Link href={'/details'} asChild>
          <Button style={styles.button} title="Go To Details" />
        </Link>
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
