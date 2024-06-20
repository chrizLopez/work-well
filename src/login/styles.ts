import { EStyleSheet } from "../config/EStyleSheet";

const styles = EStyleSheet.create({
  loginTxt: {
    fontSize: "16rem",
    fontWeight: "500",
    color: "#fff",
  },
  loginBtn: {
    backgroundColor: "#f64082",
    paddingVertical: "15rem",
    // paddingHorizontal: "20rem",
    borderRadius: "50rem",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentView: {
    backgroundColor: "#2b2b2b50",
    padding: "10rem",
    borderRadius: "20rem",
    width: "80%",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  input: {
    width: "100%",
    borderBottomWidth: "1rem",
    borderBottomColor: "#fff",
    padding: "10rem",
    color: "#fff",
  },
  inputLabel: {
    color: "#fff",
    marginBottom: "5rem",
    fontSize: "16rem",
  },
  inputView: {
    marginVertical: "20rem",
    // backgroundColor: "#fff",
  },
  loginHeader: {
    color: "#fff",
    fontSize: "24rem",
    marginBottom: "20rem",
  },
});

export default styles;
