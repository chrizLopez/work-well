import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { EStyleSheet } from "./config/EStyleSheet";

const styles = EStyleSheet.create({
  logoView: {
    position: "absolute",
    zIndex: 1,
    top: "60rem",
    right: 0,
    left: 0,
    backgroundColor: "#00000020",
    paddingVertical: "10rem",
    alignItems: "center",
  },
  logo: {
    // height: '50rem',
    // width: '100rem',
  },
  bottomSheet: {
    backgroundColor: "#dbdbd9",
    opacity: 0.9,
  },
  contentContainer: {
    padding: "20rem",
  },
  selectorBtn: {
    paddingVertical: "10rem",
    width: "180rem",
    borderRadius: "50rem",
    marginVertical: "1rem",
    borderWidth: "2rem",
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  slectorTxt: {
    fontSize: "18rem",
    fontWeight: "500",
    color: "#fff",
  },
  pickerLabel: {
    textAlign: "center",
    fontWeight: "bold",
  },
  dropdownPickerStl: {
    backgroundColor: "transparent",
  },
  dropdownContainer: {
    alignItems: "center",
  },
  dropdownView: {
    width: "100%",
    marginBottom: "20rem",
    zIndex: 1,
    alignItems: "center",
  },
  pickerItem: {
    fontSize: "20rem",
    fontWeight: "600",
    backgroundColor: "red",
    zIndex: 1000,
  },
  timerView: {
    backgroundColor: "#2b2b2b",
    padding: "30rem",
    paddingVertical: "80rem",
    borderRadius: "200rem",
  },
  timerText: {
    fontSize: "70rem",
    fontWeight: "500",
    color: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  contentView: {
    backgroundColor: "#2b2b2b50",
    padding: "10rem",
    borderRadius: "20rem",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "50rem",
  },
});

export default styles;
