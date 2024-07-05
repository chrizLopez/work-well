import { EStyleSheet } from "./config/EStyleSheet";

const styles = EStyleSheet.create({
  loaderView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#ffffff50",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  logoView: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: "#282828CC",
    paddingTop: "70rem",
    alignItems: "center",
    paddingBottom: "10rem",
  },
  logo: {
    height: "33rem",
    width: "137rem",
  },
  bottomSheet: {
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: "20rem",
  },
  selectorBtn: {
    paddingVertical: "10rem",
    width: "180rem",
    borderRadius: "50rem",
    marginVertical: "5rem",
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
    marginTop: "-40rem",
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
    backgroundColor: "#282828CC",
    padding: "10rem",
    borderRadius: "20rem",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "50rem",
  },
  bottomButtonsView: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: "20rem",
    backgroundColor: "#fff",
  },
});

export default styles;
